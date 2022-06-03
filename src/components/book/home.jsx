import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllbooks } from "../../redux/LMS/bookSlice";
import { fetchAsyncBooks } from "../../redux/LMS/bookSlice"
import { getAllCategory, fetchAsyncCategory } from "../../redux/LMS/adminSlice"
import { useDispatch } from "react-redux";
import axios from 'axios';
import Auth from "../../redux/common/isAuth"


import '../style.css';


function BookCard() {

  const  isAuth = Auth();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncBooks());
    dispatch(fetchAsyncCategory());
  }, [dispatch]);
  
  const navigate = useNavigate();
  
  const books = useSelector(getAllbooks);
  const [Bfilter, setBFilter] = useState(books);
  // console.log("books: ", books)
  const categories = useSelector(getAllCategory);
  // console.log("categories:", categories)


  const [formValue, setformValue] = useState({
    search: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginFormData = formValue.search
    // console.log(loginFormData)


    document.getElementById('bookId').style.display = "none";
    document.getElementById('spinner1').style.display = "flex";
    document.getElementById('spinner1').style.alignItems = "none";

    try {
      // make axios post request
      const response = await axios(`http://127.0.0.1:8000/api/books/search/?search=${loginFormData}`);
      // console.log("request:", response.request.onprogress)
      // console.log("response:", response.data);
      setBFilter(response.data)
      document.getElementById('bookId').style.display = "grid";
      document.getElementById('spinner1').style.display = "none";
      document.getElementById('spinner1').style.alignItems = "center";
    } catch (error) {
      console.log("error:", error)
      // console.log("user: ", user)
    }
  }





  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });

  }
  const logout = () => {
    localStorage.removeItem('Token');
    navigate('/login')
  }

  // setBFilter(books);
  const filterBook = (cat) => {
    document.getElementById('bookId').style.display = "none";
    document.getElementById('spinner1').style.display = "flex";
    document.getElementById('spinner1').style.alignItems = "none";
    const updateList = books.filter((x) => x.category === cat);
    setBFilter(updateList);
    document.getElementById('bookId').style.display = "grid";
    document.getElementById('spinner1').style.display = "none";
    document.getElementById('spinner1').style.alignItems = "center";
  }

  return (
    <>

      <div className="book-body pb-5">
        <div className="search-box">
          <form onSubmit={handleSubmit} className="d-flex pt-4">
            <input onChange={handleChange} className="form-control me-3" type="search" name="search" value={formValue.search} placeholder="Search" aria-label="Search" />
            <button className="round btn btn-outline-success" type="submit"><i className="fa fa-search"></i></button>
          </form>
        </div>
        {/* <Spinner/> */}
        <div className="py-2 search" style={{ paddingRight: "1rem" }}>
          <div className="homeNav">
            <div className='buttons d-flex justify-content-center'>
              <button className='btn btn-outline-light me-2' onClick={() => setBFilter(books)}> All</button>
              {categories.length > 0 ? categories.map((category)=>{
                return(

                <button className='btn btn-outline-light me-2' key={category.id} onClick={() => filterBook(category.id)}>{category.name}</button>
                )
              }):<div></div>};
              {/* <button className='btn btn-outline-light me-2' onClick={() => filterBook(1)}>Maths</button>
              <button className='btn btn-outline-light me-2' onClick={() => filterBook(2)}>Programming</button>
              <button className='btn btn-outline-light me-2' onClick={() => filterBook(6)}>Operating Systems</button>
              <button className='btn btn-outline-light me-2' onClick={() => filterBook(9)}>Networking</button>
              <button className='btn btn-outline-light me-2' onClick={() => filterBook(7)}>Physics</button>
              <button className='btn btn-outline-light me-2' onClick={() => filterBook(8)}>Business</button> */}
            </div>
          </div>

          <div className="d-flex ">
            <div className="">
              <Link to={`/profile/${isAuth.user.user_name}`}>
                <i className="user fa fa-user"></i>
              </Link>
            </div>

            <div >
              <button onClick={logout} className="logout text-light btn mt-1" type="button">LogOut</button>
            </div>

          </div>
        </div>
        <div id="spinner1" className="spinner1 py-5">
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <div id="bookId" className="book-grid">
          {Bfilter.length ? Bfilter.map((book) => {
            return (
              <Link to={`/book/${book.id}`} key={book.id} >
                <div className="p-2 bookoutter" >
                  <div className="bookCard ">
                    <div className="img">
                      <img src={book.image} alt="name" className="img-fluid" />
                    </div>
                    <div className="pb-2 px-1 mt-1 text-center booktext" >
                      <h3 className="mb-0 h5 cap" style={{ color: "#2f00bf" }}>{book.book_name}</h3>
                      <p className=" m-0">by</p>
                      <h5 className="btnn h6 cap">{book.author_name}</h5>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })
            : books.length && books.map((book) => {
              return (
                <Link to={`/book/${book.id}`} key={book.id} >
                  <div className="p-2 bookoutter" >
                    <div className="bookCard ">
                      <div className="img">
                        <img src={book.image} alt="name" className="img-fluid" />
                      </div>
                      <div className="pb-2 mt-1 text-center booktext" >
                        <h3 className="mb-0 h5 cap" style={{ color: "#2f00bf" }}>{book.book_name}</h3>
                        <p className=" m-0">by</p>
                        <h5 className="btnn h6 cap">{book.author_name}</h5>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
        </div>
        {/* <Outlet /> */}





      </div>
    </>



  )
}

export default BookCard;