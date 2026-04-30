import { useLocation, useNavigate, useParams } from "react-router";
import { Badge, Button, Card, Row } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { successToast } from "../../../utils/notifications";
import BookForm from "../bookForm/BookForm";

const BookDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [showBookForm, setBookForm] = useState(false);
    const [book, setBook] = useState(null);

    const {id} = useParams();

    useEffect(()=>{
        const bookState = {
            ...location.state.book, id: parseInt(id, 10)
        };
        setBook(bookState);
    }, [location.state.book, id]);

    const clickHandler = () => {
        navigate("/library");
    };

    const ratingStars = Array.from({ length: 5 }, (_, index) =>
        index < book?.rating ? <StarFill key={index} /> : <Star key={index} />
    );

    const handleShowForm = () => {
        setBookForm(prev => !prev);
    }

    const handleBookUpdate = (bookData) => {
        setBook({...bookData, id: book.id});
    }

    const handleSaveBook = (bookData) => {
        fetch(`http://localhost:3000/books/${book.id}`, {
            headers: {
                "Content-type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(bookData)
        })
        .then(res => res.json())
        .then(()=>{
            handleBookUpdate(bookData);
            successToast(`¡Libro ${bookData.title} actualizado correctamente!`)
        })
        .catch(err => console.log(err));
    }

    return (
        <>
        <Card className="my-3 w-25">
                <Card.Img
                    height={500}
                    variant="top"
                    src={book?.imageUrl !== "" ? book?.imageUrl : "https://bit.ly/47NylZk"}
                />
                <Card.Body>
                    <div className="mb-2">
                        {book?.available ?
                            <Badge bg="success">Disponible</Badge>
                            :
                            <Badge bg="danger">Reservado</Badge>
                        }
                    </div>
                    <Card.Title>{book?.title}</Card.Title>
                    <Card.Subtitle>{book?.author}</Card.Subtitle>
                    {ratingStars}
                    <p>{book?.pageCount} páginas</p>
                    <p className="my-3">
                        <b>Sinopsis</b>: {book?.summary}
                    </p>
                    <Row>
                        <Button className="mb-2 me-2" variant="secondary" onClick={handleShowForm}>
                            {showBookForm ? "Ocultar formulario" : "Editar libro"}
                        </Button>
                        <Button className="me-2" onClick={clickHandler}>
                            Volver a la página principal
                        </Button>
                    </Row>
                </Card.Body>
            </Card>
            {showBookForm && <BookForm isEditing book={book} onBookSaved={handleSaveBook}/>}
        </>
        
    );
};


export default BookDetails;