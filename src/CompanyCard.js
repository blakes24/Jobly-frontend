import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CompanyCard.css';

const CompanyCard = ({ name, description, logoUrl, handle }) => {
  return (
    <Card className="CompanyCard">
      <Link to={`/companies/${handle}`}>
        <Card.Body>
          <Card.Title>
            {name} <img src={logoUrl} alt="logo" />
          </Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default CompanyCard;
