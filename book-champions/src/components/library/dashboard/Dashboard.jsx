import { useState } from "react";
import Books from "../books/Books";
import NewBook from "../newBook/NewBook";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { Routes, Route } from "react-router";
import BookDetails from "../bookDetails/BookDetails";

function Dashboard({ onLogout }) {

    const navigate = useNavigate();

    const handleLogoutClick = () => {
        onLogout();
        navigate("/login");
    };

    const handleNavigateAddBook = () => {
        navigate("add-book", { replace: true });
    };

    const books = [
        {
            id: 1,
            title: "100 años de soledad",
            author: "Gabriel García Márquez",
            rating: 5,
            pageCount: 410,
            imageUrl: "https://covers.openlibrary.org/b/isbn/9780307474728-L.jpg",
            available: true,
            summary: "Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía recordaría aquella tarde en que su padre lo llevó a conocer el hielo. La historia de la familia Buendía mezcla realismo y fantasía en un relato inolvidable sobre el amor, la tragedia y el destino."
        },
        {
            id: 2,
            title: "El principito",
            author: "Antoine de Saint-Exupéry",
            rating: 4.5,
            pageCount: 96,
            imageUrl: "https://covers.openlibrary.org/b/isbn/9780156013987-L.jpg",
            available: true,
            summary: "Un pequeño príncipe viaja de planeta en planeta aprendiendo sobre la vida, la amistad y el amor. Una obra poética que invita a ver el mundo con los ojos de un niño."
        },
        {
            id: 3,
            title: "Harry Potter y la piedra filosofal",
            author: "J.K. Rowling",
            rating: 4.8,
            pageCount: 223,
            imageUrl: "https://covers.openlibrary.org/b/isbn/9788478884452-L.jpg",
            available: false,
            summary: "Harry descubre que es un mago y comienza su formación en Hogwarts. Allí vivirá aventuras, hará amigos y enfrentará peligros relacionados con su pasado."
        },
        {
            id: 4,
            title: "Orgullo y prejuicio",
            author: "Jane Austen",
            rating: 4.6,
            pageCount: 279,
            imageUrl: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
            available: true,
            summary: "La historia de Elizabeth Bennet y el señor Darcy, donde el amor se enfrenta a los prejuicios sociales y personales en la Inglaterra del siglo XIX."
        }
    ];

    const [bookList, setBookList] = useState(books);

    const handleBookAdded = (enteredBook) => {
        const bookData = {
            ...enteredBook,
            id: Math.random()
        };

        setBookList(prev => [bookData, ...prev]);
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
                <Route path="add-book" element={<NewBook onBookAdded={handleBookAdded} />} />
                <Route path=":id" element={<BookDetails />} />
            </Routes>
        </div>
    );
}

export default Dashboard;