import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router';
import CompanyDetail from './CompanyDetail';

test('renders without crashing', () => {
  render(
    <MemoryRouter initialEntries={[ '/company/fake' ]}>
      <Route path="/company/:handle">
        <CompanyDetail />
      </Route>
    </MemoryRouter>
  );
});

it('matches snapshot', function() {
  const { asFragment } = render(
    <MemoryRouter initialEntries={[ '/company/fake' ]}>
      <Route path="/company/:handle">
        <CompanyDetail />
      </Route>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
