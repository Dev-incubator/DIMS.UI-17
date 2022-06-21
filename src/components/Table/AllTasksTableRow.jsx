import PropTypes from 'prop-types';
import style from './Table.module.css';

export function AllTasksTableRow({
  index,
  name,
  description,
  startDate,
  deadlineDate,
  action,
  id,
  showTaskDataHandler,
  selectTaskHandler,
  toggleTaskModalHandler,
}) {
  async function showTask() {
    await selectTaskHandler(id);
    await showTaskDataHandler(true);
    toggleTaskModalHandler();
  }

  return (
    <tbody className={style.table}>
      <tr>
        <td>{index}</td>
        <td>
          <div className={style.link} role='none' onClick={showTask}>
            {name}
          </div>
        </td>
        <td className={style.description}>{description}</td>
        <td>{startDate}</td>
        <td>{deadlineDate}</td>
        <td className={style.adminBtn}>{action}</td>
      </tr>
    </tbody>
  );
}

AllTasksTableRow.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  deadlineDate: PropTypes.string.isRequired,
  action: PropTypes.node.isRequired,
  id: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]).isRequired,
  showTaskDataHandler: PropTypes.func.isRequired,
  selectTaskHandler: PropTypes.func.isRequired,
  toggleTaskModalHandler: PropTypes.func.isRequired,
};
