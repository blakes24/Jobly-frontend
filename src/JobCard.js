import { Card, Button } from 'react-bootstrap';
import { useContext } from 'react';
import UserContext from './UserContext';
import './JobCard.css';

const JobCard = ({ title, salary, equity, company, id }) => {
  const { user, apply } = useContext(UserContext);
  let applied = user.applications.includes(id);
  return (
    <Card className="JobCard">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {company && <Card.Subtitle className="mb-2">{company}</Card.Subtitle>}
        <div className="JobCard-apply">
          <div className="JobCard-info">
            <Card.Text className="mb-0">Salary: {salary}</Card.Text>
            <Card.Text>Equity: {equity}</Card.Text>
          </div>
          <Button onClick={() => apply(id)} disabled={applied}>
            {applied ? 'Applied' : 'Apply'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default JobCard;
