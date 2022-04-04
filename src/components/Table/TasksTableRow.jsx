import PropTypes from 'prop-types';

export function TasksTableRow({ index, name, startDate, deadlineDate, status, actions }) {
  return (
    <tbody>
      <tr>
        <td>{index}</td>
        <td>{name}</td>
        <td>{startDate}</td>
        <td>{deadlineDate}</td>
        <td>{status}</td>
        <td>{actions}</td>
      </tr>
    </tbody>
  );
}

TasksTableRow.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  deadlineDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  actions: PropTypes.node.isRequired,
};
