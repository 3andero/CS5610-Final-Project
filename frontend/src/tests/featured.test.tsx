import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FeaturedView } from 'view/featured';

test('renders featured page title', () => {
  render(<FeaturedView />, {wrapper: BrowserRouter});
  const titleElement = screen.getByRole('heading', {  name: /step into a vast magical world of adventure/i});
  expect(titleElement).toBeInTheDocument();
});