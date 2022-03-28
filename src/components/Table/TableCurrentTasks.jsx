import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import style from './Table.module.css';

export function TableCurrentTasks({ titles, items, linkPath, action, userId }) {
  return (
    <table className={style.table}>
      <thead>
        <tr>
          {Object.values(titles).map((item) => (
            <th key={item}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => {
          const { id, name, startDate, deadlineDate, statuses } = item;
          const statusIndex = statuses.findIndex((elem) => elem.id === userId);

          return (
            <tr key={name + index.toString()}>
              <td>{index}</td>
              <td>
                <NavLink to={`${linkPath}/${id}`}>{item.name}</NavLink>
              </td>
              <td>{startDate}</td>
              <td>{deadlineDate}</td>
              <td>{statuses[statusIndex].status}</td>
              <td>{React.cloneElement(action, { status: statuses[statusIndex].status, taskId: item.id }, null)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

TableCurrentTasks.propTypes = {
  titles: PropTypes.objectOf(PropTypes.string).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  linkPath: PropTypes.string,
  action: PropTypes.node.isRequired,
  userId: PropTypes.string.isRequired,
};

TableCurrentTasks.defaultProps = {
  linkPath: '/',
};
