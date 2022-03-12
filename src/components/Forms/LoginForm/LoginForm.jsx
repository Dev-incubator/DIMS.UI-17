import React from 'react';
import PropTypes from 'prop-types';
import style from './LoginForm.module.css';

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: { email: '', password: '' },
      emailValid: false,
      passwordValid: false,
      formValid: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.validateField(name, value);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { handleClick } = this.props;
    handleClick(email, password);
  };

  handleFocus = ({ target }) => {
    const { name, value } = target;
    this.validateField(name, value);
  };

  validateField(fieldName, value) {
    const { formErrors } = this.state;
    let { emailValid, passwordValid } = this.state;
    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        formErrors.password = passwordValid ? '' : ' is too short';
        break;
      default:
        break;
    }
    this.setState({ formErrors, emailValid, passwordValid }, this.validateForm);
  }

  validateForm() {
    const { emailValid, passwordValid } = this.state;
    this.setState({ formValid: emailValid && passwordValid });
  }

  render() {
    const { email, password, formErrors, formValid } = this.state;
    const { email: emailErrors, password: passworErrors } = formErrors;
    const { error } = this.props;

    return (
      <>
        <h1 className={style.title}>Sign in to CMS</h1>
        <form action='' className={style.login}>
          <label className={style.login__label} htmlFor='email'>
            Email address
            <input
              className={emailErrors.length ? `${style.error} ${style.login__input}` : style.login__input}
              name='email'
              onChange={this.handleChange}
              onBlur={this.handleFocus}
              value={email}
              type='text'
              id='email'
            />
            <p className={style.errorTitle}>{emailErrors.length ? 'login is invalid' : ''}</p>
          </label>
          <label className={style.login__label} htmlFor='password'>
            Password
            <input
              className={passworErrors.length ? `${style.error} ${style.login__input}` : style.login__input}
              name='password'
              value={password}
              onChange={this.handleChange}
              onBlur={this.handleFocus}
              type='password'
              id='password'
              placeholder='password'
            />
            <p className={style.errorTitle}>{passworErrors.length ? 'password is invalid' : ''}</p>
          </label>
          <p className={style.errorTitle}>{error ? 'User not found' : ''}</p>

          <button disabled={!formValid} onClick={this.handleSubmit} className={style.buttonLogin} type='submit'>
            Sign in
          </button>
        </form>
      </>
    );
  }
}

LoginForm.propTypes = {
  handleClick: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};
