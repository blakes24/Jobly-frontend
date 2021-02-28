import { render } from '@testing-library/react';
import { UserProvider } from '../helpers/testUser';
import JobList from './JobList';

test('renders without crashing', () => {
  render(
    <UserProvider>
      <JobList />
    </UserProvider>
  );
});

it('matches snapshot', function() {
  const { asFragment } = render(
    <UserProvider>
      <JobList />
    </UserProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
