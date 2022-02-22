import PropTypes from 'prop-types';
import { Button } from '../../../../components/Buttons/Button/Button';
import { BUTTON_COLORS, BUTTON_VALUES } from '../../../../scripts/libraries';
import styles from '../UserTasks.module.css';

export function UserTaskRow({ number, title, startDate, status, deadline, ...restProps }) {
  console.log(restProps);
  let buttonColor = BUTTON_COLORS.blue;
  let buttonValue = BUTTON_VALUES.active;
  if (status === 'Active') {
    buttonColor = BUTTON_COLORS.green;
    buttonValue = BUTTON_VALUES.success;
  }

  return (
    <tr>
      <td>{number}</td>
      <td>{title}</td>
      <td>{startDate}</td>
      <td>{deadline}</td>
      <td>{status}</td>
      <td>
        <div className={styles.buttonGroup}>
          <Button color={buttonColor}>{buttonValue}</Button>
          <Button color={BUTTON_COLORS.red}>{BUTTON_VALUES.fail}</Button>
        </div>
      </td>
    </tr>
  );
}

UserTaskRow.propTypes = {
  taskId: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
