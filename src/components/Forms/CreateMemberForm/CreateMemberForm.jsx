import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';
import propTypes from 'prop-types';
import { initialStateCreatMember } from '../../../shared/initialStates';
import { BUTTONS_TYPES, BUTTONS_NAMES, USER_FIELDS_KEYS } from '../../../shared/constants';
import { Button } from '../../Buttons/Button/Button';
import { FormField } from '../FormField/FormField';
import style from './CreateMemberForm.module.css';
import { editUser, getAllUsers, createUser } from '../../../services/users-services ';
import noop from '../../../shared/noop';
import { validateFormCreateUser } from '../../../shared/helpers';

export class CreateMemberForm extends React.Component {
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
    const { setUsersHandler, toggleModalHandler, isEditMode, id, toggleError } = this.props;
    const { formErrors, isValid, ...data } = this.state;

    const isAdded = isEditMode ? await editUser(id, data) : await createUser(data);
    if (isAdded) {
      toggleModalHandler();
      const updatedUsers = await getAllUsers();
      setUsersHandler(updatedUsers);
    } else {
      toggleError();
    }
  };

  render() {
    const { toggleModalHandler, isReadOnlyMode } = this.props;
    const { formErrors, isValid } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={style.wrapper}>
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
          {!isReadOnlyMode && <BootstrapButton as='input' type='submit' value='Save' disabled={!isValid} />}

          <Button
            onClick={toggleModalHandler}
            stylingType={BUTTONS_TYPES.typeSecondary}
            title={BUTTONS_NAMES.backToList}
          />
        </div>
      </form>
    );
  }
}

CreateMemberForm.propTypes = {
  toggleError: propTypes.func,
  setUsersHandler: propTypes.func,
  toggleModalHandler: propTypes.func.isRequired,
  userData: propTypes.shape({}),
  isReadOnlyMode: propTypes.oneOfType([propTypes.bool, propTypes.string]),
  id: propTypes.string,
  isEditMode: propTypes.bool,
};

CreateMemberForm.defaultProps = {
  toggleError: noop,
  userData: {},
  setUsersHandler: noop,
  isReadOnlyMode: false,
  id: '0',
  isEditMode: false,
};
