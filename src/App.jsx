import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import Feedback from "./pages/Feedback";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageMenu from "./pages/admin/ManageMenu";
import AddMenu from "./pages/admin/AddMenu";
import EditMenu from "./pages/admin/EditMenu";
import Reservations from "./pages/Reservations";
import ManageReservations from "./pages/admin/ManageReservations";
import ManageOrders from "./pages/admin/ManageOrders";
import AdminFeedback from "./pages/admin/AdminFeedback";
 
function App() {

  return (

    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/menu" element={<ManageMenu />} />
        <Route path="/admin/menu/add" element={<AddMenu />} />
        <Route path="/admin/menu/edit/:id" element={<EditMenu />} />
        <Route path="/reservation" element={<Reservations />} />
        <Route path="/admin/reservations" element={<ManageReservations />}/>
        <Route path="/admin/orders" element={<ManageOrders />}/>
        <Route path="/admin/feedback" element={<AdminFeedback />}/>

      </Routes>

      <Footer />

    </>

  );

}

export default App;
