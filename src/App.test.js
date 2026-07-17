import { render, screen } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  window.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

test('renders the consulting hero headline', () => {
  render(<App />);
  expect(screen.getByText(/Tell me about your typical day/i)).toBeInTheDocument();
});

test('renders the fit call booking CTA', () => {
  render(<App />);
  expect(screen.getAllByText(/Book a free 15-minute fit call/i).length).toBeGreaterThan(0);
});
