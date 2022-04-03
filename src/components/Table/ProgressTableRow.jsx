import PropTypes from 'prop-types';

export function ProgressTableRow({ progress: { name, node, date }, index }) {
  return (
    <tbody>
      <tr>
        <td>{index}</td>
        <td>{name}</td>
        <td>{node}</td>
        <td>{date}</td>
      </tr>
    </tbody>
  );
}

ProgressTableRow.propTypes = {
  progress: PropTypes.shape({
    name: PropTypes.string,
    node: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
