import { BrowserRouter as Router,Route,Link,Routes } from "react-router-dom";
import React from "react";
import CategoryLogic from "./CategoryLogic";
import Home from "./cardprintLogic";
import AddborrowLogic from "./AddborrowLogic";
import BorrowPrintLogic from "./BorrowPrintLogic";
import Login from "./Login";
import Signup from "./Signup";
import Progressbar from "./Progressbar"


class Navbar extends React.Component{
    render(){
        return(
            <>
             <Router>
            <nav class="navbar navbar-expand-sm navbar-light nav_back fixed-top">
                <a class="navbar-brand fs-3 " href="#">Chai Ke Nashedi</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item active"><Link to={"home"}>
                    <a class="nav-link" href="#">Show Category</a></Link>
                    </li>
                    <li class="nav-item">
                        <Link to={"/addcategory"} >
                    <a class="nav-link " href="#">Add Category</a></Link>
                    </li>
                    <li class="nav-item">
                        <Link to={"/printborrow"} >
                    <a class="nav-link " href="#">Show Borrow</a></Link>
                    </li>
                    <li class="nav-item">
                        <Link to={"/addborrow"} >
                    <a class="nav-link " href="#">Add Borrow</a></Link>
                    </li>
                    <li class="nav-item">
                        <Link to={"/login"} >
                    <a class="nav-link " href="#">Login</a></Link>
                    </li>
                    <li class="nav-item">
                        <Link to={"/signup"} >
                    <a class="nav-link " href="#">Signup</a></Link>
                    </li>
                    <li class="nav-item">
                        <Link to={"/progress"} >
                    <a class="nav-link " href="#">Progress</a></Link>
                    </li>
                </ul>
                </div>
            </nav>
            <Routes>
                <Route path={"/"} element={<Home/>}></Route>
                <Route path={"/home"} element={<Home/>}></Route>
                <Route path={"/addcategory"} element={<CategoryLogic/>}></Route>
                <Route path={"/addborrow"} element={<AddborrowLogic/>}></Route>
                <Route path={"/printborrow"} element={<BorrowPrintLogic/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/signup" element={<Signup/>}></Route>
                <Route path="/progress" element={<Progressbar/>}></Route>
            </Routes>
            </Router>
            </>
        )
    }
}
export default Navbar