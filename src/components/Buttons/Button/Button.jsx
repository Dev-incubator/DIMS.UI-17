import { Button as BootstrapButton } from 'react-bootstrap';
import PropTypes from 'prop-types';
import noop from '../../../shared/noop';

export function Button({ title, onClick, stylingType, isBackButton, history, ...restProps }) {
  const buttonBackHandler = () => {
    const { goBack } = history;
    goBack();
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
  history: PropTypes.shape({ goBack: PropTypes.func }),
};

Button.defaultProps = {
  onClick: noop,
  stylingType: 'primary',
  isBackButton: false,
  history: {},
};
