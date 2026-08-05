import { render, screen, fireEvent } from '@testing-library/react';
import App, { NAV_LINKS, isRouteTarget } from './App';

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

test('renders the Company Intelligence teaser heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Company Intelligence' })).toBeInTheDocument();
});

test('nav links are [label, target] tuples, split into routes and section ids', () => {
  expect(NAV_LINKS).toContainEqual(['Company Intelligence', '/company-intelligence']);
  NAV_LINKS.forEach(([label, target]) => {
    expect(typeof label).toBe('string');
    expect(typeof target).toBe('string');
  });
  expect(isRouteTarget('/company-intelligence')).toBe(true);
  expect(isRouteTarget('how-it-works')).toBe(false);
});

test('a section nav item scrolls rather than navigating', () => {
  const scrollIntoView = jest.fn();
  window.HTMLElement.prototype.scrollIntoView = scrollIntoView;
  render(<App />);
  fireEvent.click(screen.getAllByText('Examples')[0]);
  expect(scrollIntoView).toHaveBeenCalled();
});
