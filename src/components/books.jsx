import React from "react";
import './style.css';
import Book from './bookCard';
import CC from "./images/programmingincpp.jpg";
import Java from "./images/javaBook.jpg";
import Python from "./images/python.jpg";
import C from "./images/cBook.jpg";

function Books() {
  return (
          <div className="book-body">
            <div className="book-grid">
              <Book
                book_name = "C++ Programming"
                img = {CC}
                Author_name = "Micky Rajkumar"
              />
              <Book
                book_name = "Java Programming"
                img = {Java}
                Author_name = "Micky Rajkumar"
              />
              <Book
                book_name = "Python Programming"
                img = {Python}
                Author_name = "Micky Rajkumar"
              />
              <Book
                book_name = "C Programming"
                img = {C}
                Author_name = "Micky Rajkumar"
              />
            </div>
          </div>
            
  );
}

export default Books;
