import { render } from '@testing-library/react';
import SignupForm from './SignupForm';

test('renders without crashing', () => {
  render(<SignupForm />);
});

it('matches snapshot', function() {
  const { asFragment } = render(<SignupForm />);
  expect(asFragment()).toMatchSnapshot();
});
