import PropTypes from 'prop-types';
import { BUTTONS_NAMES, BUTTONS_TYPES } from '../../../../shared/constants';
import { Button } from '../../../Buttons/Button/Button';
import style from './DeleteModal.module.css';

export function DeleteModal({ handleDeleteUser, handleToggleModal, item }) {
  return (
    <div className={style.wrapper}>
      <h3>Are you sure you want to delete the current {item} ?</h3>
      <div className={style.buttons}>
        <Button title={BUTTONS_NAMES.delete} stylingType={BUTTONS_TYPES.typeDelete} onClick={handleDeleteUser} />
        <Button
          title={BUTTONS_NAMES.backToList}
          stylingType={BUTTONS_TYPES.typeSecondary}
          onClick={handleToggleModal}
        />
      </div>
    </div>
  );
}

DeleteModal.propTypes = {
  handleDeleteUser: PropTypes.func.isRequired,
  handleToggleModal: PropTypes.func.isRequired,
  item: PropTypes.string.isRequired,
};
