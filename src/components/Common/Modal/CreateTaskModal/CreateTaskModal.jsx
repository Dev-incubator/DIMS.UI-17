import React from 'react';
import propTypes from 'prop-types';
import { initialStateTasks } from '../../../../shared/store';
import { BUTTONS_TYPES, BUTTONS_NAMES, TASK_FIELDS_KEYS } from '../../../../shared/constants';
import { Button } from '../../../Buttons/Button/Button';
import { ModalRow } from '../ModalRow/ModalRow';
import style from './CreateTaskModal.module.css';
import noop from '../../../../shared/noop';
import { createTask, getAllTasks, getTaskData, updateTask } from '../../../../services/tasks-services';

export class CreateTaskModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialStateTasks;
    this.myRef = [];
  }

  componentDidMount() {
    const { taskData } = this.props;
    this.setState(taskData);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { handleSetTasks, handleToggleModal, isEditMode, id } = this.props;
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
      handleToggleModal();
      const updatedTasks = await getAllTasks();
      handleSetTasks(updatedTasks);
    }
  };

  render() {
    const { handleToggleModal, isReadOnlyMode, users, taskData, isEditMode } = this.props;
    const subscribers = Object.keys(taskData).length === 0 ? [] : taskData.statuses.map((item) => item.id);

    return (
      <form onSubmit={this.handleSubmit} className={style.wrapper}>
        <div className={style.section__fields}>
          {TASK_FIELDS_KEYS.map((item) => {
            const { name, title, type, options, required } = item;
            const { state } = this;

            return (
              <ModalRow
                key={item.name}
                onChange={this.handleChange}
                value={state[name]}
                name={name}
                options={options}
                type={type}
                title={title}
                required={required}
                isReadOnlyMode={isReadOnlyMode}
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
              />
            </label>
          ))}
        </div>
        <div className={style.section__buttons}>
          {!isReadOnlyMode && <input type='submit' value='Save' />}

          <Button
            onClick={handleToggleModal}
            stylingType={BUTTONS_TYPES.typeSecondary}
            title={BUTTONS_NAMES.backToList}
          />
        </div>
      </form>
    );
  }
}

CreateTaskModal.propTypes = {
  handleSetTasks: propTypes.func,
  handleToggleModal: propTypes.func.isRequired,
  isReadOnlyMode: propTypes.oneOfType([propTypes.bool, propTypes.string]),
  users: propTypes.arrayOf(propTypes.object).isRequired,
  taskData: propTypes.oneOfType([
    propTypes.shape({}),
    propTypes.shape({ id: propTypes.string, statuses: propTypes.arrayOf(propTypes.string) }),
  ]),
  isEditMode: propTypes.bool,
  id: propTypes.string,
};

CreateTaskModal.defaultProps = {
  taskData: {},
  handleSetTasks: noop,
  isReadOnlyMode: false,
  isEditMode: false,
  id: '0',
};
