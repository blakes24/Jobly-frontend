import { render, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Routes from './Routes';
import JoblyApi from '../helpers/api';

jest.mock('../helpers/api');
jest.mock('jwt-decode', () => () => testUser);

const token = process.env.REACT_APP_TOKEN;

const testUser = {
  username     : 'testuser',
  firstName    : 'Test',
  lastName     : 'User',
  email        : 'joel@joelburton.com',
  isAdmin      : false,
  applications : []
};

const testJob = {
  id            : 7,
  title         : 'Technical brewer',
  salary        : 157000,
  equity        : '0',
  companyHandle : 'anderson-arias-morrow'
};

const testCompany = {
  handle       : 'anderson-arias-morrow',
  name         : 'Anderson, Arias and Morrow',
  description  :
    'Somebody program how I. Face give away discussion view act inside. Your official relationship administration here.',
  numEmployees : 245,
  logoUrl      : '/logos/logo3.png'
};

beforeEach(() => {
  JoblyApi.login.mockResolvedValue(token);
  JoblyApi.getUser.mockResolvedValue(testUser);
  JoblyApi.getJobs.mockResolvedValue([ testJob ]);
  JoblyApi.applyToJob.mockResolvedValue(testJob.id);
  JoblyApi.getCompanies.mockResolvedValue([ testCompany ]);
  JoblyApi.getCompany.mockResolvedValue({ ...testCompany, jobs: [ testJob ] });
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('logged out views', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Routes />
      </MemoryRouter>
    );
  });

  it('matches snapshot', function() {
    const { asFragment } = render(
      <MemoryRouter>
        <Routes />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays homepage', function() {
    const { getByText } = render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <Routes />
      </MemoryRouter>
    );
    expect(getByText(`The best place to find your next job.`)).toBeInTheDocument();
  });

  it('redirects protected route to home if user is not logged in', function() {
    const { getByText } = render(
      <MemoryRouter initialEntries={[ '/jobs' ]}>
        <Routes />
      </MemoryRouter>
    );
    expect(getByText(`The best place to find your next job.`)).toBeInTheDocument();
  });

  it('displays signup form when nav link is clicked', function() {
    const { getByText, getByLabelText } = render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <Routes />
      </MemoryRouter>
    );
    fireEvent.click(getByText('Sign Up'));

    expect(getByLabelText(`First Name`)).toBeInTheDocument();
  });
});

describe('logged in views', () => {
  it('lets a user log in', async function() {
    const { getByText, getByLabelText, findByText, getByRole } = render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <Routes />
      </MemoryRouter>
    );

    fireEvent.click(getByText('Log In'));

    expect(getByLabelText(`Username`)).toBeInTheDocument();

    fireEvent.input(getByLabelText('Username'), {
      target : { value: 'testuser' }
    });

    fireEvent.input(getByLabelText('Password'), {
      target : { value: 'password' }
    });

    fireEvent.submit(getByRole('button', { name: 'Log In' }));

    expect(await findByText('Welcome back testuser!')).toBeInTheDocument();
  });

  it('lets user apply to jobs when logged in', async function() {
    const { getByText, getByLabelText, findByText, getByRole } = render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <Routes />
      </MemoryRouter>
    );
    fireEvent.click(getByText('Log In'));

    expect(getByLabelText(`Username`)).toBeInTheDocument();

    fireEvent.input(getByLabelText('Username'), {
      target : { value: 'testuser' }
    });

    fireEvent.input(getByLabelText('Password'), {
      target : { value: 'password' }
    });

    fireEvent.submit(getByRole('button', { name: 'Log In' }));

    expect(await findByText('Welcome back testuser!')).toBeInTheDocument();

    fireEvent.click(getByText('Jobs'));

    expect(getByText('Loading...')).toBeInTheDocument();
    expect(await findByText('Technical brewer')).toBeInTheDocument();

    fireEvent.click(await findByText('Apply'));

    expect(await findByText('Applied')).toBeInTheDocument();
  });

  it('shows companies pages when logged in', async function() {
    const { getByText, getByLabelText, findByText, getByRole } = render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <Routes />
      </MemoryRouter>
    );
    fireEvent.click(getByText('Log In'));

    expect(getByLabelText(`Username`)).toBeInTheDocument();

    fireEvent.input(getByLabelText('Username'), {
      target : { value: 'testuser' }
    });
    fireEvent.input(getByLabelText('Password'), {
      target : { value: 'password' }
    });
    fireEvent.submit(getByRole('button', { name: 'Log In' }));

    expect(await findByText('Welcome back testuser!')).toBeInTheDocument();

    fireEvent.click(getByText('Companies'));

    expect(getByText('Loading...')).toBeInTheDocument();
    let company = await findByText('Anderson, Arias and Morrow');
    expect(company).toBeInTheDocument();

    fireEvent.click(company);
    expect(await findByText('Technical brewer')).toBeInTheDocument();
  });

  it('shows profile page when logged in', async function() {
    const { getByText, getByLabelText, findByText, getByRole } = render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <Routes />
      </MemoryRouter>
    );
    fireEvent.click(getByText('Log In'));

    expect(getByLabelText(`Username`)).toBeInTheDocument();

    fireEvent.input(getByLabelText('Username'), {
      target : { value: 'testuser' }
    });
    fireEvent.input(getByLabelText('Password'), {
      target : { value: 'password' }
    });
    fireEvent.submit(getByRole('button', { name: 'Log In' }));

    expect(await findByText('Welcome back testuser!')).toBeInTheDocument();

    fireEvent.click(getByText('testuser'));

    expect(getByText('Update Profile')).toBeInTheDocument();
  });

  it('lets a user log out', async function() {
    const { getByText, getByLabelText, findByText, getByRole, queryByText } = render(
      <MemoryRouter initialEntries={[ '/' ]}>
        <Routes />
      </MemoryRouter>
    );
    fireEvent.click(getByText('Log In'));

    expect(getByLabelText(`Username`)).toBeInTheDocument();

    fireEvent.input(getByLabelText('Username'), {
      target : { value: 'testuser' }
    });
    fireEvent.input(getByLabelText('Password'), {
      target : { value: 'password' }
    });
    fireEvent.submit(getByRole('button', { name: 'Log In' }));

    expect(await findByText('Welcome back testuser!')).toBeInTheDocument();

    fireEvent.click(getByText('Log out'));

    expect(queryByText('Welcome back testuser!')).not.toBeInTheDocument();
    expect(getByText(`Log In`)).toBeInTheDocument();
  });
});
