import BookForm from '../dashboard/BookForm'
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllbooks } from "../../redux/LMS/bookSlice";
import { fetchAsyncBooks } from "../../redux/LMS/bookSlice"
import { fetchAsyncUsers, getAllUsers } from "../../redux/LMS/adminSlice"
import { useDispatch } from "react-redux";
import {Link} from "react-router-dom";
import Alert from "../alert";

import axios from 'axios'

function Addbook() {
    const users = useSelector(getAllUsers);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchAsyncBooks());
        dispatch(fetchAsyncUsers());
    }, [dispatch]);
    const books = useSelector(getAllbooks);
    const [Bfilter, setBFilter] = useState(books);
    const [Ufilter, setUFilter] = useState(users);





    const [userValue, setUserValue] = useState({
        search_user: '',
    });
    const [bookValue, setBookValue] = useState({
        search_book: '',
    });


    const handleSubmit = async (event) => {
        event.preventDefault();
        const loginFormData = bookValue.search_book;


        try {
            // make axios post request
            const response = await axios(`http://127.0.0.1:8000/api/books/search/?search=${loginFormData}`);
            setBFilter(response.data)
        } catch (error) {
            console.log("error:", error)
            // console.log("user: ", user)
        }
    }


    const searchUser = async (event) => {
        event.preventDefault();
        const loginFormData = userValue.search_user;


        try {
            // make axios post request
            const response = await axios(`http://127.0.0.1:8000/api/register/search/?search=${loginFormData}`);
            setUFilter(response.data)
        } catch (error) {
            console.log("error: ", error)
        }
    }








    const handleBookChange = (event) => {
        setBookValue({
            ...bookValue,
            [event.target.name]: event.target.value
        });

    }
    const handleUserChange = (event) => {
        setUserValue({
            ...userValue,
            [event.target.name]: event.target.value
        });

    }

    const sup = (edition) => {
        const st = "st";
        const nd = "nd";
        const rd = "rd";
        const th = "th";

        if (edition === 1) {
            return st;
        }
        if (edition === 2) {
            return nd;
        }
        if (edition === 3) {
            return rd;
        } else {
            return th;
        }
    }




    const hideissueBook = () => {
        document.getElementById("issuebook").style.display = "none";
        setUserValue({
            search_user: '',
        });
    }

    const [bookId, setBookId] = useState();
    const [userId, setUserId] = useState();
    const [formValue, setformValue] = useState({
        mobile: '',
        address: '',
    });
    const showissueBook = (e) => {
        document.getElementById("issuebook").style.display = "block";
        const bookid = e.target.name
        setBookId(bookid)
        console.log(bookid)
        // document.getElementById("shbook").style.display = "none";
    }
    const showissueForm = (e) => {
        // document.getElementById("issuebook").style.display = "none";
        document.getElementById("issuebook").blur();
        document.getElementById("issueform").style.display = "block";

        const userid = e.target.name
        setUserId(userid)
        console.log(userid)
        // document.getElementById("shbook").style.display = "none";
    }
    const hideissueform = () => {
        document.getElementById("issueform").style.display = "none";
        document.getElementById("issuebook").style.display = "block";
    }

    const handleChange = (event) => {
        document.getElementById("cancelclear").style.display = "inline";
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });

    }

    const issuebook = async (e) => {
        e.preventDefault();
        const loginFormData = {
            mobile: formValue.mobile,
            address: formValue.address,
            book: bookId,
            student: userId,
        }

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/borrowed/`, loginFormData)
            console.log(response.data)
            if (response.status === 200){
                clearForm()
                document.getElementById("issueform").style.display = "none";
                document.getElementById("issuebook").style.display = "none";
            } else(
                console.log(response.err)
            )
        } catch (err) {
            console.log(err)
        }
    }

    const [alert, setAlert] = useState(null);

    const deleteBook = async (e) => {
        try {
            // make axios post request
            const response = await axios.delete(`http://127.0.0.1:8000/api/books/${e.target.name}`);
            if (response.status === 200) {
                dispatch(fetchAsyncBooks());
                showAlert("Book Deleted Successfully", "Success", "success")

            }

        } catch (error) {
            console.log("error:", error)
            showAlert("Something when wrong try again", "Error", "danger")
            // console.log("user: ", user)
        }

    }

    const showAlert = (msg, type, bg) => {
        setAlert({
            msg: msg,
            type: type,
            bg: bg,
        })
        setTimeout(() => {
            setAlert(null)
        }, 1500);

    }
    const clearForm = () => {
        setformValue({
            mobile: '',
            address: '',
        });
    }

    const showAddBook = () => {
        document.getElementById("bookForm").style.display = "block";
        document.getElementById("addbooknone").style.display = "none";
        document.getElementById("addbook").style.display = "none";
    }
    return (
        <>
            <div className="my-3 mx-2 position-relative">
                <div id="shbook" className="z-index-1">
                    <Alert alert={alert} />
                    <div id="addbook" className=" z-index-1 addbook py-2  px-5 rounded text-end" style={{ backgroundColor: "#2a2a2a", height: "4.2rem", borderBottom: "3px solid white" }}>
                        <div className="search-box my-2">
                            <form onSubmit={handleSubmit} className="d-flex">
                                <input onChange={handleBookChange} name="search_book" value={bookValue.search_book} className="form-control me-3" type="search" placeholder="Search" aria-label="Search" />
                                <button className="round btn btn-outline-success" type="submit"><i className="fa fa-search"></i></button>
                            </form>
                        </div>
                        <div>
                            <input type="button" className="btn my-2 text-dark btn-light" onClick={showAddBook} value="Add Book" />
                        </div>
                    </div>
                    <div className="z-index-1 mr-2 dueBook">
                        <BookForm />
                        <div id="addbooknone">
                            <div className="bg-primary py-1">
                                <h2 className="text-center">All Books</h2>
                            </div>

                            <div className="mt-1">
                                <table className="h5 table table-striped table-dark table-hover">
                                    <thead>
                                        <tr className="text-center " >
                                            <th scope="col">Book</th>
                                            <th scope="col">Author</th>
                                            <th scope="col">Edition</th>
                                            <th scope="col">Rack No.</th>
                                            <th scope="col">Status</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Bfilter.length ? Bfilter.map((book) => {
                                            return (
                                                <tr className="cap text-center" key={book.id}>
                                                    <th scope="row">{book.book_name}</th>
                                                    <td>{book.author_name}</td>
                                                    <td>{book.edition}<sup>{sup(book.edition)}</sup></td>
                                                    <td>{book.rack_no}</td>
                                                    <td>{book.stock > 0 ? <span> {book.stock} Available</span> : <span className="text-danger">Not Available</span>} </td>
                                                    <td><Link to ="#issuebook"><input onClick={showissueBook} type="button" name={book.id} className=" btn btn-primary" value="Issue" /></Link><input onClick={deleteBook} type="button" name={book.id} className=" mx-2 btn btn-danger" value="Delete" /></td>
                                                </tr>
                                            )
                                        }) :
                                            books.length && books.map((book) => {

                                                return (
                                                    <tr className="cap text-center w-100" key={book.id}>
                                                        <th scope="row">{book.book_name}</th>
                                                        <td >{book.author_name}</td>
                                                        <td >{book.edition}<sup>{sup(book.edition)}</sup></td>
                                                        <td >{book.rack_no}</td>
                                                        <td >{book.stock > 0 ? <span> {book.stock} Available</span> : <span className="text-danger">Not Available</span>} </td>
                                                        <td ><input onClick={showissueBook} type="button" name={book.id} className=" btn btn-primary" value="Issue" /> <input onClick={deleteBook} type="button" name={book.id} className="mx-2 btn btn-danger" value="Delete" /></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div tabIndex="-1" id="issuebook" className=" issdbook position-absolute z-index-2 w-100 ">
                    <div className="d-flex justify-content-center" style={{ height: "5rem" }} >
                        <div className="search-box" >
                            <form onSubmit={searchUser} className="d-flex">
                                <input onChange={handleUserChange} name="search_user" className="form-control me-3" value={userValue.search_user} type="search" placeholder="Search" aria-label="Search" />
                                <button className="round btn btn-outline-success" type="submit"><i className="fa fa-search"></i></button>
                            </form>
                        </div>
                        <div onClick={hideissueBook} className="issubtn">
                            <button type="button" className="btn-close" aria-label="Close"></button>
                        </div>
                    </div>
                    <div className="mb-3 mx-2 ">
                        <div className="mr-2 dueBook">
                            <div className="bg-primary py-1">
                                <h2 className="text-center">Users</h2>
                            </div>
                            <div className="mt-1">
                                <table className="h5 table table-striped table-dark table-hover">
                                    <thead>
                                        <tr >
                                            <th className="text-center col-md-3" scope="col">Name</th>
                                            <th className="text-center col-md-3" scope="col">Address</th>
                                            <th className="text-center col-md-1" scope="col">Course</th>
                                            <th className="text-center col-md-2" scope="col">Mobile</th>
                                            <th className="text-center col-md-4" scope="col">Email</th>
                                            <th className="text-center col-md-4" scope="col"></th>

                                        </tr>
                                    </thead>
                                    <tbody >
                                        {Ufilter.length ? Ufilter.map((user) => {
                                            return (
                                                !user.is_superuser && <tr className="text-center " key={user.id}>
                                                    <th className="cap" scope="row">{user.user_name}</th>
                                                    <td className="cap">{user.default_address}</td>
                                                    {user.course ? <td className="text-uppercase">{user.course}</td> : <td>---</td>}
                                                    <td className="cap">{user.mobile}</td>
                                                    <td className="">{user.email}</td>
                                                    <td className=""><input onClick={showissueForm} type="button" name={user.id} className=" btn btn-primary" value="Issue" /></td>
                                                </tr>
                                            )
                                        }) :

                                            users.length > 0 && users.map((user) => {
                                                return (

                                                    !user.is_superuser && <tr className="text-center " key={user.id}>
                                                        <th className="cap" scope="row">{user.user_name}</th>
                                                        <td className="cap">{user.default_address}</td>
                                                        {user.course ? <td className="text-uppercase">{user.course}</td> : <td>---</td>}
                                                        <td className="cap">{user.mobile}</td>
                                                        <td className="">{user.email}</td>
                                                        <td className=""><input onClick={showissueForm} type="button" name={user.id} className=" btn btn-primary" value="Issue" /></td>

                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
                <div  id="issueform" className="issdbook position-absolute  z-index-3 w-100 px-5 ">
                    <div className="btnnn1">
                        <div onClick={hideissueform} className="issubtnn">
                            <button type="button" className="btn-close" aria-label="Close"></button>
                        </div>
                    </div>
                    <div className="w-75 mx-auto">
                        <form onSubmit={issuebook}>
                            <div className="form-row">
                                <div className="col my-2">
                                    <label className="text-light my-2" htmlFor="inputName">Mobile:</label>
                                    <input id="mobile" required onChange={handleChange} type="number" name="mobile" className="form-control" value={formValue.mobile} id="inputName" placeholder="Mobile" />
                                </div>
                                <div className="col my-4">
                                    <label className="text-light mb-2" htmlFor="inputDescription">Address:</label>
                                    <input required onChange={handleChange} name="address" type="text" value={formValue.address} className="form-control" placeholder="Address" />
                                </div>
                            </div>
                            <div className="text-end">
                                <button id="cancelclear" onClick={clearForm} type="button" className="px-4 py-2 mx-3 btn btn-outline-danger">Cancel</button>
                                <button type="submit" className="px-4 py-2 btn btn-primary">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addbook;