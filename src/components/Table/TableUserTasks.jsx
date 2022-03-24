import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import style from './Table.module.css';

export function TableUserTasks({ titles, items, linkPath }) {
  return (
    <Table striped bordered hover className={style.table}>
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

          return (
            <tr key={item + index.toString()}>
              <td>{index}</td>
              <td>
                <NavLink to={`${linkPath}/${item.id}/tracks`}>{item.name}</NavLink>
              </td>
              {keys.map((elem, indexElem) => (
                <td key={item[elem] + indexElem.toString()}>{item[elem]}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

TableUserTasks.propTypes = {
  titles: PropTypes.objectOf(PropTypes.string).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  linkPath: PropTypes.string,
};

TableUserTasks.defaultProps = {
  linkPath: '/',
};