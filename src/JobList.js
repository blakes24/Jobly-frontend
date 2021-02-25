import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import JoblyApi from './api';
import JobCard from './JobCard';

const JobList = () => {
  const [ list, setList ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ formData, setFormData ] = useState({ search: '' });

  // get jobs when page loads and add to state
  useEffect(() => {
    async function getList() {
      const list = await JoblyApi.getJobs();
      setList(list);
      setIsLoading(false);
    }
    getList();
  }, []);

  async function filter(params) {
    const list = await JoblyApi.getJobs(params);
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
    filter(formData.search);
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
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        list.map((job) => (
          <JobCard company={job.companyName} title={job.title} salary={job.salary} equity={job.equity} key={job.id} />
        ))
      )}
    </div>
  );
};

export default JobList;
