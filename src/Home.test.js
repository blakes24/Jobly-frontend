import { render } from '@testing-library/react';
import { UserProvider } from './testUser';
import Home from './Home';

test('renders without crashing', () => {
  render(
    <UserProvider>
      <Home />
    </UserProvider>
  );
});

it('matches snapshot logged out', function() {
  const { asFragment } = render(
    <UserProvider user={null}>
      <Home />
    </UserProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('matches snapshot logged in', function() {
  const { asFragment } = render(
    <UserProvider>
      <Home />
    </UserProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
