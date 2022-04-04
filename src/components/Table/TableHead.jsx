import PropTypes from 'prop-types';

export function TableHead({ items }) {
  return (
    <thead>
      <tr>
        {items.map((item) => (
          <th key={item}>{item}</th>
        ))}
      </tr>
    </thead>
  );
}

TableHead.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};
