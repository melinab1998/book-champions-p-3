import { useState, useEffect } from "react";
import Books from "../books/Books";
import BookForm from "../bookForm/BookForm"
import { useNavigate, useLocation } from "react-router";
import { Button } from "react-bootstrap";
import { Routes, Route } from "react-router";
import BookDetails from "../bookDetails/BookDetails";
import { successToast, errorToast } from "../../../utils/notifications";
import { getBooks, addBook } from "../dashboard/Dashboard.services.js"

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

    useEffect(() => {
        if (location.pathname == "/library") {

            getBooks(
                (data) => setBookList(data),
                (err) => {
                    console.log(err);
                    errorToast(err.message);
                }
            );

        }
    }, [location]);

    const handleBookAdded = (enteredBook) => {

        if (!enteredBook.title || !enteredBook.author) {
            errorToast("Titulo y autor son obligatorios.");
            return;
        }

        addBook(
            enteredBook,
            (data) => {
                setBookList(prev => [data, ...prev]);
                successToast("Libro agregado correctamente");
                navigate("/library");
            },
            (err) => {
                errorToast(err.message);
            }
        );
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