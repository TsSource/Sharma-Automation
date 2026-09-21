import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from './ContactForm';
import { FORMSPREE_ENDPOINT } from './config/contact';

/* No test here may touch the network: fetch is always mocked. */

const fill = () => {
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: '  Dana Reed  ' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'dana@example.com' } });
  fireEvent.change(screen.getByLabelText('How can I help?'), { target: { value: 'Quoting a build.' } });
};

/* Found by tag, not by button label: the label changes to "Sending..."
   the moment the first submit is in flight. */
const submit = () => fireEvent.submit(document.querySelector('form'));

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) }));
});

afterEach(() => {
  jest.resetAllMocks();
  delete window.gtag;
});

test('renders every field with a visible label tied to its input', () => {
  render(<ContactForm />);
  ['Name', 'Email', 'Phone (optional)', 'Business name (optional)', 'How can I help?'].forEach((label) => {
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });
  expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
  expect(screen.getByLabelText('Phone (optional)')).toHaveAttribute('type', 'tel');
  expect(screen.getByLabelText('Name')).toBeRequired();
  expect(screen.getByLabelText('How can I help?')).toBeRequired();
});

test('an empty submit is blocked and never reaches the network', async () => {
  render(<ContactForm />);
  submit();
  await screen.findByText(/please fill in your name/i);
  expect(global.fetch).not.toHaveBeenCalled();
});

test('a filled honeypot shows success and sends nothing', async () => {
  const { container } = render(<ContactForm />);
  fill();
  fireEvent.change(container.querySelector('input[name="_gotcha"]'), { target: { value: 'http://spam.example' } });
  submit();
  await screen.findByText(/your message is on its way/i);
  expect(global.fetch).not.toHaveBeenCalled();
});

test('a successful send posts JSON to Formspree once and shows the confirmation', async () => {
  window.gtag = jest.fn();
  render(<ContactForm />);
  fill();
  submit();

  await screen.findByText(/your message is on its way/i);
  expect(global.fetch).toHaveBeenCalledTimes(1);

  const [url, opts] = global.fetch.mock.calls[0];
  expect(url).toBe(FORMSPREE_ENDPOINT);
  expect(opts.method).toBe('POST');
  expect(opts.headers.Accept).toBe('application/json');
  expect(opts.headers['Content-Type']).toBe('application/json');

  const body = JSON.parse(opts.body);
  expect(body.name).toBe('Dana Reed'); // trimmed
  expect(body.email).toBe('dana@example.com');
  expect(body.message).toBe('Quoting a build.');
  expect(body._subject).toBe('New website enquiry: sharmaautomation.com');

  expect(window.gtag).toHaveBeenCalledWith('event', 'generate_lead', { method: 'contact_form' });
  expect(screen.getByRole('button', { name: /book a fit call/i })).toBeInTheDocument();
});

test('a failed send keeps what the visitor typed and offers email instead', async () => {
  global.fetch = jest.fn(() => Promise.reject(new Error('offline')));
  render(<ContactForm />);
  fill();
  submit();

  await screen.findByText(/did not go through/i);
  expect(screen.getByLabelText('Name')).toHaveValue('  Dana Reed  ');
  expect(screen.getByLabelText('How can I help?')).toHaveValue('Quoting a build.');
  expect(screen.getByRole('link', { name: /sharma@sharmaautomation\.com/i }))
    .toHaveAttribute('href', 'mailto:Sharma@SharmaAutomation.com');
});

test('a double submit still sends exactly one request', async () => {
  let release;
  global.fetch = jest.fn(() => new Promise((resolve) => { release = () => resolve({ ok: true }); }));
  render(<ContactForm />);
  fill();
  submit();
  submit();

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();

  release();
  await waitFor(() => expect(screen.getByText(/your message is on its way/i)).toBeInTheDocument());
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
