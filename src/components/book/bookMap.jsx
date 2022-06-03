import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { getAllbooks } from "../../redux/LMS/bookSlice"
import { Link } from "react-router-dom";
import { fetchAsyncBooks } from "../../redux/LMS/bookSlice"
import { useDispatch } from "react-redux";
import apiBase from '../../redux/common/api'


const BookMap = () => {
    const books = useSelector(getAllbooks);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAsyncBooks());
    }, [dispatch]);
    console.log("books: ",books)

    // useEffect(() => {
    //     const fetchBooks = async () => {
    //         const response = await apiBase.get(`/books/`, true).catch((err) => {
    //             console.log("err: ", err);
    //         });
    //         console.log("response: ", response);
    //     };
    //     fetchBooks();
    // },[]);

    // const renderList = books.map((book) => {

    //     return (
    //         <Link to={`/book/${book.id}`} key={book.id} >
    //             <div className="p-2 bookoutter" >
    //                 <div className="bookCard ">
    //                     <div className="img">
    //                         <img src={book.image} alt="name" className="img-fluid" />
    //                     </div>
    //                     <div className="pb-2 mt-1 text-center booktext" >
    //                         <h3 className="mb-0 h5" style={{ color: "#2f00bf" }}>{book.book_name}</h3>
    //                         <p className=" m-0">by</p>
    //                         <h5 className="btnn h6 ">{book.author_name}</h5>
    //                     </div>
    //                 </div>
    //             </div>
    //         </Link>
    //     )
    // })

    return (
        <>
            {books.length > 0 && books.map((book) => {
                return (
                <Link to={`/book/${book.id}`} key={book.id} >
                    <div className="p-2 bookoutter" >
                        <div className="bookCard ">
                            <div className="img">
                                <img src={book.image} alt="name" className="img-fluid" />
                            </div>
                            <div className="pb-2 mt-1 text-center booktext" >
                                <h3 className="mb-0 h5" style={{ color: "#2f00bf" }}>{book.book_name}</h3>
                                <p className=" m-0">by</p>
                                <h5 className="btnn h6 ">{book.author_name}</h5>
                            </div>
                        </div>
                    </div>
                </Link>
                )
            })
            }
        </>
    )
}

export default BookMap;