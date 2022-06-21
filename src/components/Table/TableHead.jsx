import PropTypes from 'prop-types';
import style from './TableHeader.module.css';

export function TableHead({ items }) {
  return (
    <thead>
      <tr>
        {items.map((item) => (
          <th className={style[item]} key={item}>
            {item}
          </th>
        ))}
      </tr>
    </thead>
  );
}

TableHead.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};
