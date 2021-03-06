import { useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import JoblyApi from '../helpers/api';
import CompanyCard from './CompanyCard';
import './CompanyList.css';

const CompanyList = () => {
  const [ list, setList ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ formData, setFormData ] = useState({ search: '' });

  // get companies when page loads and add to state
  useEffect(() => {
    async function getList() {
      const list = await JoblyApi.getCompanies();
      setList(list);
      setIsLoading(false);
    }
    getList();
  }, []);

  async function filter(params) {
    const list = await JoblyApi.getCompanies(params);
    setList(list);
  }

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
    // if search is empty reset and get all companies
    if (formData.search.trim().length < 1) {
      setFormData((formData) => ({
        ...formData,
        search : ''
      }));
      filter();
    } else {
      filter(formData.search);
    }
  };

  return (
    <div className="CompanyList">
      <Form onSubmit={handleSubmit}>
        <Form.Control
          className="my-2"
          id="search"
          name="search"
          placeholder="Enter search term"
          type="text"
          value={formData.search}
          onChange={handleChange}
        />
        <Button type="submit" className="my-2">
          Submit
        </Button>
      </Form>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : list.length ? (
        list.map((company) => (
          <CompanyCard
            name={company.name}
            description={company.description}
            logoUrl={company.logoUrl}
            handle={company.handle}
            key={company.handle}
          />
        ))
      ) : (
        <p>No results found</p>
      )}
      {list.length > 0 && <a href="http://www.uilogos.co">Logos Downloaded from uiLogos.co</a>}
    </div>
  );
};

export default CompanyList;
