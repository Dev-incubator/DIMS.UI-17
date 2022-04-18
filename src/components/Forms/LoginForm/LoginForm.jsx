import React from 'react';
import { Row, Col } from 'react-bootstrap';
import style from './LoginForm.module.css';
import { Button } from '../../Buttons/Button/Button';
import { regExpEmail } from '../../../shared/regulars';
import { AuthContext } from '../../../Hooks/useAuth';
import { RadioButton } from '../../Common/RadioButton/RadioButton';

export class LoginForm extends React.PureComponent {
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

  setAPIMode = ({ target }) => {
    const { value } = target;
    const { changeAPIModeHandler } = this.context;
    changeAPIModeHandler(value);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { loginHandler } = this.context;
    loginHandler(email, password);
  };

  handleFocus = ({ target }) => {
    const { resetErrorHandler } = this.context;
    const { name, value } = target;
    this.validateField(name, value);
    resetErrorHandler();
  };

  validateField(fieldName, value) {
    const { formErrors } = this.state;
    let { emailValid, passwordValid } = this.state;
    switch (fieldName) {
      case 'email':
        emailValid = value.match(regExpEmail);
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
    const { error, handleSinginWithGoogle, apiMode } = this.context;

    return (
      <Row sm='auto' className={style.wrapper}>
        <Col>
          <h1 className={style.title}>Sign in to CMS</h1>
          <form className={style.login}>
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
            <div className={style.apiMode}>
              <RadioButton onChange={this.setAPIMode} label='restAPI' value='restAPI' apiMode={apiMode} />
              <RadioButton onChange={this.setAPIMode} label='firebase' value='firebase' apiMode={apiMode} />
            </div>
            <button disabled={!formValid} onClick={this.handleSubmit} className={style.buttonLogin} type='submit'>
              Sign in
            </button>
            <Button className={style.buttonLogin} title='Sing In with Google' onClick={handleSinginWithGoogle} />
          </form>
        </Col>
      </Row>
    );
  }
}

LoginForm.contextType = AuthContext;
