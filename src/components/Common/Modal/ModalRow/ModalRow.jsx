import PropTypes from 'prop-types';
import style from './ModalRow.module.css';

export function ModalRow({ onChange, value, name, title, type = 'text', options = {}, required }) {
  return (
    <label className={style.item} htmlFor={name}>
      {title}
      {type === 'select' ? (
        <select name={name} onChange={onChange} value={value}>
          {Object.entries(options).map(([optionsValue, optionsName]) => (
            <option key={optionsValue} value={optionsName}>
              {name}
            </option>
          ))}
        </select>
      ) : (
        <input onChange={onChange} value={value} type={type} name={name} id={name} required={required} />
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
  required: PropTypes.bool.isRequired,
};
ModalRow.defaultProps = {
  type: 'text',
  title: 'name',
  value: '',
  options: {},
};
