import { Navbar } from "@/components/Navbar";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Trash2, Heart, ShoppingCart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Chatbot } from "@/components/Chatbot";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, moveToCart } = useCartStore();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <h1 className="font-heading text-3xl font-bold text-foreground flex items-center gap-2">
          <Heart className="h-7 w-7 text-accent" /> My Wishlist
        </h1>
        <p className="mt-1 text-muted-foreground">{wishlist.length} course{wishlist.length !== 1 ? "s" : ""} saved</p>

        {wishlist.length === 0 ? (
          <div className="mt-12 text-center">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground/40" />
            <p className="mt-4 text-lg font-medium text-foreground">Your wishlist is empty</p>
            <p className="mt-1 text-sm text-muted-foreground">Browse courses and save them for later</p>
            <Link to="/courses">
              <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
                Browse Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {wishlist.map((item) => {
              const discount = Math.round((1 - item.price / item.originalPrice) * 100);
              return (
                <div key={item.id} className="flex gap-4 rounded-lg border bg-card p-4">
                  {item.thumbnail && (
                    <img src={item.thumbnail} alt={item.title} className="h-20 w-32 rounded object-cover shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-semibold text-card-foreground line-clamp-1">{item.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground capitalize">{item.type}</p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-heading font-bold text-foreground">₹{item.price.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground line-through">₹{item.originalPrice.toLocaleString()}</span>
                      <span className="text-xs font-semibold text-success">{discount}% off</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button size="sm" onClick={() => moveToCart(item.id)} className="bg-accent text-accent-foreground hover:bg-accent/90">
                      <ShoppingCart className="mr-1 h-3 w-3" /> Move to Cart
                    </Button>
                    <button onClick={() => removeFromWishlist(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Chatbot />
    </div>
  );
}
