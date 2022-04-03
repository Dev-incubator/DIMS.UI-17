import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import style from './Table.module.css';

export function AllTasksTableRow({
  task: { name, description, startDate, deadlineDate },
  id,
  linkPath,
  action,
  index,
}) {
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
  task: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    startDate: PropTypes.string,
    deadlineDate: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  action: PropTypes.node.isRequired,
  id: PropTypes.string,
  linkPath: PropTypes.string.isRequired,
};

AllTasksTableRow.defaultProps = {
  id: '0',
};
