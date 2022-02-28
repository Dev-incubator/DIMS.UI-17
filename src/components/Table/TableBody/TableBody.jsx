import PropTypes from 'prop-types';
import style from './TableBody.module.css';

export function TableBody({ items }) {
  return (
    <tbody className={style.table}>
      {items.map((item, index) => {
        const [id, name, ...other] = item;

        return (
          <tr key={id + index.toString()}>
            <td>{index}</td>
            <td>
              <a href={`http:\\${id}`}>{name}</a>
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
};

TableBody.defaultProps = {
  items: ['#'],
};
