import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import noop from '../../../shared/noop';
import style from './Button.module.css';

export function Button({ title, onClick, stylingType, isBackButton, ...restProps }) {
  const history = useHistory();

  return (
    <button
      className={style[stylingType]}
      type='button'
      onClick={isBackButton ? () => history.goBack() : onClick}
      {...restProps}
    >
      <span>{title}</span>
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.node,
  onClick: PropTypes.func,
  stylingType: PropTypes.string,
  isBackButton: PropTypes.bool,
};

Button.defaultProps = {
  onClick: noop,
  title: 'Save',
  stylingType: 'typePrimary',
  isBackButton: false,
};
