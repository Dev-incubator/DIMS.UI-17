import React from 'react';
import PropTypes from 'prop-types';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES } from '../../../shared/constants';
import { PageTitle } from '../../PageTitle/PageTitle';
import { Table } from '../../Table/Table';
import { getMemberTasks } from '../../../mockApi/getData';

export class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const id = match.params;
    if (id) {
      await this.getProgress(id);
    }
  }

  async getProgress(id) {
    const tasks = await getMemberTasks(id);
    this.setState({ tasks });
  }

  render() {
    const { tasks } = this.state;

    return (
      <div>
        <PageTitle title={TITLES_PAGES.currentTasks} buttonTitle={BUTTONS_NAMES.backToList} isBackButton={!!true} />
        <Table titles={TABLE_TITLES.currentTasks} items={tasks} />
      </div>
    );
  }
}

Tasks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }),
  }).isRequired,
};
