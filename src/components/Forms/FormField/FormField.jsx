import PropTypes from 'prop-types';
import style from './FormField.module.css';

export function FormField({ onChange, value, name, title, type = 'text', options, isReadOnlyMode, errors }) {
  return (
    <div className={style.item}>
      <label className={style.field} htmlFor={name}>
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
          <input onChange={onChange} value={value} type={type} name={name} id={name} readOnly={isReadOnlyMode} />
        )}
      </label>
      <p className={style.error}>{errors}</p>
    </div>
  );
}

FormField.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  isReadOnlyMode: PropTypes.bool,
  errors: PropTypes.string,
};
FormField.defaultProps = {
  type: 'text',
  title: 'name',
  options: '',
  isReadOnlyMode: false,
  errors: '',
};
