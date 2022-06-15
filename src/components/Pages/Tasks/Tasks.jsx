import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';
import { getUserTasksThunk, updateTaskStatusThunk } from '../../../store/actionCreators/tasksActionCreators';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES, BUTTONS_TYPES } from '../../../shared/constants';
import { PageTitle } from '../../PageTitle/PageTitle';
import { ButtonsStatusUpdate } from '../../Buttons/ButtonsStatusUpdate/ButtonsStatusUpdate';
import { Table } from '../../Table/Table';
import { TasksTableRow } from '../../Table/TasksTableRow';
import { Loader } from '../../Common/Loader/Loader';

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
    const { getUserTasks, match } = this.props;
    const {
      params: { id },
    } = match;
    this.setState({ userId: id });
    await getUserTasks(id);
  }

  changeStatusHandler = async (newStatus, taskId, userId) => {
    const { updateStatuses } = this.props;
    await updateStatuses(taskId, userId, newStatus);
  };

  render() {
    const { userId } = this.state;
    const { history, isFetching, tasks } = this.props;
    const items = tasks.map((item, index) => {
      const succesStatusHandler = () => {
        this.succesStatusHandler(item.taskId, userId);
      };
      const activeStatusHandler = () => {
        this.activeStatusHandler(item.taskId, userId);
      };
      const failStatusHandler = () => {
        this.failStatusHandler(item.taskId, userId);
      };

      return (
        <TasksTableRow
          key={item.name + index.toString()}
          index={index + 1}
          name={item.name}
          startDate={item.startDate}
          deadlineDate={item.deadlineDate}
          status={item.status}
          actions={
            <ButtonsStatusUpdate
              userId={userId}
              status={item.status}
              taskId={item.taskId}
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

        <Table title={TABLE_TITLES.currentTasks} items={items} bordered={false} striped={false} hover={false} />
        {isFetching && <Loader />}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.items.tasks,
    isFetching: state.loading.isFetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getUserTasks: getUserTasksThunk,
      updateStatuses: updateTaskStatusThunk,
    },
    dispatch,
  );
};

Tasks.propTypes = {
  getUserTasks: propTypes.func.isRequired,
  updateStatuses: propTypes.func.isRequired,
  tasks: propTypes.arrayOf(propTypes.object).isRequired,
  match: propTypes.shape({ params: propTypes.shape({ id: propTypes.string }) }).isRequired,
  history: propTypes.oneOfType([propTypes.func, propTypes.object, propTypes.number]).isRequired,
  isFetching: propTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
