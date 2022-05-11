import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserTasksThunk } from '../../../store/actionCreators/tasksActionCreators';
import { TITLES_PAGES, TABLE_TITLES, LINKPATH_KEYS } from '../../../shared/constants';
import { PageTitle } from '../../PageTitle/PageTitle';
import { Table } from '../../Table/Table';
import { UserTasksTableRow } from '../../Table/UserTasksTableRow';
import { AuthContext } from '../../../Hooks/useAuth';
import { Loader } from '../../Common/Loader/Loader';

class UserTasks extends React.PureComponent {
  async componentDidMount() {
    const { userId } = this.context;
    const { getUserTasks } = this.props;
    await getUserTasks(userId);
  }

  render() {
    const { tasks, isFetching } = this.props;
    const items = tasks.map((item, index) => {
      return (
        <UserTasksTableRow
          key={item.name + index.toString()}
          index={index}
          id={item.taskId}
          name={item.name}
          startDate={item.startDate}
          deadlineDate={item.deadlineDate}
          status={item.status}
          linkPath={LINKPATH_KEYS.tasks}
        />
      );
    });

    return isFetching ? (
      <Loader />
    ) : (
      <>
        <PageTitle title={TITLES_PAGES.userTasks} isContainsButton={false} />
        <Table title={TABLE_TITLES.userTasks} items={items} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.tasks,
    isFetching: state.loading.isFetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getUserTasks: getUserTasksThunk,
    },
    dispatch,
  );
};

UserTasks.propTypes = {
  tasks: propTypes.arrayOf(propTypes.object).isRequired,
  getUserTasks: propTypes.func.isRequired,
  isFetching: propTypes.bool.isRequired,
};

UserTasks.contextType = AuthContext;

export default connect(mapStateToProps, mapDispatchToProps)(UserTasks);
