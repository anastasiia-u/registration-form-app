import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignInForm from './SignInForm';

test('renders SignInForm component', () => {
  const { getByLabelText, getByText } = render(<SignInForm onSubmit={() => {}} />);
  expect(getByLabelText(/email/i)).toBeInTheDocument();
  expect(getByLabelText(/password/i)).toBeInTheDocument();
  expect(getByText(/sign in/i)).toBeInTheDocument();
});

test('submits the form with email and password', () => {
  const handleSubmit = jest.fn();
  const { getByLabelText, getByText } = render(<SignInForm onSubmit={handleSubmit} />);

  fireEvent.change(getByLabelText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(getByLabelText(/password/i), { target: { value: 'password123' } });
  fireEvent.click(getByText(/sign in/i));

  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123',
  });
});

test('validates email input', () => {
  const { getByLabelText, getByText } = render(<SignInForm onSubmit={() => {}} />);
  const emailInput = getByLabelText(/email/i);
  const submitButton = getByText(/sign in/i);

  fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
  fireEvent.click(submitButton);

  expect(emailInput.checkValidity()).toBe(false);
});

test('validates password input', () => {
  const { getByLabelText, getByText } = render(<SignInForm onSubmit={() => {}} />);
  const passwordInput = getByLabelText(/password/i);
  const submitButton = getByText(/sign in/i);

  fireEvent.change(passwordInput, { target: { value: '' } });
  fireEvent.click(submitButton);

  expect(passwordInput.checkValidity()).toBe(false);
});

test('handles empty form submission', () => {
  const handleSubmit = jest.fn();
  const { getByText } = render(<SignInForm onSubmit={handleSubmit} />);
  const submitButton = getByText(/sign in/i);

  fireEvent.click(submitButton);

  expect(handleSubmit).not.toHaveBeenCalled();
});