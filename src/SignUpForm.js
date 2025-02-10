import React, { useState } from 'react';
import './UserAuthForms.css';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [passwordValidations, setPasswordValidations] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    isLongEnough: false,
  });

  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      validatePassword(value);
    } else if (name === 'email') {
      validateEmail(value);
    }
  };

  const validatePassword = (password) => {
    setPasswordValidations({
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      isLongEnough: password.length >= 10,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setIsEmailValid(emailRegex.test(email));
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      isEmailValid &&
      Object.values(passwordValidations).every(Boolean)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log('Form submitted:', formData);
      // Here you would typically handle the form submission, e.g., sending data to a server
    } else {
      console.error('Form is invalid');
    }
  };

  return (
    <form id="mycompany-create-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="company_fname_create">First Name</label>
        <input
          type="text"
          id="company_fname_create"
          className="form-control"
          name="firstName"
          autoComplete="given-name"
          maxLength="50"
          value={formData.firstName}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="company_lname_create">Last Name</label>
        <input
          type="text"
          id="company_lname_create"
          className="form-control"
          name="lastName"
          autoComplete="family-name"
          maxLength="50"
          value={formData.lastName}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="company_email_create">Email</label>
        <input
          type="email"
          id="company_email_create"
          className="form-control"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {!isEmailValid && (
          <div className="email-validation-message invalid">
            Please enter a valid email address
          </div>
        )}
      </div>
      <div className="input-group">
        <label htmlFor="company_pass_create">Password</label>
        <input
          type="password"
          id="company_pass_create"
          className="form-control"
          name="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <div className="password-validation">
          <p>Password must contain the following:</p>
          <ul>
            {/*These labels always present in DOM and change their color 
            from red to green if a password satisfies particular criteria*/}
            <li className={passwordValidations.hasUppercase ? 'green' : 'red'}>
              1 uppercase character
            </li>
            <li className={passwordValidations.hasLowercase ? 'green' : 'red'}>
              1 lowercase character
            </li>
            <li className={passwordValidations.hasNumber ? 'green' : 'red'}>
              1 number
            </li>
            <li className={passwordValidations.isLongEnough ? 'green' : 'red'}>
              Minimum 10 characters
            </li>
          </ul>
        </div>
      </div>
      <div className="space-above-large">
        <button
          id="nextButton"
          className={`next-button btn-new btn-large ${isFormValid() ? '' : 'btn-disabled'}`}
          disabled={!isFormValid()}
          type="submit"
        >
          Create Account
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;