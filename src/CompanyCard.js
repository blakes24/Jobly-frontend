import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CompanyCard.css';

const CompanyCard = ({ name, description, logoUrl, handle }) => {
  let url = logoUrl ? logoUrl : '/logos/circle.png';
  const src = require(`.${url}`).default;
  return (
    <Card className="CompanyCard">
      <Link to={`/companies/${handle}`}>
        <Card.Body>
          <div className="CompanyCard-title">
            <Card.Title>{name}</Card.Title>
            <img src={src} alt="logo" height="25px" />
          </div>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default CompanyCard;
