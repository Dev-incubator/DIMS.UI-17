import { Button } from '../Button/Button';
import { BUTTONS_NAMES, BUTTONS_TYPES } from '../../../shared/constants';

export function ButtonsTrack() {
  return (
    <>
      <Button title={BUTTONS_NAMES.edit} stylingType={BUTTONS_TYPES.typeEdit} />
      <Button title={BUTTONS_NAMES.delete} stylingType={BUTTONS_TYPES.typeDelete} />
    </>
  );
}
