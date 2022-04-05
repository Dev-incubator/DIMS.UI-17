import React from 'react';
import { Form } from 'react-bootstrap';
import propTypes from 'prop-types';
import { initialStateCreatMember } from '../../../shared/initialStates';
import { BUTTONS_TYPES, BUTTONS_NAMES, USER_FIELDS_KEYS } from '../../../shared/constants';
import { Button } from '../../Buttons/Button/Button';
import { FormField } from '../FormField/FormField';
import style from './CreateMemberForm.module.css';
import { validateFormCreateUser } from '../../../shared/helpers';

export class CreateMemberForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = initialStateCreatMember;
  }

  async componentDidMount() {
    const { userData, isEditMode } = this.props;

    if (isEditMode) {
      this.setState((prevState) => {
        const { formErrors } = prevState;
        const formErrorsForEditMode = formErrors.map((item) => ({ ...item, isValid: true }));

        return { ...userData, formErrors: formErrorsForEditMode, isValid: true };
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState((prevState) => {
      const { password, formErrors } = prevState;
      const { name: fildName, error } = validateFormCreateUser(name, value, password);
      const updatedErrors = formErrors.map((item) =>
        item.name === fildName ? { ...item, error, isValid: !error.length } : item,
      );

      return {
        ...prevState,
        [name]: value,
        formErrors: updatedErrors,
      };
    });

    this.setState((prevState) => {
      const { formErrors } = prevState;
      const errors = formErrors.filter((item) => !item.isValid);

      return errors.length ? { ...prevState, isValid: false } : { ...prevState, isValid: true };
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { isEditMode, createUserHandler, editUserDataHandler } = this.props;
    const { formErrors, isValid, ...data } = this.state;
    if (isEditMode) {
      await editUserDataHandler(data);
    } else {
      await createUserHandler(data);
    }
  };

  render() {
    const { toggleModalHandler, isReadOnlyMode } = this.props;
    const { formErrors, isValid } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
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
          {!isReadOnlyMode && <Button title='Save' onClick={this.handleSubmit} disabled={!isValid} />}

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
