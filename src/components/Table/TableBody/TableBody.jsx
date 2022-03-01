import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import style from './TableBody.module.css';

export function TableBody({ items, linkPath }) {
  return (
    <tbody className={style.table}>
      {items.map((item, index) => {
        const [id, name, ...other] = item;

        return (
          <tr key={id + index.toString()}>
            <td>{index}</td>
            <td>
              <NavLink to={`${linkPath}/?member=${id}`}>{name}</NavLink>
            </td>
            {other.map((elem, indexElem) => (
              <td key={elem + indexElem.toString()}>{elem}</td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
}

TableBody.propTypes = {
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  linkPath: PropTypes.string,
};

TableBody.defaultProps = {
  items: ['#'],
  linkPath: '',
};
