import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import style from './Table.module.css';

export function AllTasksTableRow({ index, name, description, startDate, deadlineDate, action, id, linkPath }) {
  return (
    <tbody className={style.table}>
      <tr>
        <td>{index}</td>
        <td>
          <NavLink to={`${linkPath}/${id}/tracks`}>{name}</NavLink>
        </td>
        <td>{description}</td>
        <td>{startDate}</td>
        <td>{deadlineDate}</td>
        <td>{action}</td>
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
  linkPath: PropTypes.string.isRequired,
};
