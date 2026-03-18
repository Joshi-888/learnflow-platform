import { Navbar } from "@/components/Navbar";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Chatbot } from "@/components/Chatbot";

export default function CartPage() {
  const { items, removeFromCart, getTotal, getSavings, clearCart } = useCartStore();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Shopping Cart</h1>
        <p className="mt-1 text-muted-foreground">{items.length} course{items.length !== 1 ? "s" : ""} in cart</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.length === 0 ? (
              <div className="rounded-lg border bg-card p-12 text-center">
                <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground/40" />
                <p className="mt-4 text-lg font-medium text-card-foreground">Your cart is empty</p>
                <p className="mt-1 text-sm text-muted-foreground">Browse courses and add them to your cart</p>
                <Link to="/courses">
                  <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
                    Browse Courses <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ) : (
              items.map((item) => {
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
                    <button onClick={() => removeFromCart(item.id)} className="shrink-0 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Summary */}
          {items.length > 0 && (
            <div className="rounded-lg border bg-card p-6 h-fit">
              <h2 className="font-heading text-lg font-semibold text-card-foreground">Order Summary</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-card-foreground">₹{(getTotal() + getSavings()).toLocaleString()}</span>
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
              <Link to="/checkout">
                <Button className="mt-4 w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Checkout
                </Button>
              </Link>
              <button onClick={clearCart} className="mt-2 w-full text-center text-xs text-muted-foreground hover:text-destructive transition-colors">
                Clear cart
              </button>
            </div>
          )}
        </div>

        {/* Wishlist */}
        {wishlist.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-4 flex items-center gap-2 font-heading text-xl font-bold text-foreground">
              <Heart className="h-5 w-5 text-accent" /> Wishlist ({wishlist.length})
            </h2>
            <div className="space-y-3">
              {wishlist.map((item) => (
                <div key={item.id} className="flex items-center gap-4 rounded-lg border bg-card p-4">
                  {item.thumbnail && (
                    <img src={item.thumbnail} alt={item.title} className="h-16 w-24 rounded object-cover shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-card-foreground line-clamp-1">{item.title}</p>
                    <p className="mt-0.5 font-heading font-bold text-foreground">₹{item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button size="sm" variant="outline" onClick={() => moveToCart(item.id)}>
                      <MoveRight className="mr-1 h-3 w-3" /> Move to Cart
                    </Button>
                    <button onClick={() => removeFromWishlist(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Chatbot />
    </div>
  );
}
