import React from 'react';
import { Form } from 'react-bootstrap';
import propTypes from 'prop-types';
import { initialStateCreatMember } from '../../../shared/initialStates';
import { BUTTONS_TYPES, BUTTONS_NAMES, USER_FIELDS_KEYS, FORM_MEMBER_ERRORS } from '../../../shared/constants';
import { Button } from '../../Buttons/Button/Button';
import { FormField } from '../FormField/FormField';
import style from './CreateMemberForm.module.css';
import { validateFormField } from '../../../shared/helpers/validateFormField/validateFormField';
import { typesValidation } from '../../../shared/helpers/typesValidation/typesValidation';

export class CreateMemberForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { ...initialStateCreatMember, formErrors: FORM_MEMBER_ERRORS };
  }

  async componentDidMount() {
    const { userData, isEditMode } = this.props;

    if (isEditMode) {
      this.setState({
        ...userData,
        formErrors: FORM_MEMBER_ERRORS.map((item) => ({ ...item, error: '' })),
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState((prevState) => {
      const { password, formErrors } = prevState;
      const { name: fildName, error } = validateFormField(name, value, password);
      const updatedErrors = formErrors.map((item) => (item.name === fildName ? { ...item, error } : item));

      return {
        ...prevState,
        [name]: value,
        formErrors: updatedErrors,
      };
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { isEditMode, createUserHandler, editUserDataHandler } = this.props;
    const { formErrors, ...data } = this.state;
    if (isEditMode) {
      await editUserDataHandler(typesValidation(data));
    } else {
      await createUserHandler(typesValidation(data));
    }
  };

  render() {
    const { toggleModalHandler, isReadOnlyMode } = this.props;
    const { formErrors } = this.state;
    const isError = formErrors.filter((item) => item.error !== '');

    return (
      <Form>
        <div className={style.section__fields}>
          {USER_FIELDS_KEYS.map((item) => {
            const { name, title, type, options } = item;
            const { state } = this;
            const { error } = formErrors.find((field) => field.name === name) || '';

            return (
              <FormField
                key={item.name}
                onChange={this.handleChange}
                value={state[name]}
                name={name}
                options={options}
                type={type}
                title={title}
                isReadOnlyMode={isReadOnlyMode}
                errors={error}
              />
            );
          })}
        </div>
        <div className={style.section__buttons}>
          {!isReadOnlyMode && <Button title='Save' onClick={this.handleSubmit} disabled={isError.length} />}

          <Button
            onClick={toggleModalHandler}
            stylingType={BUTTONS_TYPES.typeSecondary}
            title={BUTTONS_NAMES.backToList}
          />
        </div>
      </Form>
    );
  }
}

CreateMemberForm.propTypes = {
  toggleModalHandler: propTypes.func.isRequired,
  editUserDataHandler: propTypes.func.isRequired,
  createUserHandler: propTypes.func.isRequired,
  userData: propTypes.oneOfType([propTypes.object, propTypes.string, propTypes.array]),
  isReadOnlyMode: propTypes.oneOfType([propTypes.bool, propTypes.string]),
  isEditMode: propTypes.bool,
};

CreateMemberForm.defaultProps = {
  userData: null,
  isReadOnlyMode: false,
  isEditMode: false,
};
