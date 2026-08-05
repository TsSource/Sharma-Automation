import { render, screen } from '@testing-library/react';
import CompanyIntelligence from './CompanyIntelligence';

beforeAll(() => {
  window.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

test('renders the Company Intelligence hero headline', () => {
  render(<CompanyIntelligence />);
  expect(screen.getByText(/Your entire business, one question away\./i)).toBeInTheDocument();
});

test('renders the Intelligence Audit booking CTA', () => {
  render(<CompanyIntelligence />);
  expect(screen.getAllByText(/Book your free Intelligence Audit/i).length).toBeGreaterThan(0);
});
