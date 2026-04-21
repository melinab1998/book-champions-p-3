import { Form } from "react-bootstrap";

const BookSearch = ({ onSearch }) => {

    const handleChange = (event) => {
        onSearch(event.target.value);
    }

    return (
        <Form.Group className="mb-3" controlId="searchBook">
            <Form.Control type="text" placeholder="Buscar libro..." onChange={handleChange} />
        </Form.Group>)
}

export default BookSearch