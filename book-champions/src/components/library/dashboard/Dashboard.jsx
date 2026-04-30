import { useState, useEffect } from "react";
import Books from "../books/Books";
import BookForm from "../bookForm/BookForm"
import { useNavigate, useLocation } from "react-router";
import { Button } from "react-bootstrap";
import { Routes, Route } from "react-router";
import BookDetails from "../bookDetails/BookDetails";
import { successToast, errorToast } from "../../../utils/notifications";

function Dashboard({ onLogout }) {

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogoutClick = () => {
        onLogout();
        navigate("/login");
    };

    const handleNavigateAddBook = () => {
        navigate("add-book", { replace: true });
    };

    const [bookList, setBookList] = useState([]);

    useEffect(()=> {
        if(location.pathname == "/library"){
        fetch("http://localhost:3000/books")
        .then(res => res.json())
        .then(data =>  setBookList(data))
        .catch(err => console.log(err));
        }    
    }, [location]);

    const handleBookAdded = (enteredBook) => {

        if(!enteredBook.title || !enteredBook.author){
            errorToast("Titulo y autor son obligatorios.");
            return;
        }

        fetch("http://localhost:3000/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(enteredBook)
        })
        .then(res => res.json())
        .then(data => {
            setBookList(prev => [data, ...prev]);
            successToast("Libro agregado correctamente");
            navigate("/library");
        })
        .catch(err => {
            errorToast("No se pudo agregar el libro");
        });
    };

    return (
        <div className="d-flex flex-column align-items-center w-100">
            <div className="w-100 d-flex justify-content-end p-3 gap-2">
                <Button variant="secondary" onClick={handleNavigateAddBook}>
                    Agregar libro
                </Button>
                <Button variant="danger" onClick={handleLogoutClick}>
                    Cerrar sesión
                </Button>
            </div>
            <h2>Books Champion App</h2>
            <Routes>
                <Route index element={<Books books={bookList} />} />
                <Route path="add-book" element={<BookForm onBookAdded={handleBookAdded} />} />
                <Route path=":id" element={<BookDetails />} />
            </Routes>
        </div>
    );
}

export default Dashboard;