import PropTypes from 'prop-types';
import { BUTTONS_NAMES, BUTTONS_TYPES } from '../../../../shared/constants';
import { Button } from '../../../Buttons/Button/Button';
import style from './DeleteModal.module.css';

export function DeleteModal({ deleteHandler, toggleModalHandler, item }) {
  return (
    <div className={style.wrapper}>
      <h3>Are you sure you want to delete the current {item} ?</h3>
      <div className={style.buttons}>
        <Button title={BUTTONS_NAMES.delete} stylingType={BUTTONS_TYPES.typeDelete} onClick={deleteHandler} />
        <Button
          title={BUTTONS_NAMES.backToList}
          stylingType={BUTTONS_TYPES.typeSecondary}
          onClick={toggleModalHandler}
        />
      </div>
    </div>
  );
}

DeleteModal.propTypes = {
  deleteHandler: PropTypes.func.isRequired,
  toggleModalHandler: PropTypes.func.isRequired,
  item: PropTypes.string.isRequired,
};
