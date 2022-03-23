import React from 'react';
import PropTypes from 'prop-types';
import { TITLES_PAGES, TABLE_TITLES, LINKPATH_KEYS } from '../../../shared/constants';
import { PageTitle } from '../../PageTitle/PageTitle';
import { TableUserTasks } from '../../Table/TableUserTasks';
import { getMemberTasks } from '../../../services/tasks-services';

export class UserTasks extends React.Component {
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

    return (
      <>
        <PageTitle title={TITLES_PAGES.userTasks} isContainsButton={false} />
        <TableUserTasks titles={TABLE_TITLES.userTasks} items={tasks} linkPath={LINKPATH_KEYS.tasks} />
      </>
    );
  }
}

UserTasks.propTypes = {
  userId: PropTypes.string.isRequired,
};
