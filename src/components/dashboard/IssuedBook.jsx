import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { getAllbooksIssued } from "../../redux/LMS/adminSlice"
import { fetchAsyncBooksIssued } from "../../redux/LMS/adminSlice"
import { useDispatch } from "react-redux";
import axios from "axios";
import Alert from "../alert"

function IssuedBook() {

    const books = useSelector(getAllbooksIssued);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAsyncBooksIssued());
    }, [dispatch]);
    console.log("books: ", books)


    const submitBook = async (e) => {
        console.log(e.target.name)


        const loginFormData = {
            submit: 1,
        }

        try {
            // make axios post request
            const response = await axios({
                method: "patch",
                url: `http://127.0.0.1:8000/api/borrowed/${e.target.name}/`,
                data: loginFormData,
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("status:", response.status)
            if (response.status === 200) {
                showAlert("Book successfully Submited", "Success", "success")
                dispatch(fetchAsyncBooksIssued());

            }
            else (
                showAlert("Something when wrong try again", "Error", "danger")
            )

        } catch (error) {
            showAlert("Something when wrong try again", "Error", "danger")
        }
    }

    const [alert, setAlert] = useState(null);
    const showAlert = (msg, type, bg) => {
        setAlert({
            msg: msg,
            type: type,
            bg: bg,
        })
        setTimeout(() => {
            setAlert(null)
        }, 3000);

    }


    const [userValue, setUserValue] = useState({
        search_book: '',
    });

    const [Bfilter, setBfilter] = useState(books);

    const searchUser = async (event) => {
        event.preventDefault();
        const loginFormData = userValue.search_book;


        try {
            // make axios post request
            const response = await axios(`http://127.0.0.1:8000/api/borrowed/search/?search=${loginFormData}`);
            setBfilter(response.data)
            console.log("search:",Bfilter)
        } catch (error) {
            console.log("error: ", error)
        }
    }

    const handleUserChange = (event) => {
        setUserValue({
            ...userValue,
            [event.target.name]: event.target.value
        });

    }


    return (
        <> <Alert alert={alert} />

<div className="d-flex justify-content-center" style={{ height: "5rem" }} >
                <div className="search-box" >
                    <form onSubmit={searchUser} className="d-flex">
                        <input onChange={handleUserChange} name="search_book" value={userValue.search_book} className="form-control me-3" type="search" placeholder="Search" aria-label="Search" />
                        <button className="round btn btn-outline-success" type="submit"><i className="fa fa-search"></i></button>
                    </form>
                </div>
            </div>


            <div className="my-3 mx-2 ">
                <div className="mr-2 dueBook">
                    <div className="bg-primary py-1">
                        <h2 className="text-center">Issued Books</h2>
                    </div>
                    <div className="mt-1">
                        <table className="h5 table table-striped table-dark table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Book</th>
                                    <th scope="col">User</th>
                                    <th scope="col">Mobile</th>
                                    <th scope="col">Issued</th>
                                    <th scope="col">Due</th>
                                    <th className="text-center" scope="col">Submit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books && books.map((book) => {
                                    const issued = new Date(book.issue_date);
                                    const iday = issued.getDate()+1;
                                    const imonth = issued.getMonth()+1;
                                    const iyear = issued.getFullYear();
                                    const issueddate = `${iday}-${imonth}-${iyear}`;

                                    const due = new Date(book.due_date);
                                    const day = due.getDate()+1;
                                    const month = due.getMonth()+1;
                                    const year = due.getFullYear();
                                    const duedate = `${day}-${month}-${year}`;


                                    return (


                                        !book.submit && <tr className="cap" key={book.id} >
                                            <th scope="row">{book.book}</th>
                                            <td>{book.student}</td>
                                            <td>{book.mobile}</td>
                                            <td>{issueddate}</td>
                                            <td>{duedate}</td>
                                            <td className="text-center"><input onClick={submitBook} type="button" name={book.id} className=" btn btn-primary" value="Submit" /></td>
                                        </tr>

                                    )
                                })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    )
}

export default IssuedBook;