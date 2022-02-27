import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Button } from '../Button/Button';
import { BUTTONS_NAMES, BUTTONS_TYPES } from '../../../shared/constants';

export function ButtonsAdmin({ id }) {
  return (
    <>
      <NavLink to={`/tasks/?member=${id}`}>
        <Button title={BUTTONS_NAMES.tasks} />
      </NavLink>
      <NavLink to={`/progress/?member=${id}`}>
        <Button title={BUTTONS_NAMES.progress} />
      </NavLink>

      <Button title={BUTTONS_NAMES.edit} stylingType={BUTTONS_TYPES.typeEdit} />
      <Button title={BUTTONS_NAMES.delete} stylingType={BUTTONS_TYPES.typeDelete} />
    </>
  );
}

ButtonsAdmin.propTypes = {
  id: PropTypes.string,
};

ButtonsAdmin.defaultProps = {
  id: '0',
};
