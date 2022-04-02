import PropTypes from 'prop-types';
import style from './Table.module.css';

export function MembersTableRow({
  user: { name, lastName, direction, education, startDate, birthDate },
  action,
  showReadOnlyModal,
  index,
}) {
  return (
    <tbody>
      <tr>
        <td>{index}</td>
        <td>
          <div className={style.link} role='none' onClick={showReadOnlyModal}>
            {`${name} ${lastName}`}
          </div>
        </td>
        <td>{direction}</td>
        <td>{education}</td>
        <td>{startDate}</td>
        <td>{birthDate}</td>
        <td>{action}</td>
      </tr>
    </tbody>
  );
}

MembersTableRow.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    lastName: PropTypes.string,
    direction: PropTypes.string,
    education: PropTypes.string,
    startDate: PropTypes.string,
    birthDate: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  action: PropTypes.node.isRequired,
  showReadOnlyModal: PropTypes.func.isRequired,
};
