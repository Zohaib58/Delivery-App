import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const BasicExample = () => {
    const handleClick = () => {
        // do something when the button is clicked
        window.location.href = 'https://th.bing.com/th/id/R.6af6fd9c37f0de4abb34ea0fd20acce3?rik=55mqMmrTutVR0Q&pid=ImgRaw&r=0';
      };
    return (
    
    <div class = "d-flex align-items-center justify-content-center ">
        <Card style={{ width: '18rem' }}>
        
        <Card.Img variant="top" src="https://th.bing.com/th/id/R.6af6fd9c37f0de4abb34ea0fd20acce3?rik=55mqMmrTutVR0Q&pid=ImgRaw&r=0" />
        <Card.Body>
          <Card.Title>Scenery</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary" onClick={handleClick}>See the picture!</Button>
        </Card.Body>
      </Card>
    </div>
    
  );
}