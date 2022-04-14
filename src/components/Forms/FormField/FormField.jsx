import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

export function FormField({ onChange, value, name, title, type = 'text', options, isReadOnlyMode, errors }) {
  return (
    <Form.Group>
      <Form.Label>{title}</Form.Label>
      {type === 'select' ? (
        <Form.Select name={name} onChange={onChange} value={value}>
          {options.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Form.Select>
      ) : (
        <Form.Control
          onChange={onChange}
          value={value}
          type={type}
          name={name}
          id={name}
          readOnly={isReadOnlyMode}
          isInvalid={errors}
        />
      )}
      <Form.Control.Feedback type='invalid'>{errors}</Form.Control.Feedback>
    </Form.Group>
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
