import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { Spinner } from "@/components/ui/skeleton"; // Import Spinner component
import CheckAuth from "./components/common/check-auth";

// Lazy loaded components
const AuthLayout = lazy(() => import("./components/auth/layout"));
const AuthLogin = lazy(() => import("./pages/auth/login"));
const AuthRegister = lazy(() => import("./pages/auth/register"));
const AdminLayout = lazy(() => import("./components/admin-view/layout"));
const AdminDashboard = lazy(() => import("./pages/admin-view/dashboard"));
const AdminProducts = lazy(() => import("./pages/admin-view/products"));
const AdminOrders = lazy(() => import("./pages/admin-view/orders"));
const AdminFeatures = lazy(() => import("./pages/admin-view/features"));
const ShoppingLayout = lazy(() => import("./components/shopping-view/layout"));
const ShoppingHome = lazy(() => import("./pages/shopping-view/home"));
const ShoppingListing = lazy(() => import("./pages/shopping-view/listing"));
const ShoppingCheckout = lazy(() => import("./pages/shopping-view/checkout"));
const ShoppingAccount = lazy(() => import("./pages/shopping-view/account"));
const PaypalReturnPage = lazy(() =>
  import("./pages/shopping-view/paypal-return")
);
const PaymentSuccessPage = lazy(() =>
  import("./pages/shopping-view/payment-success")
);
const SearchProducts = lazy(() => import("./pages/shopping-view/search"));
const AboutUs = lazy(() => import("./pages/shopping-view/aboutUs"));
const TermsAndConditions = lazy(() =>
  import("./pages/shopping-view/termsAndCondition")
);
const UnauthPage = lazy(() => import("./pages/unauth-page"));
const NotFound = lazy(() => import("./pages/not-found"));

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    dispatch(checkAuth(token));
  }, [dispatch]);

  if (isLoading) {
    return <Spinner size={20} color="#838a60" />;
  }

  console.log(isLoading, user);

  return (
    <div className="flex flex-col overflow-hidden bg-background">
      <Suspense fallback={<Spinner size={50} />}>
        <Routes>
          <Route
            path="/"
            element={
              <CheckAuth
                isAuthenticated={isAuthenticated}
                user={user}
              ></CheckAuth>
            }
          />
          <Route
            path="/auth"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route path="login" element={<AuthLogin />} />
            <Route path="register" element={<AuthRegister />} />
          </Route>
          <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<AdminFeatures />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="features" element={<AdminDashboard />} />
          </Route>
          <Route
            path="/shop"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingLayout />
              </CheckAuth>
            }
          >
            <Route path="home" element={<ShoppingHome />} />
            <Route
              path="terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="listing" element={<ShoppingListing />} />
            <Route path="checkout" element={<ShoppingCheckout />} />
            <Route path="account" element={<ShoppingAccount />} />
            <Route path="paypal-return" element={<PaypalReturnPage />} />
            <Route path="payment-success" element={<PaymentSuccessPage />} />
            <Route path="search" element={<SearchProducts />} />
            <Route path="about" element={<AboutUs />} />
          </Route>
          <Route path="/unauth-page" element={<UnauthPage />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
