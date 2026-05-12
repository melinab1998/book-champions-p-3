import { useRef, useState, useContext } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { errorToast } from "../../../utils/notifications";
import { validateEmail, validatePassword } from "../../../utils/validations.js"
import { loginUser } from "../../library/dashboard/Dashboard.services.js";
import { AuthenticationContext } from "../../services/auth/authContext.jsx"
import AuthContainer from "../authContainer/authContainer.jsx";
import ToggleTheme from "../../services/theme/ToggleTheme.jsx"

const Login = ({ onLogin }) => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const { handleUserLogin } = useContext(AuthenticationContext);

    const [errors, setErrors] = useState({
        email: false,
        password: false
    });

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
        setErrors({ ...errors, email: false });
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
        setErrors({ ...errors, password: false });
    }

    const handleRegisterClick = () => {
        navigate("/register");
    }

    const handleLogin = (event) => {

        event.preventDefault();

        if (!emailRef.current.value.length || !validateEmail(email)) {
            setErrors({ ...errors, email: true });
            errorToast("¡Email incorrecto!")
            emailRef.current.focus();
            return;
        }

        else if (!password.length || !validatePassword(password, 7, null, true, true)) {
            setErrors({ ...errors, password: true });
            errorToast("¡Password incorrecto!")
            passwordRef.current.focus();
            return;
        }

        setErrors({ email: false, password: false })
        loginUser(
            email,
            password,
            token => {
                handleUserLogin(token);
                navigate("/library");
            },
            (err) => {
                errorToast(err.message);
            }
        );
    }

    return (
        <AuthContainer>
            <ToggleTheme/>
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
                <Row className="mt-4">
                    <p className="text-center fw-bold">¿Aún no tenés cuenta?</p>
                    <Button onClick={handleRegisterClick}>Registrarse</Button>
                </Row>
            </Form>
        </AuthContainer>

    );
};


export default Login;