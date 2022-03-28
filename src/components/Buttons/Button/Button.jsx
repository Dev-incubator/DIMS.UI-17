import PropTypes from 'prop-types';
import noop from '../../../shared/noop';
import style from './Button.module.css';

export function Button({ title, onClick, stylingType, isBackButton, history, ...restProps }) {
  const buttonBackHandler = () => {
    const { goBack } = history;
    goBack();
  };

  return (
    <button
      className={style[stylingType]}
      type='button'
      onClick={isBackButton ? buttonBackHandler : onClick}
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
};

Button.defaultProps = {
  onClick: noop,
  stylingType: 'typePrimary',
  isBackButton: false,
  history: {},
};
