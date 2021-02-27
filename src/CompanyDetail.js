import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from './api';
import JobCard from './JobCard';
import './CompanyDetail.css';

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
    <div className="CompanyDetail">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <div className="CompanyDetail-heading">
            <h1>{company.name}</h1>
            <p>{company.description}</p>
          </div>
          <div>
            {company.jobs.map((job) => (
              <JobCard title={job.title} salary={job.salary} equity={job.equity} id={job.id} key={job.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDetail;
