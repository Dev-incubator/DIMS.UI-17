import PropTypes from 'prop-types';
import { Button } from '../Buttons/Button/Button';
import style from './PageTitle.module.css';
import noop from '../../shared/noop';

export function PageTitle({ title, buttonTitle, onClick, isBackButton }) {
  return (
    <div className={style.title}>
      <h1>{title}</h1>
      <Button title={buttonTitle} isBackButton={isBackButton} onClick={onClick} />
    </div>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isBackButton: PropTypes.bool,
};

PageTitle.defaultProps = {
  onClick: noop,
  isBackButton: false,
};
