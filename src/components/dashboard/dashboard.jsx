import React, { useEffect, } from 'react';
import { useSelector } from "react-redux";
import { getAllbooksIssued, getAllUsers } from "../../redux/LMS/adminSlice"
import { fetchAsyncBooksIssued, fetchAsyncUsers } from "../../redux/LMS/adminSlice"
import { getAllbooks } from "../../redux/LMS/bookSlice";
import { fetchAsyncBooks } from "../../redux/LMS/bookSlice"
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Dashboard() {

    const ibooks = useSelector(getAllbooksIssued);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAsyncBooksIssued());
    }, [dispatch]);
    console.log("ibooks: ", ibooks)

    const books = useSelector(getAllbooks);
    useEffect(() => {
        dispatch(fetchAsyncBooks());
    }, [dispatch]);
    console.log("books: ", books)

    const users = useSelector(getAllUsers);
    useEffect(() => {
        dispatch(fetchAsyncUsers());

    }, [dispatch]);
    console.log("users: ", users)

    // const [Ifilter, setIFilter] = useState([]);


    // const filterIssued = (id) => {
    //     if (ibooks && ibook.length > 0) {
    //     const updateList = ibooks.filter((x) => x.id === id);
    //     setIFilter(updateList);
    //   };

    //   dispatch(filterIssued(1));


    //   console.log("Ifilter:", Ifilter)


    return (
        <>
            {/* <div className="search-box mt-4 my-2">
                <form className="d-flex">
                    <input className="form-control me-3" type="search" placeholder="Search" aria-label="Search" />
                    <button className="round btn btn-outline-success" type="button"><i className="fa fa-search"></i></button>
                </form>
            </div> */}
            <div className="dbdcon">
                <div className="dbdinside mx-2 my-3">
                    <div className="dbditem">
                        <div className="wrapper">
                            <div className="card12">
                                <Link to="/dashboard/users">
                                    <div className="card13">
                                        <i className="fa fa-users"></i>
                                        <h1>
                                            <span className="enclosed">Students </span>Number
                                            <br />
                                            <span className="num">{users && users.length ? users.length : 0}</span>
                                        </h1>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="dbditem">
                        <div className="wrapper">
                            <div className="card12">
                                <Link to="/dashboard/issued-books">
                                    <div className="card13">
                                        <i className="fa fa-book"></i>
                                        <h1>
                                            <span className="enclosed">Books </span>Number
                                            <br />
                                            <span className="num">{books && books.length ? books.length : 0}</span>
                                        </h1>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* <div  className="dbditem">
                        <div className="wrapper">
                            <div className="card12">
                                <Link to="/dashboard/issued-books">
                                    <div className="card13">
                                        <i className="fa fa-book"></i>
                                        <h1>
                                            <span className="enclosed">Issued </span>Books
                                            <br />
                                            <span onClick={() => filterIssued(1)} className="num">{Ifilter && Ifilter.length ? Ifilter.length: 0}</span>
                                        </h1>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
            <div className="my-3 mx-2 issuedDueBook">
                <div className="mr-2 dueBook">
                    <div className="bg-primary py-1">
                        <Link className="text-decoration-none" to="/dashboard/issued-books"><h2 className="text-dark text-center">Issued Books</h2></Link>
                    </div>
                    <div className="mt-1">
                        <table className="h5 table table-striped table-dark table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Book</th>
                                    <th scope="col">User</th>
                                    <th scope="col">Issued</th>
                                    <th scope="col">Due</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ibooks && ibooks.map((book) => {
                                    const issued = new Date(book.issue_date);

                                    const iday = issued.getDate();
                                    const imonth = issued.getMonth() + 1;
                                    const iyear = issued.getFullYear();
                                    const issueddate = `${iday}-${imonth}-${iyear}`;

                                    const due = new Date(book.due_date);
                                    const day = due.getDate();
                                    const month = due.getMonth() + 1;
                                    const year = due.getFullYear();
                                    const duedate = `${day}-${month}-${year}`;

                                    return (


                                        !book.submit && <tr className="cap" key={book.id}>
                                            <th scope="row">{book.book}</th>
                                            <td>{book.student}</td>
                                            <td>{issueddate}</td>
                                            <td>{duedate}</td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="ml-2 dueBook">
                    <div className="bg-danger py-1">
                        <Link className="text-decoration-none" to="/dashboard/due-books"><h2 className="text-dark text-center">Due Books</h2></Link>
                    </div>
                    <div className="mt-1">
                        <table className="h5 table table-striped table-dark table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Book</th>
                                    <th scope="col">User</th>
                                    <th scope="col">Issued</th>
                                    <th scope="col">Due</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ibooks && ibooks.map((book) => {
                                    const today = new Date();
                                    const tday = today.getDate() + 1;
                                    const tmonth = today.getMonth() + 1;
                                    const tyear = today.getFullYear();
                                    const todaydate = `${tday}-${tmonth}-${tyear}`;

                                    const issued = new Date(book.issue_date);
                                    const iday = issued.getDate() + 1;
                                    const imonth = issued.getMonth() + 1;
                                    const iyear = issued.getFullYear();
                                    const issueddate = `${iday}-${imonth}-${iyear}`;

                                    const due = new Date(book.due_date);
                                    const day = due.getDate() + 1;
                                    const month = due.getMonth() + 1;
                                    const year = due.getFullYear();
                                    const duedate = `${day}-${month}-${year}`;

                                    if (todaydate < duedate) {
                                        return (

                                            !book.submit &&
                                            <tr className="cap" key={book.id}>
                                                <th scope="row">{book.book}</th>
                                                <td>{book.student}</td>
                                                <td>{issueddate}</td>
                                                <td className="text-danger">{duedate}</td>
                                            </tr>
                                        )
                                    }

                                })
                                }
                                <tr className="cap" >
                                    <th scope="row">Finance</th>
                                    <td>Chaoba Thounaojam</td>
                                    <td>10-5-2022</td>
                                    <td className="text-danger">28-5-2022</td>
                                </tr>
                                <tr className="cap" >
                                    <th scope="row">physics</th>
                                    <td>Rahul Palujam </td>
                                    <td>10-5-2022</td>
                                    <td className="text-danger">28-5-2022</td>
                                </tr>
                                <tr className="cap" >
                                    <th scope="row">Finance</th>
                                    <td>Bibeka Naorem</td>
                                    <td>10-5-2022</td>
                                    <td className="text-danger">28-5-2022</td>
                                </tr>
                                <tr className="cap" >
                                    <th scope="row">core Python</th>
                                    <td>Naobi Amom</td>
                                    <td>10-5-2022</td>
                                    <td className="text-danger">28-5-2022</td>
                                </tr>
                                <tr className="cap" >
                                    <th scope="row">basic java</th>
                                    <td>Chaoba Thounaojam</td>
                                    <td>10-5-2022</td>
                                    <td className="text-danger">28-5-2022</td>
                                </tr>
                                <tr className="cap" >
                                    <th scope="row">basic java</th>
                                    <td>Chaoba Thounaojam</td>
                                    <td>10-5-2022</td>
                                    <td className="text-danger">28-5-2022</td>
                                </tr>
                                <tr className="cap" >
                                    <th scope="row">basic java</th>
                                    <td>Chaoba Thounaojam</td>
                                    <td>10-5-2022</td>
                                    <td className="text-danger">28-5-2022</td>
                                </tr>
                                <tr className="cap" >
                                    <th scope="row">basic java</th>
                                    <td>Chaoba Thounaojam</td>
                                    <td>10-5-2022</td>
                                    <td className="text-danger">28-5-2022</td>
                                </tr>
                                <tr className="cap" >
                                    <th scope="row">basic java</th>
                                    <td>Chaoba Thounaojam</td>
                                    <td>10-5-2022</td>
                                    <td className="text-danger">28-5-2022</td>
                                </tr>
                                <tr className="cap" >
                                    <th scope="row">basic java</th>
                                    <td>Chaoba Thounaojam</td>
                                    <td>10-5-2022</td>
                                    <td className="text-danger">28-5-2022</td>
                                </tr>
                                <tr className="cap" >
                                    <th scope="row">basic java</th>
                                    <td>Chaoba Thounaojam</td>
                                    <td>10-5-2022</td>
                                    <td className="text-danger">28-5-2022</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Dashboard;