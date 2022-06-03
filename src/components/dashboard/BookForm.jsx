import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory, fetchAsyncCategory } from "../../redux/LMS/adminSlice";
import {fetchAsyncBooks } from "../../redux/LMS/bookSlice";
import axios from "axios";
import Alert from "../alert";

const BookForm = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAsyncCategory());
    }, [dispatch]);
    const categories = useSelector(getAllCategory);



    const [formValue, setformValue] = useState({
        book_name: '',
        author_name: '',
        stock: '',
        edition: '',
        rack_no: '',
        category: '',
        description: '',
    });

    const [image, setImage] = useState(null);
    const [alert, setAlert] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // const loginFormData = new FormData();
        // loginFormData.append("email", formValue.email)
        // loginFormData.append("password", formValue.password)
        const loginFormData = {
            book_name: formValue.book_name,
            author_name: formValue.author_name,
            image: image,
            stock: formValue.stock,
            edition: formValue.edition,
            rack_no: formValue.rack_no,
            category: formValue.category,
            description: formValue.description,
        }


        try {
            // make axios post request
            const response = await axios({
                method: "post",
                url: "http://127.0.0.1:8000/api/books/",
                data: loginFormData,
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("status:",response.status)
            if (response.status===200){
                clearForm();
                showAlert("Book has added", "Success", "success")
                dispatch(fetchAsyncBooks());

            }
            else(
                showAlert("Something when wrong try again", "Error", "danger")
            )
            // document.getElementById("cancelclear").style.display = "none";
            // dispatch(fetchAsyncCategory());

        } catch (error) {
            showAlert("Something when wrong try again", "Error", "danger")
        }

        // try{
        // setformValue(
        // '');
        // console.log(formValue)

        // }catch (error) {
        //     console.log("error:", error)
        // }

        
    }

    const showAlert = (msg, type, bg) => {
        setAlert({
            msg: msg,
            type: type,
            bg: bg,
        })
        setTimeout(()=>{
            setAlert(null)
           },2000);
        
    }




    const handleChange = (event) => {
        // document.getElementById("cancelclear").style.display = "inline";
        if (event.target.name === "image") {

            console.log(event.target.files[0])
            setImage(event.target.files[0]);
        } else {
            setformValue({
                ...formValue,
                [event.target.name]: event.target.value
            });

        }

    }

    const clearForm = () => {
        setformValue({
            book_name: '',
            author_name: '',
            stock: '',
            edition: '',
            rack_no: '',
            category: '',
            description: '',
        });
        setImage(null);
    }



    const hideAddBook = () => {
        document.getElementById("bookForm").style.display = "none";
        document.getElementById("addbooknone").style.display = "Block";
        document.getElementById("addbook").style.display = "flex";
    }
    return (
        <>
        <Alert alert={alert}/>
            <div id="bookForm" className="bookForm pt-3 my-3 rounded pb-5">
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="col my-2">
                            <label htmlFor="inputEmail4">Book Name:</label>
                            <input type="text" onChange={handleChange} className="form-control" name="book_name" id="book_name" value={formValue.book_name} placeholder="Book Name" />
                        </div>
                        <div className="col my-2">
                            <label htmlFor="inputPassword4">Author Name:</label>
                            <input type="text" className="form-control" onChange={handleChange} name="author_name" id="inputPassword4" value={formValue.author_name} placeholder="author Name" />
                        </div>
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="inputAddress">Description:</label>
                        <textarea name="description" type="text" onChange={handleChange} className="form-control" value={formValue.description} placeholder="Descriptions" />
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="Image">Image:</label>
                        <input type="file" onChange={handleChange} name="image" className="form-control" id="file" />
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="Stock">Stock:</label>
                        <input type="number" onChange={handleChange} name="stock" className="form-control" value={formValue.stock} />
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="Stock">Edition:</label>
                        <input type="number" onChange={handleChange} name="edition" className="form-control" value={formValue.edition} />
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="Stock">Rack No.:</label>
                        <input type="number" onChange={handleChange} name="rack_no" className="form-control" value={formValue.rack_no} />
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="category">Category: </label>
                        <select id="inputState" onChange={handleChange} className="form-control" name="category" value={formValue.category} >
                            <option defaultValue="---">---</option>
                            {categories.length > 0 && categories.map((category) => {
                                return (

                                    <option key={category.id} value={category.id}>{category.name}</option>
                                )
                            })
                            }
                        </select>
                    </div>
                    <div className="text-end">
                        <button type="button" onClick={hideAddBook} className="px-4 py-2 mx-3 btn btn-outline-danger">Cancel</button>
                        <button type="submit" className="px-4 py-2 btn btn-primary">Add</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default BookForm;