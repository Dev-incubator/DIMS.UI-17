import PropTypes from 'prop-types';
import style from './RadioButton.module.css';

export function RadioButton({ label, value, onChange, apiMode }) {
  return (
    <label htmlFor={value}>
      <span className={style.apiName}>{label}</span>
      <input type='radio' value={value} checked={apiMode === value} name={value} onChange={onChange} />
    </label>
  );
}

RadioButton.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  apiMode: PropTypes.string.isRequired,
};
