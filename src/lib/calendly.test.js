import { openCalendlyPopup, READY_TIMEOUT_MS } from './calendly';
import { CALENDLY_URL } from '../config/contact';

/* The widget assets are never really fetched here: jsdom does not run
   the injected script, so window.Calendly is set by hand when a test
   needs the popup path. */

const scripts = () => document.querySelectorAll('script[data-calendly-widget="js"]');
const styles = () => document.querySelectorAll('link[data-calendly-widget="css"]');

beforeEach(() => {
  jest.useFakeTimers();
  document.head.innerHTML = '';
  document.body.innerHTML = '';
  delete window.Calendly;
  window.open = jest.fn();
});

afterEach(() => {
  jest.useRealTimers();
  jest.resetAllMocks();
});

test('the first click injects the widget assets and a second click does not repeat them', () => {
  openCalendlyPopup();
  expect(scripts()).toHaveLength(1);
  expect(styles()).toHaveLength(1);
  expect(scripts()[0].src).toBe('https://assets.calendly.com/assets/external/widget.js');
  expect(styles()[0].href).toBe('https://assets.calendly.com/assets/external/widget.css');

  openCalendlyPopup();
  expect(scripts()).toHaveLength(1);
  expect(styles()).toHaveLength(1);
});

test('nothing is injected before a click', () => {
  expect(scripts()).toHaveLength(0);
  expect(styles()).toHaveLength(0);
});

test('the popup opens as an overlay once the widget is available', () => {
  openCalendlyPopup();
  window.Calendly = { initPopupWidget: jest.fn() };
  jest.advanceTimersByTime(200);

  expect(window.Calendly.initPopupWidget).toHaveBeenCalledWith({ url: CALENDLY_URL });
  expect(window.open).not.toHaveBeenCalled();
});

test('a widget that never loads falls back to a new tab', () => {
  openCalendlyPopup();
  jest.advanceTimersByTime(READY_TIMEOUT_MS + 200);

  expect(window.open).toHaveBeenCalledTimes(1);
  expect(window.open).toHaveBeenCalledWith(CALENDLY_URL, '_blank', 'noopener,noreferrer');
});

test('a blocked script falls back without waiting out the timeout', () => {
  openCalendlyPopup();
  scripts()[0].onerror();
  jest.advanceTimersByTime(200);

  expect(window.open).toHaveBeenCalledWith(CALENDLY_URL, '_blank', 'noopener,noreferrer');
});

test('an already loaded widget opens the popup with no further injection', () => {
  window.Calendly = { initPopupWidget: jest.fn() };
  openCalendlyPopup();

  expect(window.Calendly.initPopupWidget).toHaveBeenCalledWith({ url: CALENDLY_URL });
  expect(scripts()).toHaveLength(0);
});
