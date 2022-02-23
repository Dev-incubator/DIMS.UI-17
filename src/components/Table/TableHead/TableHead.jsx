import PropTypes from 'prop-types';

export function TableHead({ titles }) {
  return (
    <thead>
      <tr>
        {titles.map((item) => (
          <th key={item}>{item}</th>
        ))}
      </tr>
    </thead>
  );
}

TableHead.propTypes = {
  titles: PropTypes.node,
};

TableHead.defaultProps = {
  titles: ['#'],
};
