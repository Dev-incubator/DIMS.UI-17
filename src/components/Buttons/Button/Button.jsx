import { Button as BootstrapButton } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import noop from '../../../shared/noop';
// import style from './Button.module.css';

export function Button({ title, onClick, stylingType, isBackButton, ...restProps }) {
  const history = useHistory();
  const buttonBackHandler = () => {
    history.goBack();
  };

  return (
    <BootstrapButton
      variant={stylingType}
      type='button'
      onClick={isBackButton ? buttonBackHandler : onClick}
      {...restProps}
    >
      <span>{title}</span>
    </BootstrapButton>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  stylingType: PropTypes.string,
  isBackButton: PropTypes.bool,
};

Button.defaultProps = {
  onClick: noop,
  stylingType: 'primary',
  isBackButton: false,
};
