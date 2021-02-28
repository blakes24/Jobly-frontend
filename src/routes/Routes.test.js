import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Routes from './Routes';
import JoblyApi from '../helpers/api';

jest.mock('../helpers/api');
jest.mock('jwt-decode', () => () => testUser);

afterEach(() => {
  jest.resetAllMocks();
});

const token = process.env.REACT_APP_TOKEN;

const testUser = {
  username     : 'testuser',
  firstName    : 'Test',
  lastName     : 'User',
  email        : 'joel@joelburton.com',
  isAdmin      : false,
  applications : []
};

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

it('lets a user log in', async function() {
  JoblyApi.login.mockResolvedValue(token);
  JoblyApi.getUser.mockResolvedValue(testUser);

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

it('displays signup form when nav link is clicked', function() {
  const { getByText, getByLabelText } = render(
    <MemoryRouter initialEntries={[ '/' ]}>
      <Routes />
    </MemoryRouter>
  );
  fireEvent.click(getByText('Sign Up'));

  expect(getByLabelText(`First Name`)).toBeInTheDocument();
});

it('shows jobs page when logged in', async function() {
  JoblyApi.login.mockResolvedValue(token);
  JoblyApi.getUser.mockResolvedValue(testUser);
  JoblyApi.getJobs.mockResolvedValue([]);

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

  expect(getByText('Submit')).toBeInTheDocument();
});

it('shows companies page when logged in', async function() {
  JoblyApi.login.mockResolvedValue(token);
  JoblyApi.getUser.mockResolvedValue(testUser);
  JoblyApi.getCompanies.mockResolvedValue([]);

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

  expect(getByText('Submit')).toBeInTheDocument();
});

it('shows profile page when logged in', async function() {
  JoblyApi.login.mockResolvedValue(token);
  JoblyApi.getUser.mockResolvedValue(testUser);

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

  fireEvent.click(getByText('Profile'));

  expect(getByText('Update Profile')).toBeInTheDocument();
});
