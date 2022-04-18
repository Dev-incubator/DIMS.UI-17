import PropTypes from 'prop-types';
import { getFullName } from '../../shared/helpers/getFullName/getFullName';
import style from './Table.module.css';

export function MembersTableRow({
  index,
  firstName,
  lastName,
  directionName,
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
            {getFullName(firstName, lastName)}
          </div>
        </td>
        <td>{directionName}</td>
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
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  directionName: PropTypes.string.isRequired,
  education: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  birthDate: PropTypes.string.isRequired,
  action: PropTypes.node.isRequired,
  showReadOnlyModal: PropTypes.func.isRequired,
};
