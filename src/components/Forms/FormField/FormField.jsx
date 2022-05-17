import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import style from './FormField.module.css';
import eye from '../../../assets/img/eye.png';
import hideEye from '../../../assets/img/hideEye.png';

export function FormField({ onChange, value, name, title, type = 'text', options, isReadOnlyMode, errors }) {
  const inputRef = useRef(null);
  const [isShowPass, setShowPass] = useState(false);

  const toggleShowPassword = () => {
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
        <Form.Select name={name} onChange={onChange} value={value} disabled={isReadOnlyMode}>
          {options.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Form.Select>
      ) : (
        <div className={style.inputWrapper}>
          {type === 'password' && (
            <img
              src={isShowPass ? hideEye : eye}
              alt='Show password'
              role='none'
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
            readOnly={isReadOnlyMode}
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
