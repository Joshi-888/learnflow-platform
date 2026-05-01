import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { useAuthStore } from "@/stores/authStore";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle, Mail, User, Package } from "lucide-react";
import { toast } from "sonner";

interface PaymentRow {
  id: string;
  user_id: string;
  user_email: string | null;
  user_name: string | null;
  items: Array<{ id: string; type: string; title: string; price: number }>;
  amount: number;
  payment_method: string;
  status: string;
  created_at: string;
  authorized_at: string | null;
}

export default function AdminPage() {
  const { isAuthenticated, isAdmin, initialized } = useAuthStore();
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"pending" | "all">("pending");

  useEffect(() => {
    if (!isAdmin) return;

    const load = async () => {
      const { data, error } = await supabase
        .from("payments")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setPayments(data as unknown as PaymentRow[]);
      setLoading(false);
    };
    load();

    const channel = supabase
      .channel("admin-payments")
      .on("postgres_changes", { event: "*", schema: "public", table: "payments" }, (payload) => {
        if (payload.eventType === "INSERT") {
          const p = payload.new as unknown as PaymentRow;
          setPayments((prev) => [p, ...prev]);
          toast.info(`💰 New payment from ${p.user_name || p.user_email} – ₹${Number(p.amount).toLocaleString()}`);
        } else if (payload.eventType === "UPDATE") {
          const p = payload.new as unknown as PaymentRow;
          setPayments((prev) => prev.map((x) => (x.id === p.id ? p : x)));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAdmin]);

  if (!initialized) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  const handleAuthorize = async (p: PaymentRow) => {
    // Update payment status
    const { error: e1 } = await supabase
      .from("payments")
      .update({ status: "authorized", authorized_at: new Date().toISOString() })
      .eq("id", p.id);
    if (e1) return toast.error(e1.message);

    // Create enrollments for each course item
    const courseItems = p.items.filter((i) => i.type === "course");
    if (courseItems.length > 0) {
      const rows = courseItems.map((i) => ({
        user_id: p.user_id,
        course_id: i.id,
        payment_id: p.id,
      }));
      const { error: e2 } = await supabase.from("enrollments").upsert(rows, {
        onConflict: "user_id,course_id",
        ignoreDuplicates: true,
      });
      if (e2) toast.error(`Enrollment: ${e2.message}`);
    }
    toast.success(`Authorized payment for ${p.user_name || p.user_email}`);
  };

  const handleReject = async (p: PaymentRow) => {
    const { error } = await supabase.from("payments").update({ status: "rejected" }).eq("id", p.id);
    if (error) return toast.error(error.message);
    toast.success("Payment rejected");
  };

  const visible = filter === "pending" ? payments.filter((p) => p.status === "pending") : payments;
  const pendingCount = payments.filter((p) => p.status === "pending").length;

  const statusBadge = (s: string) => {
    if (s === "pending") return <Badge variant="outline" className="border-warning text-warning"><Clock className="mr-1 h-3 w-3" />Pending</Badge>;
    if (s === "authorized") return <Badge className="bg-success text-success-foreground"><CheckCircle className="mr-1 h-3 w-3" />Authorized</Badge>;
    return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" />Rejected</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Admin · Payments</h1>
            <p className="mt-1 text-muted-foreground">Review and authorize payments. Live updates enabled.</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant={filter === "pending" ? "default" : "outline"} onClick={() => setFilter("pending")}>
              Pending {pendingCount > 0 && <span className="ml-2 rounded-full bg-warning px-2 text-xs text-warning-foreground">{pendingCount}</span>}
            </Button>
            <Button size="sm" variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
              All ({payments.length})
            </Button>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : visible.length === 0 ? (
            <div className="rounded-lg border bg-card p-12 text-center">
              <Package className="mx-auto h-12 w-12 text-muted-foreground/40" />
              <p className="mt-3 text-muted-foreground">No {filter === "pending" ? "pending" : ""} payments</p>
            </div>
          ) : (
            visible.map((p) => (
              <div key={p.id} className="rounded-lg border bg-card p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-heading font-semibold text-card-foreground flex items-center gap-1.5">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {p.user_name || "Unknown"}
                      </span>
                      {statusBadge(p.status)}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1.5">
                      <Mail className="h-3 w-3" /> {p.user_email}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {new Date(p.created_at).toLocaleString()} · via {p.payment_method}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-heading text-2xl font-bold text-foreground">₹{Number(p.amount).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{p.items.length} item{p.items.length !== 1 ? "s" : ""}</p>
                  </div>
                </div>

                <div className="mt-3 rounded-md bg-muted/50 p-3 text-sm space-y-1">
                  {p.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between gap-2">
                      <span className="text-card-foreground line-clamp-1">{it.title}</span>
                      <span className="text-muted-foreground shrink-0">₹{Number(it.price).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {p.status === "pending" && (
                  <div className="mt-4 flex gap-2 justify-end">
                    <Button size="sm" variant="outline" onClick={() => handleReject(p)}>
                      <XCircle className="mr-1 h-4 w-4" /> Reject
                    </Button>
                    <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90" onClick={() => handleAuthorize(p)}>
                      <CheckCircle className="mr-1 h-4 w-4" /> Authorize
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
