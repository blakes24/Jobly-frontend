import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import CompanyCard from './CompanyCard';

test('renders without crashing', () => {
  render(
    <MemoryRouter>
      <CompanyCard />
    </MemoryRouter>
  );
});

it('matches snapshot', function() {
  const { asFragment } = render(
    <MemoryRouter>
      <CompanyCard />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
