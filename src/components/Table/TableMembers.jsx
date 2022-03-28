import React from 'react';
import PropTypes from 'prop-types';
import { ButtonsAdminMemberPage } from '../Buttons/ButtonsAdmin/ButtonsAdmin';
import style from './Table.module.css';

export function TableMembers({ titles, items, action }) {
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
          const { id, name, ...other } = titles;
          const keys = Object.keys(other);
          const lastItem = keys.length - 1;

          return (
            <tr key={item + index.toString()}>
              <td>{index}</td>
              <td>
                <ButtonsAdminMemberPage readMode id={item.id} userName={item.name} />
              </td>
              {keys.map((elem, indexElem) => (
                <td key={item[elem] + indexElem.toString()}>
                  {lastItem === indexElem ? React.cloneElement(action, { id: item.id }, null) : item[elem]}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

TableMembers.propTypes = {
  titles: PropTypes.objectOf(PropTypes.string).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.node.isRequired,
};
