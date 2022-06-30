import { render, screen } from '@testing-library/react';
import { CartTitle } from 'components/cart-title';

test('renders cart title', () => {
  render(<CartTitle />);
  // screen.debug();
  const titleElement = screen.getByText('Shopping Cart');
  expect(titleElement).toBeInTheDocument();
});
