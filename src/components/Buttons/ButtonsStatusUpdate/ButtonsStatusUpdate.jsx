import PropTypes from 'prop-types';
import { Button } from '../Button/Button';
import { BUTTONS_NAMES, BUTTONS_TYPES } from '../../../shared/constants';

export function ButtonsStatusUpdate({ id }) {
  console.log(id);
  return (
    <div>
      <Button title={BUTTONS_NAMES.success} type={BUTTONS_TYPES.typeSave} />
      <Button title={BUTTONS_NAMES.fail} type={BUTTONS_TYPES.typeDelete} />
    </div>
  );
}

ButtonsStatusUpdate.propTypes = {
  id: PropTypes.string,
};

ButtonsStatusUpdate.defaultProps = {
  id: '0',
};
