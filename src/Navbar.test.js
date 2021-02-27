import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { UserProvider } from './testUser';
import Navbar from './Navbar';

test('renders without crashing', () => {
  render(
    <MemoryRouter>
      <UserProvider>
        <Navbar />
      </UserProvider>
    </MemoryRouter>
  );
});

it('matches snapshot logged in', function() {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Navbar />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('matches snapshot logged out', function() {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider user={null}>
        <Navbar />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
