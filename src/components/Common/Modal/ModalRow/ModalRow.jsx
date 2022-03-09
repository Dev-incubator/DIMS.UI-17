import PropTypes from 'prop-types';
import style from './ModalRow.module.css';

export function ModalRow({ onChange, value, name, title, type = 'text', options = {} }) {
  return (
    <label className={style.item} htmlFor={name}>
      {title}
      {type === 'select' ? (
        <select name={name} onChange={onChange} value={value}>
          {Object.entries(options).map((item) => (
            <option key={item} value={item[0]}>
              {item[1]}
            </option>
          ))}
        </select>
      ) : (
        <input onChange={onChange} value={value} type={type} name={name} id={name} />
      )}
    </label>
  );
}

ModalRow.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.shape({}),
};
ModalRow.defaultProps = {
  type: 'text',
  title: 'name',
  value: '',
  options: {},
};
