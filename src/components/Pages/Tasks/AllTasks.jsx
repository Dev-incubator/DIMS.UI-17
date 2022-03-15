import React from 'react';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES, LINKPATH_KEYS, MODALTITLE_KEYS } from '../../../shared/constants';
import { PageTitle } from '../../PageTitle/PageTitle';
import { TableAllTasks } from '../../Table/TableAllTasks';
import { getAllTasks } from '../../../services/tasks-services';
import { Modal } from '../../Common/Modal/Modal';
import { CreateTaskModal } from '../../Common/Modal/CreateTaskModal/CreateTaskModal';
import { ButtonsTask } from '../../Buttons/ButtonsTask/ButtonsTask';
import { getAllUsers } from '../../../services/users-services ';

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

  setTasks = (tasks) => {
    this.setState({ tasks });
  };

  toggleModal = () => {
    this.setState((prevState) => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    const { tasks, users, isModalOpen } = this.state;

    return (
      <>
        <PageTitle title={TITLES_PAGES.allTasks} buttonTitle={BUTTONS_NAMES.create} onClick={this.toggleModal} />
        <TableAllTasks
          titles={TABLE_TITLES.allTasks}
          items={tasks}
          linkPath={LINKPATH_KEYS.tasks}
          action={<ButtonsTask handleSetTasks={this.setTasks} />}
        />
        {isModalOpen && (
          <Modal title={MODALTITLE_KEYS.createTask} isModalOpen={isModalOpen} handleToggleModal={this.toggleModal}>
            <CreateTaskModal users={users} handleToggleModal={this.toggleModal} handleSetTasks={this.setTasks} />
          </Modal>
        )}
      </>
    );
  }
}
