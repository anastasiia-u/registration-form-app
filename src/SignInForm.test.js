import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignInForm from './SignInForm';

// Test to check if the form renders correctly
it('renders SignInForm component', () => {
  render(<SignInForm />);
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
});

// Test to check email validation
it('validates email input', () => {
  render(<SignInForm />);
  const emailInput = screen.getByLabelText(/Email/i);
  fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
  expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
  expect(screen.queryByText(/Please enter a valid email address/i)).not.toBeInTheDocument();
});

// Test to check password validation
it('validates password input', () => {
  render(<SignInForm />);
  const passwordInput = screen.getByLabelText(/Password/i);
  fireEvent.change(passwordInput, { target: { value: 'short' } });
  expect(screen.getByText(/Your password must have at least 8 characters/i)).toBeInTheDocument();
  fireEvent.change(passwordInput, { target: { value: 'longenoughpassword' } });
  expect(screen.queryByText(/Your password must have at least 8 characters/i)).not.toBeInTheDocument();
});

// Test to check form submission
it('submits the form with valid data', () => {
  render(<SignInForm />);
  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'longenoughpassword' } });
  const submitButton = screen.getByRole('button', { name: /Sign In/i });
  fireEvent.click(submitButton);
  expect(submitButton).not.toBeDisabled();
});
