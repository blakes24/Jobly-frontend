import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const List = (props) => {
  const [ formData, setFormData ] = useState({ search: '' });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name] : value
    }));
  };

  // Filter list based on search term
  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.filter(formData.search);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} inline>
        <Form.Control
          className="my-2"
          id="search"
          name="search"
          placeholder="Enter search term"
          type="text"
          onChange={handleChange}
        />
        <Button type="submit" className="my-2">
          Submit
        </Button>
      </Form>
      {props.items && props.items.map((item) => <props.card item={item} key={item.handle || item.id} />)}
    </div>
  );
};

export default List;
