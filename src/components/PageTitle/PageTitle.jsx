import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './PageTitle.module.css';
import { Button } from '../Buttons/Button/Button';
import { goBack } from '../../shared/helpers';

export function PageTitle({ title, buttonTitle, onClick, isBackButton }) {
  const history = useHistory();

  return (
    <div className={style.title}>
      <h1>{title}</h1>

      <Button title={buttonTitle} onClick={isBackButton ? goBack(history) : onClick} />
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
  onClick: () => console.log('Control button'),
  isBackButton: false,
};
