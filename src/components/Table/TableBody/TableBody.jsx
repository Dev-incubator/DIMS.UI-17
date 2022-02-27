import PropTypes from 'prop-types';

export function TableBody({ items }) {
  return (
    <tbody>
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
