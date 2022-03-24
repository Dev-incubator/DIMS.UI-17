import React from 'react';
import propTypes from 'prop-types';
import { initialStateTasks } from '../../../shared/initialStates';
import { BUTTONS_TYPES, BUTTONS_NAMES, TASK_FIELDS_KEYS } from '../../../shared/constants';
import { Button } from '../../Buttons/Button/Button';
import style from './CreateTaskForm.module.css';
import noop from '../../../shared/noop';
import { createTask, getAllTasks, getTaskData, updateTask } from '../../../services/tasks-services';
import { FormField } from '../FormField/FormField';
import { validateFormCreateUser } from '../../../shared/helpers';

export class CreateTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialStateTasks;
    this.myRef = [];
  }

  componentDidMount() {
    const { taskData, isEditMode } = this.props;

    if (isEditMode) {
      this.setState((prevState) => {
        const { formErrors } = prevState;
        const formErrorsForEditMode = formErrors.map((item) => ({ ...item, isValid: true }));

        return { ...taskData, formErrors: formErrorsForEditMode, isValid: true, isValidCheckBox: true };
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState((prevState) => {
      const { formErrors } = prevState;
      const { name: fildName, error } = validateFormCreateUser(name, value);
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

  checkboxHandler = () => {
    const selectedUsers = this.myRef.filter((item) => item.checked);

    this.setState((prevState) => {
      return selectedUsers.length
        ? { ...prevState, checkboxError: '', isValidCheckBox: true }
        : { ...prevState, checkboxError: 'require', isValidCheckBox: false };
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { setTasksHandler, toggleModalHandler, isEditMode, id, toggleError } = this.props;
    const { statuses } = isEditMode ? await getTaskData(id) : [];
    const selectedUsers = this.myRef
      .filter((item) => item.checked)
      .map((item) =>
        isEditMode
          ? statuses.find((elem) => elem.id === item.name) || { id: item.name, status: 'Active' }
          : { id: item.name, status: 'Active' },
      );
    const subscribers = selectedUsers.map((item) => item.id);
    const isAdded = isEditMode
      ? await updateTask(id, { ...this.state, statuses: [...selectedUsers], subscribers })
      : await createTask({ ...this.state, statuses: [...selectedUsers], subscribers });
    if (isAdded) {
      toggleModalHandler();
      const updatedTasks = await getAllTasks();
      setTasksHandler(updatedTasks);
    } else {
      toggleError();
    }
  };

  render() {
    const { toggleModalHandler, isReadOnlyMode, users, taskData, isEditMode } = this.props;
    const { formErrors, isValid, checkboxError, isValidCheckBox } = this.state;
    const subscribers = Object.keys(taskData).length === 0 ? [] : taskData.statuses.map((item) => item.id);

    return (
      <form onSubmit={this.handleSubmit} className={style.wrapper}>
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
                isReadOnlyMode={isReadOnlyMode}
                errors={error}
              />
            );
          })}
        </div>
        <div className={style.userContainer}>
          {users.map((user, index) => (
            <label className={style.users} key={user.id} htmlFor={user.id}>
              {user.name}
              <input
                ref={(ref) => {
                  this.myRef[index] = ref;
                }}
                type='checkbox'
                name={user.id}
                id={user.id}
                defaultChecked={isEditMode ? subscribers.includes(user.id) : false}
                onClick={this.checkboxHandler}
              />
            </label>
          ))}
        </div>
        <p className={style.error}>{checkboxError}</p>

        <div className={style.section__buttons}>
          {!isReadOnlyMode && <input type='submit' value='Save' disabled={!isValid || !isValidCheckBox} />}

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

CreateTaskForm.propTypes = {
  toggleError: propTypes.func.isRequired,
  setTasksHandler: propTypes.func,
  toggleModalHandler: propTypes.func.isRequired,
  isReadOnlyMode: propTypes.oneOfType([propTypes.bool, propTypes.string]),
  users: propTypes.arrayOf(propTypes.object).isRequired,
  taskData: propTypes.oneOfType([
    propTypes.shape({}),
    propTypes.shape({ id: propTypes.string, statuses: propTypes.arrayOf(propTypes.string) }),
  ]),
  isEditMode: propTypes.bool,
  id: propTypes.string,
};

CreateTaskForm.defaultProps = {
  taskData: {},
  setTasksHandler: noop,
  isReadOnlyMode: false,
  isEditMode: false,
  id: '0',
};