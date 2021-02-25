import { Card } from 'react-bootstrap';

const JobCard = ({ title, salary, equity, company }) => {
  return (
    <Card className="JobCard">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {company && <Card.Subtitle className="mb-2">{company}</Card.Subtitle>}
        <Card.Text className="mb-0">Salary: {salary}</Card.Text>
        <Card.Text>Equity: {equity}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default JobCard;
