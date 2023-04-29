import {ActionButton} from '../Buttons/mui-Buttons';
import Card from "react-bootstrap/Card";

export function ExampleCard() {
    return(
        <Card style={{width: '18rem'}}>
            <Card.Img variant="top" src="https://th.bing.com/th/id/R.6365a958596cb9ff17cc4c4de4143d7d?rik=obuFJNmXgLiGRg&riu=http%3a%2f%2f3.bp.blogspot.com%2f-NSL4d0pf2lc%2fT4ah5yIatNI%2fAAAAAAAABbI%2fUQ4fD1sbHcQ%2fs1600%2fastonishing-nature-sight-desktop-wallpapers.jpg&ehk=oNnr0FhSJz5aJAaw57Dkmj%2bNAR7NlG18QW1HwMqIe8M%3d&risl=&pid=ImgRaw&r=0"/>
            <Card.Body>
                <Card.Title>New User?</Card.Title>
                <Card.Text>
                    Welcome to ABC website, who claims to keep your data safe. Please give us your data.
                </Card.Text>
                <ActionButton buttonName={'Sign Up!'}></ActionButton>
            </Card.Body>
        </Card>
    )
}