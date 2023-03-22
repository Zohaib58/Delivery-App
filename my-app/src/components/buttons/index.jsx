import { Button } from "react-bootstrap";

export const PrimaryButton = ({ children, ...props }) => {
    return (
        <div className="PrimaryButton">
            <Button variant = "primary">Primary</Button>
            <Button variant = "secondary">Secondary</Button>
        </div>
    );
}

