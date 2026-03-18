import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Smartphone, CheckCircle, ArrowLeft, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Chatbot } from "@/components/Chatbot";

type PaymentMethod = "card" | "upi" | "phonepe" | "googlepay" | "paytm" | null;

export default function CheckoutPage() {
  const { items, getTotal, getSavings, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = () => {
    if (!selectedMethod) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      clearCart();
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container flex flex-col items-center justify-center py-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
            <CheckCircle className="h-10 w-10 text-success" />
          </div>
          <h1 className="mt-6 font-heading text-3xl font-bold text-foreground">Payment Successful!</h1>
          <p className="mt-2 text-muted-foreground">Your courses are now available in My Learning</p>
          <div className="mt-6 flex gap-3">
            <Link to="/my-learning">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Go to My Learning</Button>
            </Link>
            <Link to="/courses">
              <Button variant="outline">Browse More Courses</Button>
            </Link>
          </div>
        </div>
        <Chatbot />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <p className="text-lg text-muted-foreground">Your cart is empty</p>
          <Link to="/courses">
            <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">Browse Courses</Button>
          </Link>
        </div>
        <Chatbot />
      </div>
    );
  }

  const paymentMethods: { id: PaymentMethod; label: string; icon: React.ReactNode; color: string }[] = [
    { id: "card", label: "Credit / Debit Card", icon: <CreditCard className="h-5 w-5" />, color: "text-blue-500" },
    { id: "upi", label: "UPI", icon: <Smartphone className="h-5 w-5" />, color: "text-purple-500" },
    { id: "googlepay", label: "Google Pay", icon: <span className="text-lg font-bold">G</span>, color: "text-blue-600" },
    { id: "phonepe", label: "PhonePe", icon: <span className="text-lg font-bold">₱</span>, color: "text-indigo-600" },
    { id: "paytm", label: "Paytm", icon: <span className="text-lg font-bold">P</span>, color: "text-sky-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <Link to="/cart" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Cart
        </Link>
        <h1 className="font-heading text-3xl font-bold text-foreground">Checkout</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-lg border bg-card p-6">
              <h2 className="font-heading text-lg font-semibold text-card-foreground mb-4">Select Payment Method</h2>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-all ${
                      selectedMethod === method.id
                        ? "border-accent bg-accent/5 ring-1 ring-accent"
                        : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-muted ${method.color}`}>
                      {method.icon}
                    </div>
                    <span className="font-medium text-card-foreground">{method.label}</span>
                    {selectedMethod === method.id && (
                      <CheckCircle className="ml-auto h-5 w-5 text-accent" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Card form */}
            {selectedMethod === "card" && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-heading font-semibold text-card-foreground">Card Details</h3>
                <Input placeholder="Card Number" className="bg-background" maxLength={19} />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="MM/YY" className="bg-background" maxLength={5} />
                  <Input placeholder="CVV" className="bg-background" maxLength={4} type="password" />
                </div>
                <Input placeholder="Name on Card" className="bg-background" />
              </div>
            )}

            {/* UPI form */}
            {selectedMethod === "upi" && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-heading font-semibold text-card-foreground">Enter UPI ID</h3>
                <Input placeholder="yourname@upi" className="bg-background" />
              </div>
            )}

            {/* Wallet methods */}
            {(selectedMethod === "googlepay" || selectedMethod === "phonepe" || selectedMethod === "paytm") && (
              <div className="rounded-lg border bg-card p-6">
                <p className="text-sm text-muted-foreground">
                  You will be redirected to <span className="font-semibold text-card-foreground">{paymentMethods.find(m => m.id === selectedMethod)?.label}</span> to complete your payment of{" "}
                  <span className="font-bold text-foreground">₹{getTotal().toLocaleString()}</span>
                </p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="rounded-lg border bg-card p-6 h-fit space-y-4">
            <h2 className="font-heading text-lg font-semibold text-card-foreground">Order Summary</h2>
            <div className="space-y-2 text-sm">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between gap-2">
                  <span className="text-muted-foreground line-clamp-1 flex-1">{item.title}</span>
                  <span className="text-card-foreground shrink-0">₹{item.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{(getTotal() + getSavings()).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-success">
                <span>Discount</span>
                <span>-₹{getSavings().toLocaleString()}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span className="text-card-foreground">Total</span>
                <span className="text-foreground">₹{getTotal().toLocaleString()}</span>
              </div>
            </div>
            <Button
              onClick={handlePay}
              disabled={!selectedMethod || processing}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {processing ? "Processing..." : `Pay ₹${getTotal().toLocaleString()}`}
            </Button>
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <ShieldCheck className="h-3 w-3" /> Secure payment · 30-day refund
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  );
}
