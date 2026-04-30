import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router";


const BookForm = ({ onBookAdded, onBookSaved, isEditing = false, book }) => {

    const [title, setTitle] = useState(book?.title);
    const [author, setAuthor] = useState(book?.author);
    const [rating, setRating] = useState(book?.rating);
    const [pageCount, setPageCount] = useState(book?.pageCount);
    const [imageUrl, setImageUrl] = useState(book?.imageUrl);
    const [summary, setSummary] = useState(book?.summary);
    const [available, setAvailable] = useState(book?.available);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/library");
    };

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleChangeAuthor = (event) => {
        setAuthor(event.target.value);
    }

    const handleChangeRating = (event) => {
        setRating(event.target.value);
    }
    const handleChangePageCount = (event) => {
        setPageCount(event.target.value);
    }
    const handleChangeImageUrl = (event) => {
        setImageUrl(event.target.value);
    }

    const handleChangeSummary = (event) => {
        setSummary(event.target.value);
    }

    const handleChangeAvailable = (event) => {
        setAvailable(event.target.checked);
    }

    const handleSaveBook = (event) => {

        event.preventDefault();

        const bookData = {
            title,
            author,
            summary,
            rating: parseInt(rating, 10),
            pageCount: parseInt(pageCount, 10),
            imageUrl,
            available
        }

        if(isEditing){
            onBookSaved(bookData)
        }else{
            onBookAdded(bookData);
        }

        setTitle("");
        setAuthor("");
        setRating("");
        setPageCount("");
        setImageUrl("");
        setSummary("");
        setAvailable(false);

    }


    return (
        <Card className="m-4 w-50" bg="success">
            <Card.Body>
                <Form className="text-white" onSubmit={handleSaveBook}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Título</Form.Label>
                                <Form.Control type="text" placeholder="Ingresar título" onChange={handleChangeTitle} value={title} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="author">
                                <Form.Label>Autor</Form.Label>
                                <Form.Control type="text" placeholder="Ingresar autor" onChange={handleChangeAuthor} value={author} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="rating">
                                <Form.Label>Puntuación</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingresar cantidad de estrellas"
                                    max={5}
                                    min={0}
                                    onChange={handleChangeRating}
                                    value={rating}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="pageCount">
                                <Form.Label>Cantidad de páginas</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingresar cantidad de páginas"
                                    min={1}
                                    onChange={handleChangePageCount}
                                    value={pageCount}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3" controlId="summary">
                            <Form.Label>Resumen</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Ingresar resumen"
                                onChange={handleChangeSummary}
                                value={summary}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-between">
                        <Form.Group className="mb-3" controlId="imageUrl">
                            <Form.Label>URL de imagen</Form.Label>
                            <Form.Control type="text" placeholder="Ingresar url de imagen" onChange={handleChangeImageUrl} value={imageUrl}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-end">
                        <Col md={3} className="d-flex flex-column justify-content-end align-items-end">
                            <Form.Check
                                type="switch"
                                id="available"
                                className="mb-3"
                                label="¿Disponible?"
                                onChange={handleChangeAvailable}
                                value={available}
                            />
                            <div className="d-flex justify-content-end gap-2">
                                <Button variant="secondary" onClick={handleBack}>
                                    Volver
                                </Button>
                                <Button variant="primary" type="submit">
                                    {isEditing?"Editar lectura":"Agregar lectura"}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};


export default BookForm;