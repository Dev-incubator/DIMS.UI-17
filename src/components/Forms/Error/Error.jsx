import propTypes from 'prop-types';
import { Button } from '../../Buttons/Button/Button';
import { BUTTONS_NAMES, BUTTONS_TYPES } from '../../../shared/constants';

export function Error({ onClick }) {
  return (
    <div>
      <p>Произошла ошибка. Попробуйте позже</p>
      <Button onClick={onClick} title={BUTTONS_NAMES.ok} stylingType={BUTTONS_TYPES.typePrimary} />
    </div>
  );
}

Error.propTypes = {
  onClick: propTypes.func.isRequired,
};
