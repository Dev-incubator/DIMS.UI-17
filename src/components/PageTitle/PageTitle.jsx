import PropTypes from 'prop-types';
import style from './PageTitle.module.css';
import { Button } from '../Buttons/Button/Button';

export function PageTitle({ title, buttonTitle, onClick }) {
  return (
    <div className={style.title}>
      <h1>{title}</h1>
      <Button title={buttonTitle} onClick={onClick} />
    </div>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string,
  buttonTitle: PropTypes.string,
  onClick: PropTypes.func,
};

PageTitle.defaultProps = {
  title: 'Hello',
  buttonTitle: 'default',
  onClick: () => console.log('Control'),
};
