import { Badge, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useState } from "react";
import ConfirmDeleteModal from "../../ui/ConfirmDeleteModal/ConfirmDeleteModal";


const BookItem = ({ id, title, author, rating, pageCount, imageUrl, available, summary, onDelete }) => {

    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`${id}`, {
            state: {
                book: {
                    title,
                    author,
                    rating,
                    pageCount,
                    summary,
                    imageUrl,
                    available
                }
            }
        });
    };

    const handleDelete = () => {
        onDelete();
        setShowModal(false);
    };

    return (
        <>
            <Card style={{ width: "22rem" }} className="mx-3">
                <Card.Img height={400} variant="top" src={imageUrl !== "" ? imageUrl : "https://bit.ly/47Nylzk"} />
                <Card.Body>
                    <div className="mb-2">
                        {available ?
                            <Badge bg="success">Disponible</Badge> :
                            <Badge bg="danger">Reservado</Badge>}
                    </div>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle>{author}</Card.Subtitle>
                    <div>{rating} estrella{rating > 1 ? 's' : ''}</div>
                    <p>{pageCount} páginas</p>
                    <div className="d-flex gap-2">
                        <Button onClick={handleClick}>
                            Ver detalles
                        </Button>

                        <Button variant="danger" onClick={() => setShowModal(true)}>
                            Eliminar
                        </Button>
                    </div>
                </Card.Body>
            </Card>
            <ConfirmDeleteModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onConfirm={handleDelete}
                bookTitle={title}
            />
        </>
    )
}

export default BookItem