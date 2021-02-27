import { render } from '@testing-library/react';
import LoginForm from './LoginForm';

test('renders without crashing', () => {
  render(<LoginForm />);
});

it('matches snapshot', function() {
  const { asFragment } = render(<LoginForm />);
  expect(asFragment()).toMatchSnapshot();
});
