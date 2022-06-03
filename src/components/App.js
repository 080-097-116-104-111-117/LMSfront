import React from "react";
import Header from "./header";
import NotFound from "./404"
import Home from "./book/home"
import Book1 from "./book/book"
import Login from "./login"
import Register from "./register"
import Profile from "./profile"
import Dashboards from "./dashboard/Dashboards"
import Dashboard from "./dashboard/dashboard";
import Addbook from "./dashboard/addBook";
import Category from "./dashboard/category";
import IssuedBook from "./dashboard/IssuedBook";
import DueBooks from "./dashboard/DueBooks";
import Users from "./dashboard/Users";
import Footer from "./Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute, { PrivateLoginRoute, PrivateSigninRoute, PrivateAdminRoute } from "../privateRoute/PrivateRoute";


function App() {


  return (
    <div className="">
      <BrowserRouter>

        <Routes>
          <Route exact path='/' element={<PrivateRoute />} >
            <Route path='/' element={<Header />} exact >
              <Route path='/' element={<Home />} exact />
            </Route>
            <Route path='/book/:id' element={<Book1 />} />
            <Route path='/profile/:name' element={<Profile />} />
          </Route>
          <Route exact path='/login' element={<PrivateLoginRoute />}>
            <Route path='/login' element={<Login />} />
          </Route>
          <Route exact path='/signup' element={<PrivateSigninRoute />}>
            <Route path='/signup' element={<Register />} />
          </Route>
          <Route path='/dashboard' element={<PrivateAdminRoute />} exact>
            <Route path='/dashboard' element={<Dashboards />} exact>
              <Route path="" element={<Dashboard />} />
              <Route path="books" element={<Addbook />} />
              <Route path="users" element={<Users />} />
              <Route path="issued-books" element={<IssuedBook />} />
              <Route path="due-books" element={<DueBooks />} />
              <Route path="categories" element={<Category />} />
            </Route>
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />


    </div>
  );
}

export default App;
