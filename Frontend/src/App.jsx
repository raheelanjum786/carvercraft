import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import GetInTouch from "./components/Contact Us/GetInTouch";
import AllProducts from "./components/Products/AllProducts";
import ProductDescription from "./components/Products/ProductDescription";
import Login from "./components/Access/Login";
import Signup from "./components/Access/Signup";
import ResetPassword from "./components/Access/ResetPassword";
import VerifyOTP from "./components/Access/VerifyOTP";
import { AuthProvider } from "./context/AuthContext";
import ForgotPassword from "./components/Access/ForgotPassword";
import Navbar from "./content/Navbar/Navbar";
import AboutUsPage from "./components/AboutUs/AboutUsPage";
import Products from "./components/Products/Products";
import ProtectedRoute from "./components/Access/ProtectedRoute";
import AdminPage from "./Pages/AdminPage";
import AdminCategories from "./components/Admin/AdminCategories";
import AdminSettings from "../../../cravy/FrontEnd/src/components/Admin/AdminSettings";
import AdminProductOrders from "./components/Admin/AdminProductOrders";
import AdminAddProduct from "./components/Admin/AdminAddProduct";
import AdminProductList from "./components/Admin/AdminProductList";
import AdminSalesReview from "./components/Admin/AdminSalesReview";
import AdminEmployerList from "./components/Admin/AdminEmployerList";
import AdminExpenseManager from "./components/Admin/AdminExpenseManager";
import AdminSubscribedNewsletter from "./components/Admin/AdminSubscribedNewsletter";
import AdminUsers from "./components/Admin/AdminUsers";
import Cart from "./components/Cart/Cart";
import BuyNow from "./components/BuyNow/BuyNow";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          {/* <Route path="/" element={<LoadingPage />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/auth/verify-otp" element={<VerifyOTP />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <AboutUsPage />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <GetInTouch />
              </>
            }
          />
          <Route
            path="/products"
            element={
              <>
                {" "}
                <Navbar />
                <Products />
              </>
            }
          />
          <Route
            path="/allProducts"
            element={
              <>
                {" "}
                <Navbar />
                <AllProducts />
              </>
            }
          />

          <Route
            path="/products/:id"
            element={
              <>
                <Navbar />
                <ProductDescription />
              </>
            }
          />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
            <Route
              path="/cart"
              element={
                <>
                  <Navbar />
                  <Cart />
                </>
              }
            />

            <Route
              path="/buyNow"
              element={
                <>
                  <Navbar /> <BuyNow />
                </>
              }
            />

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/categories" element={<AdminCategories />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route
                path="/admin/product/orders"
                element={<AdminProductOrders />}
              />

              <Route path="/admin/products/add" element={<AdminAddProduct />} />
              <Route
                path="/admin/products/list"
                element={<AdminProductList />}
              />
              <Route path="/admin/sales" element={<AdminSalesReview />} />
              <Route path="/admin/employers" element={<AdminEmployerList />} />
              <Route path="/admin/expenses" element={<AdminExpenseManager />} />
              <Route
                path="/admin/subscription"
                element={<AdminSubscribedNewsletter />}
              />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};
export default App;
