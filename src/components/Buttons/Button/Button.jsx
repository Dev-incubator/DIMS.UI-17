import PropTypes from 'prop-types';
// import { Link, useLocation } from 'react-router-dom';
import style from './Button.module.css';

export function Button({ title, onClick, stylingType, ...restProps }) {
  // const location = useLocation();
  // const { pathname } = location;

  return (
    // <Link to={`${pathname}/${popupPath}`}>
    <button className={style[stylingType]} type='button' onClick={onClick} {...restProps}>
      <span>{title}</span>
    </button>
    // </Link>
  );
}

Button.propTypes = {
  title: PropTypes.node,
  onClick: PropTypes.func,
  stylingType: PropTypes.string,
  // popupPath: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => console.log('Control'),
  title: 'Save',
  stylingType: 'typePrimary',
  // popupPath: 'popup',
};
