import PropTypes from 'prop-types';
import { Button } from '../Buttons/Button/Button';
import style from './PageTitle.module.css';
import noop from '../../shared/noop';

export function PageTitle({ title, buttonTitle, onClick, isBackButton, isContainsButton, stylingType, history }) {
  return (
    <div className={style.title}>
      <h1>{title}</h1>
      {isContainsButton && (
        <Button stylingType={stylingType} isBackButton={isBackButton} onClick={onClick} history={history}>
          {buttonTitle}
        </Button>
      )}
    </div>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string,
  onClick: PropTypes.func,
  isBackButton: PropTypes.bool,
  isContainsButton: PropTypes.bool,
  stylingType: PropTypes.string,
  history: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.number, PropTypes.string]),
};

PageTitle.defaultProps = {
  onClick: noop,
  isBackButton: false,
  buttonTitle: '',
  isContainsButton: true,
  stylingType: 'primary',
  history: null,
};
