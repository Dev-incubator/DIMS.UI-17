import PropTypes from 'prop-types';
import style from './ModalRow.module.css';

export function ModalRow({ onChange, value, name, title, type = 'text', options, required, isReadOnlyMode }) {
  return (
    <label className={style.item} htmlFor={name}>
      {title}
      {type === 'select' ? (
        <select name={name} onChange={onChange} value={value}>
          {options.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      ) : (
        <input
          onChange={onChange}
          value={value}
          type={type}
          name={name}
          id={name}
          required={required}
          readOnly={isReadOnlyMode}
        />
      )}
    </label>
  );
}

ModalRow.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  required: PropTypes.bool,
  isReadOnlyMode: PropTypes.bool,
};
ModalRow.defaultProps = {
  type: 'text',
  title: 'name',
  required: true,
  options: '',
  isReadOnlyMode: false,
};
