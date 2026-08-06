import { render, screen, fireEvent } from '@testing-library/react';
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
  // The piece is narrated, so it must never start on its own.
  expect(video).not.toHaveAttribute('autoplay');
  expect(video.querySelector('source')).toHaveAttribute('src', '/company-intelligence.mp4');
});

test('the poster carries a branded play button, and controls appear on play', () => {
  const { container } = render(<CompanyIntelligence />);
  const video = container.querySelector('video');
  // Before the first play the browser control bar stays off the poster.
  expect(video).not.toHaveAttribute('controls');

  const play = screen.getByRole('button', { name: /play the company intelligence video/i });
  expect(play).toBeInTheDocument();

  // jsdom has no media pipeline, so HTMLMediaElement.play is not implemented.
  window.HTMLMediaElement.prototype.play = jest.fn();
  fireEvent.click(play);

  expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
  expect(container.querySelector('video')).toHaveAttribute('controls');
  expect(screen.queryByRole('button', { name: /play the company intelligence video/i })).not.toBeInTheDocument();
});
