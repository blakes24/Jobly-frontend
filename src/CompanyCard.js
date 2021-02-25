import { Card } from 'react-bootstrap';

const CompanyCard = ({ item }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {item.name} <img src={item.logoUrl} alt="logo" />
        </Card.Title>
        <Card.Text>{item.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CompanyCard;
