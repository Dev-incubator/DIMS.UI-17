import PropTypes from 'prop-types';
import { Button } from '../Buttons/Button/Button';
import style from './PageTitle.module.css';
import noop from '../../shared/noop';

export function PageTitle({ title, buttonTitle, onClick, isBackButton, isContainsButton, stylingType }) {
  return (
    <div className={style.title}>
      <h1>{title}</h1>
      {isContainsButton && (
        <Button stylingType={stylingType} title={buttonTitle} isBackButton={isBackButton} onClick={onClick} />
      )}
    </div>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isBackButton: PropTypes.bool,
  isContainsButton: PropTypes.bool,
  stylingType: PropTypes.string,
};

PageTitle.defaultProps = {
  onClick: noop,
  isBackButton: false,
  isContainsButton: true,
  stylingType: 'primary',
};
