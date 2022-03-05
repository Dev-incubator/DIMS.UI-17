import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export function Table({ titles, items }) {
  const titlesTable = Object.values(titles);

  return (
    <table>
      <thead>
        <tr>
          {titlesTable.map((item) => (
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
                <NavLink to={`/${item.id}`}>{item.name}</NavLink>
              </td>
              {keys.map((elem, indexElem) => (
                <td key={item[elem] + indexElem.toString()}>{item[elem]}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  titles: PropTypes.objectOf(PropTypes.string).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
