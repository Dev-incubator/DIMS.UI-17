import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from '../Buttons/Button/Button';
import style from './PageTitle.module.css';
import noop from '../../shared/noop';

export function PageTitle({ title, buttonTitle, onClick, isBackButton, popupPath }) {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className={style.title}>
      <h1>{title}</h1>
      <Link to={`${pathname}/${popupPath}`}>
        <Button title={buttonTitle} isBackButton={isBackButton} onClick={onClick} />
      </Link>
    </div>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isBackButton: PropTypes.bool,
  popupPath: PropTypes.string.isRequired,
};

PageTitle.defaultProps = {
  onClick: noop,
  isBackButton: false,
};
