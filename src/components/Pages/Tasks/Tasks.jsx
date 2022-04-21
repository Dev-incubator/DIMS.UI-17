import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';
import {
  getUserTasksThunk,
  resetUserTasks,
  updateTaskStatusThunk,
} from '../../../store/actionCreators/tasksActionCreators';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES, BUTTONS_TYPES } from '../../../shared/constants';
import { PageTitle } from '../../PageTitle/PageTitle';
import { ButtonsStatusUpdate } from '../../Buttons/ButtonsStatusUpdate/ButtonsStatusUpdate';
import { Table } from '../../Table/Table';
import { TasksTableRow } from '../../Table/TasksTableRow';

class Tasks extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
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
    this.getUserTasks(id);
    this.setState({ userId: id });
  }

  componentWillUnmount() {
    const { resetTasks } = this.props;
    resetTasks();
  }

  getUserTasks(userId) {
    const { getUserTasks } = this.props;
    getUserTasks(userId);
  }

  changeStatusHandler = async (newStatus, taskId, userId) => {
    const { updateStatuses } = this.props;
    await updateStatuses(taskId, userId, newStatus);
  };

  render() {
    const { userId } = this.state;
    const { history, userTasks } = this.props;
    const items = userTasks.map((item, index) => {
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
          status={item.status}
          actions={
            <ButtonsStatusUpdate
              userId={userId}
              status={item.status}
              taskId={item.id}
              succesStatusHandler={succesStatusHandler}
              activeStatusHandler={activeStatusHandler}
              failStatusHandler={failStatusHandler}
            />
          }
        />
      );
    });

    return (
      <>
        <PageTitle
          title={TITLES_PAGES.currentTasks}
          buttonTitle={BUTTONS_NAMES.backToList}
          stylingType={BUTTONS_TYPES.typeSecondary}
          history={history}
          isBackButton
        />

        <Table title={TABLE_TITLES.currentTasks} items={items} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userTasks: state.tasks.userTasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getUserTasks: getUserTasksThunk,
      updateStatuses: updateTaskStatusThunk,
      resetTasks: resetUserTasks,
    },
    dispatch,
  );
};

Tasks.propTypes = {
  getUserTasks: propTypes.func.isRequired,
  updateStatuses: propTypes.func.isRequired,
  resetTasks: propTypes.func.isRequired,
  userTasks: propTypes.arrayOf(propTypes.object).isRequired,
  match: propTypes.shape({ params: propTypes.shape({ id: propTypes.string }) }).isRequired,
  history: propTypes.oneOfType([propTypes.func, propTypes.object, propTypes.number]).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
