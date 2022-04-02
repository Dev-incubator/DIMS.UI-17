import PropTypes from 'prop-types';

export function TableHead({ titles }) {
  return (
    <thead>
      <tr>
        {Object.values(titles).map((item) => (
          <th key={item}>{item}</th>
        ))}
      </tr>
    </thead>
  );
}

TableHead.propTypes = {
  titles: PropTypes.objectOf(PropTypes.string).isRequired,
};
