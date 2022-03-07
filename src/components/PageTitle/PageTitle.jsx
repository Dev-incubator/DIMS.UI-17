import { useHistory, Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './PageTitle.module.css';
import { Button } from '../Buttons/Button/Button';
import { goBack } from '../../shared/helpers';

export function PageTitle({ title, buttonTitle, onClick, isBackButton, popupPath }) {
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className={style.title}>
      <h1>{title}</h1>
      <Link to={`${pathname}/${popupPath}`}>
        <Button title={buttonTitle} onClick={isBackButton ? goBack(history) : onClick} />
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
  onClick: () => console.log('Control button'),
  isBackButton: false,
};
