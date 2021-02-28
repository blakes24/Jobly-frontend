import { render } from '@testing-library/react';
import { UserProvider } from '../helpers/testUser';
import JobCard from './JobCard';

test('renders without crashing', () => {
  render(
    <UserProvider>
      <JobCard />
    </UserProvider>
  );
});

it('matches snapshot', function() {
  const { asFragment } = render(
    <UserProvider>
      <JobCard />
    </UserProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
