import { Card } from 'react-bootstrap';

const CompanyCard = ({ company, description, logo }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {company} <img src={logo} />
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CompanyCard;
