import PropTypes from 'prop-types';

export function TrackTableRow({ index, name, node, date, actions }) {
  return (
    <tbody>
      <tr>
        <td>{index}</td>
        <td>{name}</td>
        <td>{node}</td>
        <td>{date}</td>
        <td>{actions}</td>
      </tr>
    </tbody>
  );
}

TrackTableRow.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  node: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  actions: PropTypes.node.isRequired,
};
