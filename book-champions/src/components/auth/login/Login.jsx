import { useContext, useRef, useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { errorToast } from "../../../utils/notifications";
import { validateEmail, validatePassword } from "../../../utils/validations.js"
import { loginUser } from "../../library/dashboard/Dashboard.services.js";
import { AuthenticationContext } from "../../services/auth/authContext.jsx"
import ToggleTheme from "../../services/theme/ToggleTheme"
import AuthContainer from "../authContainer/AuthContainer.jsx";
import useTranslate from "../../hooks/useTranslate/useTranslate.jsx"
import ComboLanguage from "../../ui/ComboLanguage/ComboLanguage.jsx"

const Login = ({ onLogin }) => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [errors, setErrors] = useState({
        email: false,
        password: false
    });

    const { handleUserLogin } = useContext(AuthenticationContext);
    const translate = useTranslate();

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
                handleUserLogin(token)
                navigate("/library");
            },
            (err) => {
                errorToast(err.message);
            }
        );
    }

    return (
        <AuthContainer>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <ComboLanguage />
                <ToggleTheme />
            </div>

            <Form onSubmit={handleLogin}>

                <FormGroup className="mb-4">

                    <Form.Control
                        className={errors.email ? "border border-danger" : ""}
                        type="email"
                        ref={emailRef}
                        placeholder={translate("email")}
                        onChange={handleEmailChange}
                        value={email}
                    />

                    {
                        errors.email &&
                        <p className="text-danger mt-1 mb-0">
                            {translate("email_empty")}
                        </p>
                    }

                </FormGroup>

                <FormGroup className="mb-4">

                    <Form.Control
                        className={errors.password ? "border border-danger" : ""}
                        type="password"
                        ref={passwordRef}
                        placeholder={translate("password")}
                        onChange={handlePasswordChange}
                        value={password}
                    />

                    {
                        errors.password &&
                        <p className="text-danger mt-1 mb-0">
                            {translate("password_empty")}
                        </p>
                    }

                </FormGroup>

                <Row>
                    <Col />

                    <Col md={6} className="d-flex justify-content-end">

                        <Button variant="secondary" type="submit">
                            {translate("login")}
                        </Button>

                    </Col>
                </Row>

                <Row className="mt-4">

                    <p className="text-center fw-bold">
                        {translate("login_no_account")}
                    </p>

                    <Button onClick={handleRegisterClick}>
                        {translate("register")}
                    </Button>

                </Row>

            </Form>

        </AuthContainer>
    );
};


export default Login;