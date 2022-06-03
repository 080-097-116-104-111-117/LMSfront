import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../style.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncBook, getSelectedBooks, removeSelectedBooks, getAllComments, fetchAsyncComments } from "../../redux/LMS/bookSlice"
import axios from "axios";
import Auth from "../../redux/common/isAuth"

import CC from "../images/user.png";


const Book = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAsyncBook(id));
        dispatch(fetchAsyncComments());

        return () => {
            dispatch(removeSelectedBooks());
        }
    }, [dispatch, id]);
    const book = useSelector(getSelectedBooks)
    const comments = useSelector(getAllComments)
    const [Cfilter, setCFilter] = useState(comments);


    const filterComments = () => {
        if (comments && comments.length > 0) {
            const updateList = comments.filter(checkBook);
            setCFilter(updateList);

        }

    }

    const book1 = parseInt(id)
    function checkBook(comment) {
        return comment.book === book1;
    }


    // get localStorage
    const user = Auth();

    // post comment
    const [formValue, setformValue] = useState("");
    const [Comment, setComment] = useState();

    const bookId = parseInt(id)

    const handleSubmit = async (event) => {
        event.preventDefault();
        // const loginFormData = new FormData();
        // loginFormData.append("email", formValue.email)
        // loginFormData.append("password", formValue.password)
        // console.log(loginFormData)
        const loginFormData = {
            comment: formValue,
            book: bookId,
            student: user.user.id,
        }


        try {
            // make axios post request
            const response = await axios({
                method: "post",
                url: "http://127.0.0.1:8000/api/comment/",
                data: loginFormData,
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (response.status === 200){

                setComment(formValue)
                setformValue(
                    '');
            }
        } catch (error) {
            console.log("error:", error)
        }
        // try{
        // setformValue(
        // '');
        // console.log(formValue)

        // }catch (error) {
        //     console.log("error:", error)
        // }
    }




    const handleChange = (event) => {
        setformValue(
            event.target.value
        );

    }

    const sup = (num) => {
        const st = "st";
        const nd = "nd";
        const rd = "rd";
        const th = "th";

        if (num === 1) {
            return st;
        }
        if (num === 2) {
            return nd;
        }
        if (num === 3) {
            return rd;
        } else {
            return th;
        }
    }





    return (
        <>
            <div onLoad={filterComments} className="book1" >
                <div style={{ width: "70%", marginRight: "auto", marginLeft: "auto", paddingTop: "4rem", paddingBottom: "10rem", color: "white", backgroundColor: "#000e42" }}>

                    <div className="">
                        <div className="bookcard2 py-5 ">
                            <div className="img1">

                                <div className="description">
                                    <div className="booktitle">
                                        <h2 className="bookName mb-4 mt-0 ">{book.book_name}</h2>
                                        <div className="Bdetail mb-4">

                                            {/* <h2 className="bookName mb-4 mt-0 ">Python</h2> */}
                                            <p className="bookName" >Author :<strong > {book.author_name}</strong></p>
                                            {/* <p className="bookName" >Author :<strong > Micky</strong></p> */}
                                            <p> Edition : <strong > {book.edition}<sup>{sup(book.edition)}</sup> Edition</strong></p>
                                            <p> Rack No.: <strong > {book.rack_no} </strong></p>
                                        </div>
                                        <div className="Bdescription"><p>{book.description}</p></div>
                                    </div>
                                    {!book.stock && 
                                    <div className="booktitle1 mt-5">
                                        <p className="text-danger">Currently not Available</p>
                                        <div className=" ">
                                            <p>Notify me when available</p><input type="button" className="btn btn-warning" value="Notify" />
                                        </div>
                                    </div>}
                                </div>
                                {/* <div className="bookimg img"> */}
                                <img src={book.image} alt="{book.book_name}" className="img-fluid" />
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="comment mb-3 mt-5">
                    <div className="commentForm">
                        <div className="d-flex justify-content-center">
                            <div className="" style={{ width: "70%" }}>
                                <div className="card shadow-0 border" style={{ backgroundColor: " rgb(0 14 66)" }}>
                                    <div className="text-light mx-4 mt-3">
                                        <h3>Reader's Reviews</h3>
                                    </div>
                                    <div className="card-body p-4">
                                        <div className="form-outline mb-4">
                                            <form onSubmit={handleSubmit} className="text-end">
                                                <input type="text" autoComplete="off" name="comment" value={formValue} onChange={handleChange} placeholderid="addANote" required className="form-control bg-transparent" style={{ color: "white" }} placeholder="Type comment..." />
                                                <input type="submit" className="btn mt-2 btn-dark" value="Comment" />
                                            </form>
                                        </div>
                                        { Comment && <div className="card2">
                                                    <div className="card-body mb-3">
                                                        <div className="d-flex justify-content-between">
                                                            <div className="d-flex flex-row align-items-center">
                                                                <img className="imgbg" src={CC} alt="avatar" width="50"
                                                                    height="50" />
                                                                <h5 className="text-light mx-2 mb-0 cap">{user.user.user_name}</h5>
                                                                {/* <h5 className="text-light mx-2 mb-0 cap">test</h5> */}
                                                            </div>
                                                        </div>
                                                        <div className="commentContent text-light">
                                                            <p>{Comment}</p>
                                                        </div>
                                                    </div>
                                                </div>}

                                        {Cfilter.length ? Cfilter.map((comment) => {
                                           
                                            return (
                                                <div className="card2" key={comment.id}>
                                                    <div className="card-body mb-3">
                                                        <div className="d-flex justify-content-between">
                                                            <div className="d-flex flex-row align-items-center">
                                                                <img className="imgbg" src={CC} alt="avatar" width="50"
                                                                    height="50" />
                                                                <h5 className="mx-3 mb-0 cap" style={{color:"#00d0ff"}}>{comment.student}</h5>
                                                            </div>
                                                        </div>
                                                        <div className="commentContent text-light">
                                                            <p>{comment.comment}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            )
                                        }) :
                                            <div className="card2">
                                                <div className="card-body mb-3">
                                                    <div className="d-flex justify-content-between">
                                                    </div>
                                                    <div className="commentContent text-light text-center">
                                                        <h3>Be the First person to Review</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        }


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Book;