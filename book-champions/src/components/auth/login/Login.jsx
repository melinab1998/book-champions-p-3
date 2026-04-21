import { useRef, useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

const Login = ({onLogin}) => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [errors, setErrors] = useState({
    email: false, 
    password: false});

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
        setErrors({...errors, email: false});
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
        setErrors({...errors, password: false});
    }

/*     const handleSubmit = (event) => {
        event.preventDefault();
        alert(`El email ingresado es: ${email} y el password es ${password}`)
    } */

    const handleLogin = (event) => {

        event.preventDefault();

        if (!emailRef.current.value.length){
            setErrors({...errors, email: true});
            alert("Email vacío");
            emailRef.current.focus();
            return;
        }

        else if(!password.length || password.length < 7){
            setErrors({...errors, password: true});
            alert("Password vacío");
            passwordRef.current.focus();
            return;
        }

        setErrors({email: false, password: false})
        alert(`El email ingresado es ${email} y el password es ${password}`);
        onLogin();
        navigate("/library");
    }

    return (
        <Card className="mt-5 mx-3 p-3 px-5 shadow">
            <Card.Body>
                <Row className="mb-2">
                    <h5>¡Bienvenidos a Books Champion!</h5>
                </Row>
                <Form onSubmit={handleLogin}>
                    <FormGroup className="mb-4">
                        <Form.Control
                            className={errors.email && "border border-danger"}
                            type="email"
                            ref={emailRef}
                            placeholder="Ingresar email"
                            onChange={handleEmailChange}
                            value={email} />
                    </FormGroup>
                    <FormGroup className="mb-4">
                        <Form.Control
                            className={errors.password && "border border-danger"}
                            type="password"
                            ref={passwordRef}
                            placeholder="Ingresar contraseña"
                            onChange={handlePasswordChange}
                            value={password}
                        />
                    </FormGroup>
                    <Row>
                        <Col />
                        <Col md={6} className="d-flex justify-content-end">
                            <Button variant="secondary" type="submit">
                                Iniciar sesión
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};


export default Login;