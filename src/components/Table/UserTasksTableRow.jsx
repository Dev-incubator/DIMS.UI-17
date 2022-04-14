import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import style from './Table.module.css';

export function UserTasksTableRow({ index, id, name, startDate, deadlineDate, status, linkPath }) {
  return (
    <tbody className={style.table}>
      <tr>
        <td>{index}</td>
        <td>
          <NavLink to={`${linkPath}/${id}/tracks`}>{name}</NavLink>
        </td>
        <td>{startDate}</td>
        <td>{deadlineDate}</td>
        <td>{status}</td>
      </tr>
    </tbody>
  );
}

UserTasksTableRow.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  deadlineDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  linkPath: PropTypes.string.isRequired,
};
