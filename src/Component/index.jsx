import {Button} from 'react-bootstrap/Button';

export const TestButton  = () => {
    return (
        <div className="Test Button">
        <Button>Test Button</Button>{' '}
        <Button variant="primary">Primary</Button>{' '}
        <Button variant="secondary">Secondary</Button>{' '}
        </div>
    );
}

export const primaryButton  = () => {
    return (
        <div className="PrimaryButton">
        <Button variant="primary">Primary</Button>{' '}
        </div>
    );
}