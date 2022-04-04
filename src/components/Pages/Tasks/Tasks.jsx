import React from 'react';
import propTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES, BUTTONS_TYPES } from '../../../shared/constants';
import { changeTaskStatus, getMemberTasks } from '../../../services/tasks-services';
import { PageTitle } from '../../PageTitle/PageTitle';
import { ButtonsStatusUpdate } from '../../Buttons/ButtonsStatusUpdate/ButtonsStatusUpdate';
import { TableHead } from '../../Table/TableHead';
import { TasksTableRow } from '../../Table/TasksTableRow';
import { compareObjects } from '../../../shared/helpers';

export class Tasks extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      userId: null,
    };
    this.succesStatusHandler = this.changeStatusHandler.bind(this, BUTTONS_NAMES.success);
    this.activeStatusHandler = this.changeStatusHandler.bind(this, BUTTONS_NAMES.active);
    this.failStatusHandler = this.changeStatusHandler.bind(this, BUTTONS_NAMES.fail);
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.setState({ userId: id });
    await this.getTasks(id);
  }

  componentDidUpdate(prevProps, prevState) {
    const { tasks, userId } = this.state;
    if (!compareObjects(prevState.tasks, tasks)) {
      this.getTasks(userId);
    }
  }

  async getTasks(userId) {
    const tasks = await getMemberTasks(userId);
    this.setState({ tasks });
  }

  changeStatusHandler = async (newStatus, taskId, userId) => {
    const updatedStatuses = await changeTaskStatus(taskId, userId, newStatus);
    this.setState((prevState) => {
      const tasks = prevState.tasks.map((item) => (item.id === taskId ? { ...item, statuses: updatedStatuses } : item));

      return { tasks };
    });
  };

  render() {
    const { tasks, userId } = this.state;
    const { history } = this.props;

    return (
      <>
        <PageTitle
          title={TITLES_PAGES.currentTasks}
          buttonTitle={BUTTONS_NAMES.backToList}
          stylingType={BUTTONS_TYPES.typeSecondary}
          history={history}
          isBackButton
        />

        <Table striped bordered hover>
          <TableHead items={TABLE_TITLES.currentTasks} />

          {tasks.map((item, index) => {
            const statusIndex = item.statuses.findIndex((elem) => elem.id === userId);

            const succesStatusHandler = () => {
              this.succesStatusHandler(item.id, userId);
            };
            const activeStatusHandler = () => {
              this.activeStatusHandler(item.id, userId);
            };
            const failStatusHandler = () => {
              this.failStatusHandler(item.id, userId);
            };

            return (
              <TasksTableRow
                key={item.name + index.toString()}
                index={index}
                name={item.name}
                startDate={item.startDate}
                deadlineDate={item.deadlineDate}
                status={item.statuses[statusIndex].status}
                actions={
                  <ButtonsStatusUpdate
                    userId={userId}
                    status={item.statuses[statusIndex].status}
                    taskId={item.id}
                    succesStatusHandler={succesStatusHandler}
                    activeStatusHandler={activeStatusHandler}
                    failStatusHandler={failStatusHandler}
                  />
                }
              />
            );
          })}
        </Table>
      </>
    );
  }
}

Tasks.propTypes = {
  match: propTypes.shape({ params: propTypes.shape({ id: propTypes.string }) }).isRequired,
  history: propTypes.shape({}).isRequired,
};
