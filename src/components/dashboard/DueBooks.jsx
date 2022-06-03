import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { getAllbooksIssued } from "../../redux/LMS/adminSlice"
import { fetchAsyncBooksIssued } from "../../redux/LMS/adminSlice"
import { useDispatch } from "react-redux";

function DueBooks() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAsyncBooksIssued());
    }, [dispatch]);
    const books = useSelector(getAllbooksIssued);
    console.log("books: ", books)
    return (
        <>
            <div className="my-3 mx-2 ">
                <div className="d-flex addbook py-2  px-5 rounded text-end" style={{ backgroundColor: "#2a2a2a", height: "4.2rem", borderBottom: "3px solid white" }}>
                    <div className="search-box my-2">
                        <form className="d-flex">
                            <input className="form-control me-3" type="search" placeholder="Search" aria-label="Search" />
                            <button className="round btn btn-outline-success" type="submit"><i className="fa fa-search"></i></button>
                        </form>
                    </div>
                </div>
                <div className="mr-2 dueBook">
                    <div className="py-1" style={{ backgroundColor: '#00248a', height: "4rem" }}>
                        <h2 className="text-center text-danger">Due Books</h2>
                    </div>
                    <div className="mt-1">
                        <table className="h5 table table-striped table-dark table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Book</th>
                                    <th scope="col">User</th>
                                    <th scope="col">Mobile</th>
                                    <th scope="col">Issued</th>
                                    <th scope="col">Upto</th>
                                    <th className="text-center" scope="col">Submit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books && books.map((book) => {
                                    const today = new Date();
                                    const tday = today.getDate();
                                    const tmonth = today.getMonth() + 1;
                                    const tyear = today.getFullYear();
                                    const todaydate = `${tday}-${tmonth}-${tyear}`;

                                    const issued = new Date(book.issue_date);
                                    const iday = issued.getDate() - 1;
                                    const imonth = issued.getMonth() + 1;
                                    const iyear = issued.getFullYear();
                                    const issueddate = `${iday}-${imonth}-${iyear}`;

                                    const due = new Date(book.due_date);
                                    const day = due.getDate() - 1;
                                    const month = due.getMonth() + 1;
                                    const year = due.getFullYear();
                                    const duedate = `${day}-${month}-${year}`;

                                    console.log("today:", todaydate);
                                    console.log("duedate:", duedate)

                                    if (todaydate < duedate) {

                                        console.log("today:", todaydate);
                                        console.log("duedate:", duedate)
                                        return (
                                            !book.submit && <tr className="cap" key={book.id}>
                                                <th scope="row">{book.book}</th>
                                                <td>{book.student}</td>
                                                <td>{book.mobile}</td>
                                                <td>{issueddate}</td>
                                                <td className="text-danger">{duedate}</td>
                                                <td className="text-center"><input type="submit" className=" btn btn-primary" value="Submit" /></td>
                                            </tr>
                                        )
                                    }
                                })
                                }
                                <tr className="cap">
                                    <th scope="row">basic java</th>
                                    <td>Chaoba Thounaojam</td>
                                    <td>9774846543</td>
                                    <td>10-5-2022</td>
                                    <td className="text-danger">28-5-2022</td>
                                    <td className="text-center"><input type="submit" className=" btn btn-primary" value="Submit" /></td>
                                </tr>
                                <tr className="cap">
                                    <th scope="row">basic java</th>
                                    <td>Chaoba Thounaojam</td>
                                    <td>9774846543</td>
                                    <td>10-5-2022</td>
                                    <td className="text-danger">28-5-2022</td>
                                    <td className="text-center"><input type="submit" className=" btn btn-primary" value="Submit" /></td>
                                </tr>
                                <tr className="cap">
                                    <th scope="row">basic java</th>
                                    <td>Chaoba Thounaojam</td>
                                    <td>9774846543</td>
                                    <td>10-5-2022</td>
                                    <td className="text-danger">28-5-2022</td>
                                    <td className="text-center"><input type="submit" className=" btn btn-primary" value="Submit" /></td>
                                </tr>
                                <tr className="cap">
                                    <th scope="row">basic java</th>
                                    <td>Chaoba Thounaojam</td>
                                    <td>9774846543</td>
                                    <td>10-5-2022</td>
                                    <td className="text-danger">28-5-2022</td>
                                    <td className="text-center"><input type="submit" className=" btn btn-primary" value="Submit" /></td>
                                </tr>
                                <tr className="cap">
                                    <th scope="row">basic java</th>
                                    <td>Chaoba Thounaojam</td>
                                    <td>9774846543</td>
                                    <td>10-5-2022</td>
                                    <td className="text-danger">28-5-2022</td>
                                    <td className="text-center"><input type="submit" className=" btn btn-primary" value="Submit" /></td>
                                </tr>
                                <tr className="cap">
                                    <th scope="row">basic java</th>
                                    <td>Chaoba Thounaojam</td>
                                    <td>9774846543</td>
                                    <td>10-5-2022</td>
                                    <td className="text-danger">28-5-2022</td>
                                    <td className="text-center"><input type="submit" className=" btn btn-primary" value="Submit" /></td>
                                </tr>
                                <tr className="cap">
                                    <th scope="row">basic java</th>
                                    <td>Chaoba Thounaojam</td>
                                    <td>9774846543</td>
                                    <td>10-5-2022</td>
                                    <td className="text-danger">28-5-2022</td>
                                    <td className="text-center"><input type="submit" className=" btn btn-primary" value="Submit" /></td>
                                </tr>
                                <tr className="cap">
                                    <th scope="row">basic java</th>
                                    <td>Chaoba Thounaojam</td>
                                    <td>9774846543</td>
                                    <td>10-5-2022</td>
                                    <td className="text-danger">28-5-2022</td>
                                    <td className="text-center"><input type="submit" className=" btn btn-primary" value="Submit" /></td>
                                </tr>
                                <tr className="cap">
                                    <th scope="row">basic java</th>
                                    <td>Chaoba Thounaojam</td>
                                    <td>9774846543</td>
                                    <td>10-5-2022</td>
                                    <td className="text-danger">28-5-2022</td>
                                    <td className="text-center"><input type="submit" className=" btn btn-primary" value="Submit" /></td>
                                </tr>
                                <tr className="cap">
                                    <th scope="row">basic java</th>
                                    <td>Chaoba Thounaojam</td>
                                    <td>9774846543</td>
                                    <td>10-5-2022</td>
                                    <td className="text-danger">28-5-2022</td>
                                    <td className="text-center"><input type="submit" className=" btn btn-primary" value="Submit" /></td>
                                </tr>
                                <tr className="cap">
                                    <th scope="row">basic java</th>
                                    <td>Chaoba Thounaojam</td>
                                    <td>9774846543</td>
                                    <td>10-5-2022</td>
                                    <td className="text-danger">28-5-2022</td>
                                    <td className="text-center"><input type="submit" className=" btn btn-primary" value="Submit" /></td>
                                </tr>
                                <tr className="cap">
                                    <th scope="row">basic java</th>
                                    <td>Chaoba Thounaojam</td>
                                    <td>9774846543</td>
                                    <td>10-5-2022</td>
                                    <td className="text-danger">28-5-2022</td>
                                    <td className="text-center"><input type="submit" className=" btn btn-primary" value="Submit" /></td>
                                </tr>
                                <tr className="cap">
                                    <th scope="row">basic java</th>
                                    <td>Chaoba Thounaojam</td>
                                    <td>9774846543</td>
                                    <td>10-5-2022</td>
                                    <td className="text-danger">28-5-2022</td>
                                    <td className="text-center"><input type="submit" className=" btn btn-primary" value="Submit" /></td>
                                </tr>
                                <tr className="cap">
                                    <th scope="row">basic java</th>
                                    <td>Chaoba Thounaojam</td>
                                    <td>9774846543</td>
                                    <td>10-5-2022</td>
                                    <td className="text-danger">28-5-2022</td>
                                    <td className="text-center"><input type="submit" className=" btn btn-primary" value="Submit" /></td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    )
}

export default DueBooks;