import { Navbar } from "@/components/Navbar";
import { BundleCard } from "@/components/BundleCard";
import { Chatbot } from "@/components/Chatbot";
import { bundles } from "@/data/courses";

export default function BundlesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground">Course Bundles</h1>
          <p className="mt-1 text-muted-foreground">
            Save big with curated learning paths — master entire domains at a fraction of the cost
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bundles.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>
      </div>
      <Chatbot />
    </div>
  );
}
