import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from './api';
import JobCard from './JobCard';

const CompanyDetail = () => {
  const [ company, setCompany ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const { handle } = useParams();

  useEffect(
    () => {
      async function getCompany() {
        const company = await JoblyApi.getCompany(handle);
        setCompany(company);
        setIsLoading(false);
      }
      getCompany();
    },
    [ handle ]
  );

  return (
    <div>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <h1>{company.name}</h1>
          <p>{company.description}</p>
          <div>
            {company.jobs.map((job) => (
              <JobCard title={job.title} salary={job.salary} equity={job.equity} key={job.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDetail;
