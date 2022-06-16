import PropTypes from 'prop-types';
import { BUTTONS_NAMES, BUTTONS_TYPES } from '../../../shared/constants';
import { Button } from '../../Buttons/Button/Button';
import style from './DeleteForm.module.css';

export function DeleteForm({ deleteHandler, toggleModalHandler, item }) {
  return (
    <div className={style.wrapper}>
      <h3>Are you sure you want to delete the current {item} ?</h3>
      <div className={style.buttons}>
        <Button stylingType={BUTTONS_TYPES.typeDelete} onClick={deleteHandler}>
          {BUTTONS_NAMES.delete}
        </Button>
        <Button stylingType={BUTTONS_TYPES.typeSecondary} onClick={toggleModalHandler}>
          {BUTTONS_NAMES.backToList}
        </Button>
      </div>
    </div>
  );
}

DeleteForm.propTypes = {
  deleteHandler: PropTypes.func.isRequired,
  toggleModalHandler: PropTypes.func.isRequired,
  item: PropTypes.string.isRequired,
};
