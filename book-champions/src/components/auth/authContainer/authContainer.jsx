import { Card, Container } from "react-bootstrap";
import useTranslate from "../../hooks/useTranslate/useTranslate"

const AuthContainer = ({ children }) => {

    const translate = useTranslate();
    return (
        <div className="auth-container">
            <Container>
                <Card className="p-4 shadow">
                    <Card.Body>
                        <h3 className="text-center mb-4">
                            {translate("welcome")}
                        </h3>
                        {children}
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default AuthContainer;