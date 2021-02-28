import { render } from '@testing-library/react';
import { UserProvider } from '../helpers/testUser';
import Profile from './Profile';

test('renders without crashing', () => {
  render(
    <UserProvider>
      <Profile />
    </UserProvider>
  );
});

it('matches snapshot', function() {
  const { asFragment } = render(
    <UserProvider>
      <Profile />
    </UserProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
