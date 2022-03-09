import propTypes from 'prop-types';
import noop from '../../../shared/noop';
import { Button } from '../../Buttons/Button/Button';

export function Logout({ handleLogout }) {
  return <Button type='button' title='Logout' onClick={handleLogout} />;
}

Logout.propTypes = {
  handleLogout: propTypes.func,
};

Logout.defaultProps = {
  handleLogout: noop,
};
