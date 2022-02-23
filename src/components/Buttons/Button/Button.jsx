import PropTypes from 'prop-types';
import noop from '../../../shared/noop';
import style from './Button.module.css';

export function Button({ title, onClick, type, ...restProps }) {
  return (
    <button className={style[type]} type='button' onClick={onClick} {...restProps}>
      {title}
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

Button.defaultProps = {
  onClick: noop,
  title: 'Save',
  type: 'typePrimary',
};
