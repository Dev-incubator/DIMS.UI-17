import PropTypes from 'prop-types';
import noop from '../../../shared/noop';
import style from './Button.module.css';

export function Button({ title, onClick, stylingType, ...restProps }) {
  return (
    <button className={style[stylingType]} type='button' onClick={onClick} {...restProps}>
      {title}
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.node,
  onClick: PropTypes.func,
  stylingType: PropTypes.string,
};

Button.defaultProps = {
  onClick: noop,
  title: 'Save',
  stylingType: 'typePrimary',
};
