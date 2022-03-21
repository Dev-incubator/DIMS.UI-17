import React from 'react';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES, LINKPATH_KEYS, MODALTITLE_KEYS } from '../../../shared/constants';
import { PageTitle } from '../../PageTitle/PageTitle';
import { TableAllTasks } from '../../Table/TableAllTasks';
import { getAllTasks } from '../../../services/tasks-services';
import { Modal } from '../../Common/Modal/Modal';
import { ButtonsTask } from '../../Buttons/ButtonsTask/ButtonsTask';
import { getAllUsers } from '../../../services/users-services ';
import { CreateTaskForm } from '../../Forms/CreateTaskForm/CreateTaskForm';

export class AllTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isModalOpen: false,
      users: [],
    };
  }

  async componentDidMount() {
    const tasks = await getAllTasks();
    const users = await getAllUsers();
    this.setState({ tasks, users });
  }

  setTasksHandler = (tasks) => {
    this.setState({ tasks });
  };

  toggleModalHandler = () => {
    this.setState((prevState) => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    const { tasks, users, isModalOpen } = this.state;

    return (
      <>
        <PageTitle title={TITLES_PAGES.allTasks} buttonTitle={BUTTONS_NAMES.create} onClick={this.toggleModalHandler} />
        <TableAllTasks
          titles={TABLE_TITLES.allTasks}
          items={tasks}
          linkPath={LINKPATH_KEYS.tasks}
          action={<ButtonsTask setTasksHandler={this.setTasksHandler} />}
        />
        {isModalOpen && (
          <Modal
            title={MODALTITLE_KEYS.createTask}
            isModalOpen={isModalOpen}
            toggleModalHandler={this.toggleModalHandler}
          >
            <CreateTaskForm
              users={users}
              toggleModalHandler={this.toggleModalHandler}
              setTasksHandler={this.setTasksHandler}
            />
          </Modal>
        )}
      </>
    );
  }
}
