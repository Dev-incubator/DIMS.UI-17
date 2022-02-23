import PropTypes from 'prop-types';
import { TableBody } from './TableBody/TableBody';
import { TableHead } from './TableHead/TableHead';

export function Table({ titles, items }) {
  return (
    <table>
      <TableHead titles={titles} />
      <TableBody items={items} />
    </table>
  );
}

Table.propTypes = {
  titles: PropTypes.node,
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

Table.defaultProps = {
  titles: ['#'],
  items: {},
};
