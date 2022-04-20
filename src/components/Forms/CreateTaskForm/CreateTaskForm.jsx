import React from 'react';
import propTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { initialStateTasks } from '../../../shared/initialStates';
import { BUTTONS_TYPES, BUTTONS_NAMES, TASK_FIELDS_KEYS } from '../../../shared/constants';
import { Button } from '../../Buttons/Button/Button';
import style from './CreateTaskForm.module.css';
import { getTaskData } from '../../../services/tasks-services';
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
    const { isEditMode, id, createTaskHandler, updateTaskHandler } = this.props;
    const { statuses } = isEditMode ? await getTaskData(id) : [];
    const selectedUsers = this.myRef
      .filter((item) => item.checked)
      .map((item) =>
        isEditMode
          ? statuses.find((elem) => elem.id === item.name) || { id: item.name, status: 'Active' }
          : { id: item.name, status: 'Active' },
      );
    const subscribers = selectedUsers.map((item) => item.id);

    if (isEditMode) {
      updateTaskHandler({ ...this.state, statuses: [...selectedUsers], subscribers });
    } else {
      createTaskHandler({ ...this.state, statuses: [...selectedUsers], subscribers });
    }
  };

  render() {
    const { toggleModalHandler, isReadOnlyMode, users, taskData, isEditMode } = this.props;
    const { formErrors } = this.state;
    const { error: checkboxError } = formErrors.find((item) => item.name === 'checkbox');
    const isError = formErrors.filter((item) => item.error !== '');
    const subscribers = !taskData ? [] : taskData.statuses.map((item) => item.id);

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
                isReadOnlyMode={isReadOnlyMode}
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
                ref={(ref) => {
                  this.myRef[index] = ref;
                }}
                type='checkbox'
                name={user.userId}
                id={user.userId}
                defaultChecked={isEditMode ? subscribers.includes(user.userId) : false}
                onClick={this.checkboxHandler}
              />
            </label>
          ))}
        </div>
        <p className={style.error}>{checkboxError}</p>

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

CreateTaskForm.propTypes = {
  toggleModalHandler: propTypes.func.isRequired,
  createTaskHandler: propTypes.func.isRequired,
  updateTaskHandler: propTypes.func.isRequired,
  isReadOnlyMode: propTypes.oneOfType([propTypes.bool, propTypes.string]),
  users: propTypes.arrayOf(propTypes.object).isRequired,
  taskData: propTypes.oneOfType([propTypes.string, propTypes.object]),
  isEditMode: propTypes.bool,
  id: propTypes.oneOfType([propTypes.object, propTypes.string]),
};

CreateTaskForm.defaultProps = {
  taskData: null,
  isReadOnlyMode: false,
  isEditMode: false,
  id: null,
};
