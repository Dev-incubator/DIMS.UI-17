import PropTypes from 'prop-types';
import style from './Button.module.css';
import noop from '../../../shared/noop';

export function Button({ title, onClick, stylingType, isBackButton, history, buttonType, disabled, ...restProps }) {
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
      <span>{title}</span>
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  stylingType: PropTypes.string,
  isBackButton: PropTypes.bool,
  history: PropTypes.shape({ goBack: PropTypes.func }),
  buttonType: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onClick: noop,
  stylingType: 'primary',
  isBackButton: false,
  history: {},
  buttonType: 'button',
  disabled: false,
};
