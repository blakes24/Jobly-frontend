import { Card } from 'react-bootstrap';

const JobCard = ({ title, salary, equity }) => {
  return (
    <Card className="JobCard">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Salary: {salary}</Card.Text>
        <Card.Text>Equity: {equity}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default JobCard;
