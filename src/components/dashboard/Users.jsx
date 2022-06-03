import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { getAllUsers } from "../../redux/LMS/adminSlice"
import { fetchAsyncUsers } from "../../redux/LMS/adminSlice"
import { useDispatch } from "react-redux";
import axios from "axios";

function Users() {

    const users = useSelector(getAllUsers);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAsyncUsers());
    }, [dispatch]);
    console.log("users: ", users);

    const [userValue, setUserValue] = useState({
        search_user: '',
    });

    const [Ufilter, setUFilter] = useState(users);

    const searchUser = async (event) => {
        event.preventDefault();
        const loginFormData = userValue.search_user;


        try {
            // make axios post request
            const response = await axios(`http://127.0.0.1:8000/api/register/search/?search=${loginFormData}`);
            setUFilter(response.data)
            console.log(Ufilter)
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
        <>
            <div className="d-flex justify-content-center" style={{ height: "5rem" }} >
                <div className="search-box" >
                    <form onSubmit={searchUser} className="d-flex">
                        <input onChange={handleUserChange} name="search_user" value={userValue.search_user} className="form-control me-3" type="search" placeholder="Search" aria-label="Search" />
                        <button className="round btn btn-outline-success" type="submit"><i className="fa fa-search"></i></button>
                    </form>
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
                                </tr>
                            </thead>
                            <tbody>
                                {Ufilter.length ? Ufilter.map((user) => {
                                    return (
                                        !user.is_superuser &&
                                        <tr className="text-center " key={user.id}>
                                            <th scope="row">{user.user_name}</th>
                                            <td>{user.default_address}</td>
                                            {user.course ? <td>{user.course}</td> : <td>--</td>}
                                            <td>{user.mobile}</td>
                                            <td>{user.email}</td>
                                        </tr>
                                    )
                                }) :
                                        users.length > 0 && users.map((user) => {
                                            return (
                                                !user.is_superuser &&
                                                <tr className="text-center " key={user.id}>
                                                    <th scope="row">{user.user_name}</th>
                                                    <td>{user.default_address}</td>
                                                    {user.course ? <td>{user.course}</td> : <td>--</td>}
                                                    <td>{user.mobile}</td>
                                                    <td>{user.email}</td>
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

export default Users;