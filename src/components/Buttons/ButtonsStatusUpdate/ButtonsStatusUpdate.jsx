import PropTypes from 'prop-types';
import { Button } from '../Button/Button';
import { BUTTONS_NAMES, BUTTONS_TYPES, STATUS_KEYS } from '../../../shared/constants';

export function ButtonsStatusUpdate({ status, succesStatusHandler, activeStatusHandler, failStatusHandler }) {
  return (
    <>
      {status === STATUS_KEYS.active ? (
        <Button title={BUTTONS_NAMES.success} stylingType={BUTTONS_TYPES.typeSave} onClick={succesStatusHandler} />
      ) : (
        <Button title={BUTTONS_NAMES.active} stylingType={BUTTONS_TYPES.typePrimary} onClick={activeStatusHandler} />
      )}

      <Button title={BUTTONS_NAMES.fail} stylingType={BUTTONS_TYPES.typeDelete} onClick={failStatusHandler} />
    </>
  );
}

ButtonsStatusUpdate.propTypes = {
  status: PropTypes.string.isRequired,
  succesStatusHandler: PropTypes.func.isRequired,
  activeStatusHandler: PropTypes.func.isRequired,
  failStatusHandler: PropTypes.func.isRequired,
};
