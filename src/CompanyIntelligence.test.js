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

test('renders the launch video with a poster and no autoplay', () => {
  const { container } = render(<CompanyIntelligence />);
  const video = container.querySelector('video');
  expect(video).toBeInTheDocument();
  expect(video).toHaveAttribute('poster', '/company-intelligence-poster.jpg');
  expect(video).toHaveAttribute('controls');
  // The piece is narrated, so it must never start on its own.
  expect(video).not.toHaveAttribute('autoplay');
  expect(video.querySelector('source')).toHaveAttribute('src', '/company-intelligence.mp4');
});
