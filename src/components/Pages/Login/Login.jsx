import React from 'react';
import style from './Login.module.css';

export class Login extends React.Component {
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

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);
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

    return (
      <>
        <h1 className={style.title}>Sign in to CMS</h1>
        <form action='' className={style.login}>
          <label htmlFor='email'>
            Email address
            <input
              className={emailErrors.length ? style.error : ''}
              name='email'
              onChange={this.handleInput}
              onBlur={this.handleFocus}
              value={email}
              type='text'
              id='email'
            />
            <p>{emailErrors.length ? 'login is invalid' : ''}</p>
          </label>
          <label htmlFor='password'>
            Password
            <input
              className={passworErrors.length ? style.error : ''}
              name='password'
              value={password}
              onChange={this.handleInput}
              onBlur={this.handleFocus}
              type='password'
              id='password'
              placeholder='password'
            />
            <p>{passworErrors.length ? 'password is invalid' : ''}</p>
          </label>
          <button disabled={!formValid} onClick={this.handleSubmit} className={style.buttonLogin} type='submit'>
            Sign in
          </button>
        </form>
      </>
    );
  }
}
