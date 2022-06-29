import { render, screen } from '@testing-library/react';
import ShopPageHero from 'components/shop-page-hero';

test('renders shop title', () => {
  render(<ShopPageHero />);
  const titleElement = screen.getByText(/The Gen2D store for generation 2D./i);
  expect(titleElement).toBeInTheDocument();
});