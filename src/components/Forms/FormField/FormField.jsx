import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import style from './FormField.module.css';
import eye from '../../../assets/img/opened-eye.svg';
import hideEye from '../../../assets/img/closed-eye.svg';

export function FormField({ onChange, value, name, title, type = 'text', options, isReadonly, errors }) {
  const inputRef = useRef(null);
  const [isShowPass, setShowPass] = useState(false);

  const toggleShowPassword = (e) => {
    e.preventDefault();
    const nodeType = inputRef.current.type;
    inputRef.current.type = nodeType === 'text' ? 'password' : 'text';
    setShowPass(!isShowPass);
  };

  return (
    <Form.Group>
      <Form.Label>
        {title}
        <span className={style.errors}>{errors}</span>
      </Form.Label>
      {type === 'select' ? (
        <Form.Select name={name} onChange={onChange} value={value} disabled={isReadonly}>
          {options.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Form.Select>
      ) : (
        <div className={style.inputWrapper}>
          {type === 'password' && (
            <input
              type='image'
              src={isShowPass ? hideEye : eye}
              alt='Show password'
              onClick={toggleShowPassword}
              className={style.show}
            />
          )}

          <Form.Control
            onChange={onChange}
            value={value}
            type={type}
            name={name}
            id={name}
            readOnly={isReadonly}
            isInvalid={errors}
            ref={inputRef}
          />
        </div>
      )}
    </Form.Group>
  );
}

FormField.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  options: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  isReadonly: PropTypes.bool,
  errors: PropTypes.string,
};
FormField.defaultProps = {
  type: 'text',
  title: 'name',
  options: '',
  isReadonly: false,
  errors: '',
};
