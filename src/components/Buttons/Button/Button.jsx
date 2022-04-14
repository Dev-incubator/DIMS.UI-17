import { Button as BootstrapButton } from 'react-bootstrap';
import PropTypes from 'prop-types';
import style from './Button.module.css';
import noop from '../../../shared/noop';

export function Button({ title, onClick, stylingType, isBackButton, history, buttonType, ...restProps }) {
  const buttonBackHandler = () => {
    const { goBack } = history;
    goBack();
  };

  return (
    <BootstrapButton
      className={style.button}
      variant={stylingType}
      type={buttonType}
      onClick={isBackButton ? buttonBackHandler : onClick}
      {...restProps}
    >
      <span>{title}</span>
    </BootstrapButton>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  stylingType: PropTypes.string,
  isBackButton: PropTypes.bool,
  history: PropTypes.shape({ goBack: PropTypes.func }),
  buttonType: PropTypes.string,
};

Button.defaultProps = {
  onClick: noop,
  stylingType: 'primary',
  isBackButton: false,
  history: {},
  buttonType: 'button',
};
