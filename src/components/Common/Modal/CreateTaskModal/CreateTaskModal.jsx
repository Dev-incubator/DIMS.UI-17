import React from 'react';
import propTypes from 'prop-types';
import { initialStateTasks } from '../../../../shared/store';
import { BUTTONS_TYPES, BUTTONS_NAMES, TASK_FIELDS_KEYS } from '../../../../shared/constants';
import { Button } from '../../../Buttons/Button/Button';
import { ModalRow } from '../ModalRow/ModalRow';
import style from './CreateTaskModal.module.css';
import noop from '../../../../shared/noop';
import { createTask, getAllTasks } from '../../../../services/tasks-services';

export class CreateTaskModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialStateTasks;
  }

  async componentDidMount() {
    const { taskData } = this.props;
    this.setState(taskData);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { handleSetTasks, handleToggleModal } = this.props;
    const isAdded = await createTask(this.state);
    if (isAdded) {
      handleToggleModal();
      const updatedTasks = await getAllTasks();
      handleSetTasks(updatedTasks);
    }
  };

  render() {
    const { handleToggleModal, isReadOnlyMode } = this.props;

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
  taskData: propTypes.shape({}),
  isReadOnlyMode: propTypes.oneOfType([propTypes.bool, propTypes.string]),
};

CreateTaskModal.defaultProps = {
  taskData: {},
  handleSetTasks: noop,
  isReadOnlyMode: false,
};
