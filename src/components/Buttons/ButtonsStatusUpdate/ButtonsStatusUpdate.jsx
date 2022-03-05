import { Button } from '../Button/Button';
import { BUTTONS_NAMES, BUTTONS_TYPES } from '../../../shared/constants';

export function ButtonsStatusUpdate() {
  return (
    <div>
      <Button title={BUTTONS_NAMES.success} stylingType={BUTTONS_TYPES.typeSave} />
      <Button title={BUTTONS_NAMES.fail} stylingType={BUTTONS_TYPES.typeDelete} />
    </div>
  );
}