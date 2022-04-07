import React from 'react';
import PropTypes from 'prop-types';
import { TITLES_PAGES, TABLE_TITLES, LINKPATH_KEYS } from '../../../shared/constants';
import { PageTitle } from '../../PageTitle/PageTitle';
import { Table } from '../../Table/Table';
import { getMemberTasks } from '../../../services/tasks-services';
import { UserTasksTableRow } from '../../Table/UserTasksTableRow';

export class UserTasks extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  async componentDidMount() {
    const { userId } = this.props;
    const response = await getMemberTasks(userId);
    const tasks = response.map((item) => ({
      ...item,
      status: item.statuses.find((user) => user.id === userId).status,
    }));
    this.setState({ tasks });
  }

  render() {
    const { tasks } = this.state;
    const items = tasks.map((item, index) => {
      return (
        <UserTasksTableRow
          key={item.name + index.toString()}
          index={index}
          id={item.id}
          name={item.name}
          startDate={item.startDate}
          deadlineDate={item.deadlineDate}
          status={item.status}
          linkPath={LINKPATH_KEYS.tasks}
        />
      );
    });

    return (
      <>
        <PageTitle title={TITLES_PAGES.userTasks} isContainsButton={false} />
        <Table title={TABLE_TITLES.userTasks} items={items} />
      </>
    );
  }
}

UserTasks.propTypes = {
  userId: PropTypes.string.isRequired,
};
