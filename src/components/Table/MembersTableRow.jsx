import PropTypes from 'prop-types';
import style from './Table.module.css';

export function MembersTableRow({
  index,
  name,
  lastName,
  direction,
  education,
  startDate,
  birthDate,
  action,
  showReadOnlyModal,
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
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  education: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  birthDate: PropTypes.string.isRequired,
  action: PropTypes.node.isRequired,
  showReadOnlyModal: PropTypes.func.isRequired,
};
