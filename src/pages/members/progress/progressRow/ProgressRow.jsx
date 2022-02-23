import PropTypes from 'prop-types';

export function ProgressRow({ number, title, taskNote, date, ...restProps }) {
  console.log(restProps);

  return (
    <tr>
      <td>{number}</td>
      <td>{title}</td>
      <td>{taskNote}</td>
      <td>{date}</td>
    </tr>
  );
}

ProgressRow.propTypes = {
  number: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  taskNote: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
