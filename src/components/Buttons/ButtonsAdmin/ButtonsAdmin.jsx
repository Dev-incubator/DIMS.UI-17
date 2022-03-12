import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { removeUserData } from '../../../services/auth-services';
import { Button } from '../Button/Button';
import { BUTTONS_NAMES, BUTTONS_TYPES } from '../../../shared/constants';

export function ButtonsAdminMemberPage({ id }) {
  return (
    <>
      <NavLink to={`/tasks/${id}`}>
        <Button title={BUTTONS_NAMES.tasks} />
      </NavLink>
      <NavLink to={`/progress/${id}`}>
        <Button title={BUTTONS_NAMES.progress} />
      </NavLink>

      <Button title={BUTTONS_NAMES.edit} stylingType={BUTTONS_TYPES.typeEdit} />
      <Button title={BUTTONS_NAMES.delete} stylingType={BUTTONS_TYPES.typeDelete} onClick={() => removeUserData(id)} />
    </>
  );
}

ButtonsAdminMemberPage.propTypes = {
  id: PropTypes.string,
};

ButtonsAdminMemberPage.defaultProps = {
  id: '0',
};
