import React from 'react';
import propTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { initialStateTasks } from '../../../shared/initialStates';
import { BUTTONS_TYPES, BUTTONS_NAMES, TASK_FIELDS_KEYS } from '../../../shared/constants';
import { Button } from '../../Buttons/Button/Button';
import style from './CreateTaskForm.module.css';
import { FormField } from '../FormField/FormField';
import { validateFormField } from '../../../shared/helpers/validateFormField/validateFormField';
import { getFullName } from '../../../shared/helpers/getFullName/getFullName';

export class CreateTaskForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = initialStateTasks;
    this.myRef = [];
  }

  componentDidMount() {
    const { taskData, isEditMode } = this.props;

    if (isEditMode) {
      this.setState({ ...taskData });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState((prevState) => {
      const { formErrors } = prevState;
      const { name: fildName, error } = validateFormField(name, value);
      const updatedErrors = formErrors.map((item) => (item.name === fildName ? { ...item, error } : item));

      return {
        ...prevState,
        [name]: value,
        formErrors: updatedErrors,
      };
    });
  };

  checkboxHandler = () => {
    const selectedUsers = this.myRef.filter((item) => item.checked);

    this.setState((prevState) => {
      const { formErrors } = prevState;

      return {
        ...prevState,
        formErrors: formErrors.map((item) =>
          item.name === 'checkbox' ? { ...item, error: selectedUsers.length ? '' : 'required' } : item,
        ),
      };
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { isEditMode, createTaskHandler, updateTaskHandler, taskData } = this.props;
    const { formErrors, ...data } = this.state;
    const { statuses } = isEditMode ? taskData : [];
    const selectedUsers = this.myRef
      .filter((item) => item.checked)
      .map((item) =>
        isEditMode
          ? statuses.find((elem) => elem.id === item.name) || { id: item.name, status: 'Active' }
          : { id: item.name, status: 'Active' },
      );
    const assignedUsers = selectedUsers.map(({ id }) => id);
    const errors = formErrors
      .map((item) => {
        const { name, error } = validateFormField(item.name, data[item.name]);
        this.setState((prevState) => ({
          ...prevState,
          formErrors: prevState.formErrors.map((field) => (field.name === name ? { ...field, error } : field)),
        }));

        return error;
      })
      .filter((error) => error);
    if (isEditMode && !errors.length) {
      updateTaskHandler({ ...data, statuses: [...selectedUsers], assignedUsers });
    } else if (!errors.length) {
      createTaskHandler({ ...data, statuses: [...selectedUsers], assignedUsers });
    }
  };

  render() {
    const { toggleModalHandler, isReadonly, users, taskData, isEditMode } = this.props;
    const { formErrors } = this.state;
    const { error: checkboxError } = formErrors.find((item) => item.name === 'checkbox');
    const assignedUsers = !taskData ? [] : taskData.statuses.map((item) => item.id);

    return (
      <Form className={style.wrapper}>
        <div className={style.section__fields}>
          {TASK_FIELDS_KEYS.map((item) => {
            const { name, title, type, options, required } = item;
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
                required={required}
                isReadonly={isReadonly}
                errors={error}
              />
            );
          })}
        </div>
        <div className={style.userContainer}>
          {users.map((user, index) => (
            <label className={style.users} key={user.userId} htmlFor={user.userId}>
              {getFullName(user.firstName, user.lastName)}
              <Form.Check
                disabled={isReadonly}
                ref={(ref) => {
                  this.myRef[index] = ref;
                }}
                type='checkbox'
                name={user.userId}
                id={user.userId}
                defaultChecked={isEditMode ? assignedUsers.includes(user.userId) : false}
                onClick={this.checkboxHandler}
              />
            </label>
          ))}
        </div>
        <p className={style.error}>{checkboxError}</p>

        <div className={style.section__buttons}>
          {!isReadonly && <Button title='Save' onClick={this.handleSubmit} />}

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

CreateTaskForm.propTypes = {
  toggleModalHandler: propTypes.func.isRequired,
  createTaskHandler: propTypes.func.isRequired,
  updateTaskHandler: propTypes.func.isRequired,
  isReadonly: propTypes.oneOfType([propTypes.bool, propTypes.string]),
  users: propTypes.arrayOf(propTypes.object).isRequired,
  taskData: propTypes.oneOfType([propTypes.string, propTypes.object]),
  isEditMode: propTypes.bool,
};

CreateTaskForm.defaultProps = {
  taskData: null,
  isReadonly: false,
  isEditMode: false,
};
