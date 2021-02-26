import { Card, Button } from 'react-bootstrap';
import { useContext } from 'react';
import UserContext from './UserContext';

const JobCard = ({ title, salary, equity, company, id }) => {
  const { user, apply } = useContext(UserContext);
  let applied = user.applications.includes(id);
  return (
    <Card className="JobCard">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {company && <Card.Subtitle className="mb-2">{company}</Card.Subtitle>}
        <Card.Text className="mb-0">Salary: {salary}</Card.Text>
        <Card.Text>Equity: {equity}</Card.Text>
        <Button onClick={() => apply(id)} disabled={applied}>
          Apply
        </Button>
      </Card.Body>
    </Card>
  );
};

export default JobCard;
