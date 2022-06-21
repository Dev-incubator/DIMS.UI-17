import PropTypes from 'prop-types';
import { Button } from '../Button/Button';
import { BUTTONS_NAMES, BUTTONS_TYPES, STATUS_KEYS } from '../../../shared/constants';
// import style from './ButtonsStatusUpdate.module.css';

export function ButtonsStatusUpdate({ status, succesStatusHandler, activeStatusHandler, failStatusHandler }) {
  return (
    <div>
      {status === STATUS_KEYS.active ? (
        <Button stylingType={BUTTONS_TYPES.typeSave} onClick={succesStatusHandler}>
          {BUTTONS_NAMES.success}
        </Button>
      ) : (
        <Button stylingType={BUTTONS_TYPES.typePrimary} onClick={activeStatusHandler}>
          {BUTTONS_NAMES.active}
        </Button>
      )}

      <Button stylingType={BUTTONS_TYPES.typeDelete} onClick={failStatusHandler} disabled={status === STATUS_KEYS.fail}>
        {BUTTONS_NAMES.fail}
      </Button>
    </div>
  );
}

ButtonsStatusUpdate.propTypes = {
  status: PropTypes.string.isRequired,
  succesStatusHandler: PropTypes.func.isRequired,
  activeStatusHandler: PropTypes.func.isRequired,
  failStatusHandler: PropTypes.func.isRequired,
};
