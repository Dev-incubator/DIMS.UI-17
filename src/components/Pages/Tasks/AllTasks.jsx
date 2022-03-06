import React from 'react';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES, PAGES_KEYS } from '../../../shared/constants';
import { PageTitle } from '../../PageTitle/PageTitle';
import { Table } from '../../Table/Table';
import { getAllFakeTasks } from '../../../mockApi/getData';
import { createTask } from '../../../shared/helpers';
import { initialStateTasks } from '../../../shared/store';

export class AllTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialStateTasks;
  }

  async componentDidMount() {
    const tasks = await getAllFakeTasks(PAGES_KEYS.tasks);
    this.setState({
      pageTitle: TITLES_PAGES.allTasks,
      tasks,
      buttonTitle: BUTTONS_NAMES.create,
      buttonClick: createTask,
      tableTitles: TABLE_TITLES.allTasks,
    });
  }

  render() {
    const { tasks, pageTitle, buttonTitle, buttonClick, tableTitles } = this.state;

    return (
      <>
        <PageTitle title={pageTitle} buttonTitle={buttonTitle} onClick={buttonClick} isBackButton />
        <Table titles={tableTitles} items={tasks} />
      </>
    );
  }
}
