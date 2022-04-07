import { Table as BootstrapTable } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { TableHead } from './TableHead';

export function Table({ title, items, striped = true, bordered = true, hover = true }) {
  return (
    <BootstrapTable striped={striped} bordered={bordered} hover={hover}>
      <TableHead items={title} />
      {items.map((item) => item)}
    </BootstrapTable>
  );
}

Table.propTypes = {
  title: PropTypes.arrayOf(PropTypes.string).isRequired,
  items: PropTypes.node.isRequired,
  striped: PropTypes.bool,
  bordered: PropTypes.bool,
  hover: PropTypes.bool,
};

Table.defaultProps = {
  striped: true,
  bordered: true,
  hover: true,
};
