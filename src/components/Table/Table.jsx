import PropTypes from 'prop-types';
import { TableBody } from './TableBody/TableBody';
import { TableHead } from './TableHead/TableHead';

export function Table({ titles, items, linkPath }) {
  return (
    <table>
      <TableHead titles={titles} />
      <TableBody items={items} linkPath={linkPath} />
    </table>
  );
}

Table.propTypes = {
  titles: PropTypes.node,
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  linkPath: PropTypes.string,
};

Table.defaultProps = {
  titles: ['#'],
  items: {},
  linkPath: '',
};
