import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuthStore } from "@/stores/authStore";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CoursesPage from "./pages/Courses";
import CourseDetailPage from "./pages/CourseDetail";
import LearnPage from "./pages/Learn";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ProfilePage from "./pages/Profile";
import BundlesPage from "./pages/Bundles";
import OnboardingPage from "./pages/Onboarding";
import CartPage from "./pages/Cart";
import WishlistPage from "./pages/Wishlist";
import CheckoutPage from "./pages/Checkout";
import MyLearningPage from "./pages/MyLearning";
import CertificatesPage from "./pages/Certificates";
import BundleDetailPage from "./pages/BundleDetail";
import AccountSettingsPage from "./pages/AccountSettings";
import CategoriesPage from "./pages/Categories";
import AdminPage from "./pages/Admin";

const queryClient = new QueryClient();

const AuthInit = () => {
  const init = useAuthStore((s) => s.init);
  useEffect(() => {
    const cleanup = init();
    return cleanup;
  }, [init]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthInit />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:courseId" element={<CourseDetailPage />} />
          <Route path="/learn/:courseId/:videoId" element={<LearnPage />} />
          <Route path="/bundles" element={<BundlesPage />} />
          <Route path="/bundles/:bundleId" element={<BundleDetailPage />} />
          <Route path="/account-settings" element={<AccountSettingsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/my-learning" element={<MyLearningPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
