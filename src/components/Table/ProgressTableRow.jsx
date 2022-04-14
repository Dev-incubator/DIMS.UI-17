import PropTypes from 'prop-types';

export function ProgressTableRow({ index, name, node, date }) {
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
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  node: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
