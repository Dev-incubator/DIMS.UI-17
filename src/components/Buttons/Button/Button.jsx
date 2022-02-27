import PropTypes from 'prop-types';
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
  onClick: () => console.log('Control'),
  title: 'Save',
  stylingType: 'typePrimary',
};
