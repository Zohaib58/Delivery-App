import Form from 'react-bootstrap/Form';
import {Row, Col} from 'react-bootstrap';
import {ActionButton} from '../Buttons/mui-Buttons'

export function FormExample() {
    return (
        <Form>
            <Row>

                <Col className ='Column1'>
                    <Form.Group className="left" controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type = "email" placeholder="Enter email"/>
                        <Form.Text className="text-muted">
                            Your data is safe with us
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col className ='Column2'>
                <Form.Group className="left" controlId="formBasicEmail">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type = "password" placeholder="Enter password"/>
                    </Form.Group>
                </Col>
            </Row>
            <ActionButton buttonName = {"Login"}></ActionButton>
        </Form>
    )
}