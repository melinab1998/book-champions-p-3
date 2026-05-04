import { Modal, Button } from "react-bootstrap";

const ConfirmDeleteModal = ({ show, onHide, onConfirm, bookTitle }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar libro</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                ¿Seguro que querés eliminar <strong>{bookTitle}</strong>?
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmDeleteModal;