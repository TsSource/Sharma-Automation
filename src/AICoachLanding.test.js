import { render, screen, fireEvent } from '@testing-library/react';
import AICoachLanding from './AICoachLanding';

const SIGNUP_URL = 'https://coach.sharmaautomation.com/signup';
const LOGIN_URL = 'https://coach.sharmaautomation.com/login';
const APP_STORE_URL = 'https://apps.apple.com/us/app/ai-coach-cloud/id6794181978';
const APP_STORE_LABEL = 'Download AI Coach Cloud on the App Store';
const TRIAL_TERMS = '7-day free trial · $14.99/month after · card required · cancel anytime';
const STATIC_TITLE = 'Sharma Automation | AI Consulting';

beforeAll(() => {
  window.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

/* The mobile menu holds two of the CTAs, so the link audit has to open it.
   The hamburger carries no accessible name, hence the class hook. */
function openMobileMenu(container) {
  const hamburger = container.querySelector('.mobile-nav');
  expect(hamburger).toBeTruthy();
  fireEvent.click(hamburger);
}

/* Routing is deliberately absent here: react-router-dom 7 cannot be resolved by
   this repo's jest 27 runner (its package "main" points at a file that does not
   exist, and jest 27 ignores the "exports" map). Leaving /ai-coach is therefore
   modelled by unmounting the route element, which is exactly what the router
   does on navigation, and it exercises the same effect cleanup. */
test('the tab title is claimed on mount and handed back when the route unmounts', () => {
  document.title = STATIC_TITLE;

  const { unmount } = render(<AICoachLanding />);
  expect(document.title).toBe('AI Coach Cloud | The AI triathlon coach');

  unmount();
  expect(document.title).toBe(STATIC_TITLE);
});

test('two App Store badges link out to the listing in a new tab', () => {
  render(<AICoachLanding />);

  const badges = screen.getAllByRole('link', { name: APP_STORE_LABEL });
  expect(badges).toHaveLength(2);

  badges.forEach((badge) => {
    expect(badge).toHaveAttribute('href', APP_STORE_URL);
    expect(badge).toHaveAttribute('target', '_blank');
    expect(badge).toHaveAttribute('rel', 'noopener noreferrer');
    const art = badge.querySelector('img');
    expect(art).toHaveAttribute('src', '/download-on-the-app-store.svg');
    expect(art).toHaveAttribute('alt', 'Download on the App Store');
  });
});

test('every signup and login CTA points at the hosted app', () => {
  const { container } = render(<AICoachLanding />);
  openMobileMenu(container);

  const links = Array.from(container.querySelectorAll('a'));
  const textOf = (a) => a.textContent.trim();

  const trialLinks = links.filter((a) => /start free trial/i.test(textOf(a)));
  const foundingLinks = links.filter((a) => /claim founding rate/i.test(textOf(a)));
  const signInLinks = links.filter((a) => /sign in/i.test(textOf(a)));

  // Counts are asserted so a dropped or duplicated CTA fails loudly.
  expect(trialLinks).toHaveLength(4);
  expect(foundingLinks).toHaveLength(2);
  expect(signInLinks).toHaveLength(3);

  [...trialLinks, ...foundingLinks].forEach((a) => {
    expect(a).toHaveAttribute('href', SIGNUP_URL);
    expect(a).not.toHaveAttribute('target');
  });
  signInLinks.forEach((a) => {
    expect(a).toHaveAttribute('href', LOGIN_URL);
    expect(a).not.toHaveAttribute('target');
  });
});

test('the hero states the trial terms exactly once', () => {
  render(<AICoachLanding />);
  expect(screen.getAllByText(TRIAL_TERMS)).toHaveLength(1);
});
