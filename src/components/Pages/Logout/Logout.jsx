import propTypes from 'prop-types';
import noop from '../../../shared/noop';
import { Button } from '../../Buttons/Button/Button';

export function Logout({ logoutHandler, userName, role }) {
  return (
    <>
      <span>{`${userName}: ${role}`} </span>
      <Button type='button' title='Logout' onClick={logoutHandler} />
    </>
  );
}

Logout.propTypes = {
  logoutHandler: propTypes.func,
  userName: propTypes.string.isRequired,
  role: propTypes.string.isRequired,
};

Logout.defaultProps = {
  logoutHandler: noop,
};
