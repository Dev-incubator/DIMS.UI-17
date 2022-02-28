import React from 'react';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES } from '../../../shared/constants';
import { PageTitle } from '../../PageTitle/PageTitle';
import { Table } from '../../Table/Table';
import { getMemberTasks } from '../../../mockApi/getData';
import { stepBack } from '../../../shared/helpers';

export class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(document.location.search);
    const id = params.get('member');
    if (id) {
      this.getProgress(id);
    }
  }

  async getProgress(id) {
    const tasks = await getMemberTasks(id);
    this.setState({ tasks });
  }

  render() {
    const { tasks } = this.state;

    return (
      <>
        <PageTitle title={TITLES_PAGES.currentTasks} buttonTitle={BUTTONS_NAMES.backToList} onClick={stepBack} />
        <Table titles={TABLE_TITLES.currentTasks} items={tasks} />
      </>
    );
  }
}
