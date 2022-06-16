import PropTypes from 'prop-types';
import style from './Button.module.css';
import noop from '../../../shared/noop';

export function Button({ onClick, stylingType, isBackButton, history, buttonType, disabled, children, ...restProps }) {
  const buttonBackHandler = () => {
    const { goBack } = history;
    goBack();
  };

  return (
    <button
      className={disabled ? `${style[stylingType]} ${style.disable}` : style[stylingType]}
      type='button'
      onClick={isBackButton ? buttonBackHandler : onClick}
      disabled={disabled}
      {...restProps}
    >
      <span>{children}</span>
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  stylingType: PropTypes.string,
  isBackButton: PropTypes.bool,
  history: PropTypes.shape({ goBack: PropTypes.func }),
  buttonType: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

Button.defaultProps = {
  onClick: noop,
  stylingType: 'primary',
  isBackButton: false,
  history: {},
  buttonType: 'button',
  disabled: false,
};
