import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { getAllCategory, fetchAsyncCategory } from "../../redux/LMS/adminSlice"
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Alert from '../alert'

function IssuedBook() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAsyncCategory());
    }, [dispatch]);
    const categories = useSelector(getAllCategory);
    console.log("books Category: ", categories)


    const [alert, setAlert] = useState(null);

    // post comment
    const [formValue, setformValue] = useState({
        category_name: '',
        description: '',
    });


    const handleSubmit = async (event) => {
        event.preventDefault();
        // const loginFormData = new FormData();
        // loginFormData.append("email", formValue.email)
        // loginFormData.append("password", formValue.password)
        // console.log(loginFormData)
        const loginFormData = {
            name: formValue.category_name,
            description: formValue.description,
        }


        try {
            // make axios post request
            const response = await axios({
                method: "post",
                url: "http://127.0.0.1:8000/api/category/",
                data: loginFormData,
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("response:", response)
            if (response.status === 200){
                setformValue({
                    category_name: '',
                    description: '',
                });
                showAlert("Category has added", "Success", "success")
                document.getElementById("cancelclear").style.display = "none";
                dispatch(fetchAsyncCategory());

            }

        } catch (error) {
            console.log("error:", error)
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




    const handleChange = (event) => {
        document.getElementById("cancelclear").style.display = "inline";
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });

    }
    const deleteCategory = async (event) => {
        const categoryId = event.target.name;


        try {
            // make axios post request
            const response = await axios({
                method: "delete",
                url: `http://127.0.0.1:8000/api/category/${categoryId}`,
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (response.status === 200){
                showAlert("Deleted", "Success", "success")

            }
            // navigate('/dashboard/category/')
            dispatch(fetchAsyncCategory());

        } catch (error) {
            showAlert("Something when wrong!! try again", "Error", "danger")
        }

    }
    const clearForm = () => {
        setformValue({
            category_name: '',
            description: '',
        });
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


    return (
        <> <Alert alert = {alert} />
            <div className="my-3 mx-2 ">
                <div className="mr-2 mb-5 dueBook">
                    <div className="bg-primary py-1">
                        <h2 className="text-center">Category Books</h2>
                    </div>
                    <div className="mt-1">
                        <table className="h5 table table-striped table-dark table-hover">
                            <thead>
                                <tr>
                                    <th scope="col-4">Book Category Name</th>
                                    <th scope="col-6">Description</th>
                                    <th scope="col-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length > 0 && categories.map((category) => {

                                    return (
                                        <tr className="cap" key={category.id}>
                                            <th className="col-4" scope="row">{category.name}</th>
                                            <td className="col-7">{category.description}</td>
                                            {/* <td className="col-8">{category.id}</td> */}
                                            <td onClick={deleteCategory} className="col-1 text-center"><input type="button" name={category.id} className=" btn btn-primary" value="Delete" /></td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                   
                    <div className="mt-5">
                        <form onSubmit={handleSubmit}>
                            <div className="w-70 form-row">
                                <div className="col my-2">
                                    <label className="text-light my-2" htmlFor="inputName">Category Name:</label>
                                    <input required onChange={handleChange} type="text" name="category_name" className="form-control" value={formValue.category_name} id="inputName" placeholder="Name" />
                                </div>
                                <div className="col my-4">
                                    <label className="text-light mb-2" htmlFor="inputDescription">Description:</label>
                                    <textarea required onChange={handleChange} name="description" type="text" value={formValue.description} className="form-control" placeholder="Descriptions" />
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

export default IssuedBook;