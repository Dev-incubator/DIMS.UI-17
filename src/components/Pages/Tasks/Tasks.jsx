import React from 'react';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES } from '../../../shared/constants';
import { PageTitle } from '../../PageTitle/PageTitle';
import { Table } from '../../Table/Table';
import { getMemberTasks, getAllFakeTasks } from '../../../mockApi/getData';
import { stepBack, createTask } from '../../../shared/helpers';

export class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      pageTitle: null,
      buttonTitle: null,
      buttonClick: null,
    };
  }

  async componentDidMount() {
    const params = new URLSearchParams(document.location.search);
    const id = params.get('member');
    if (id) {
      this.getProgress(id);
      this.setState({
        pageTitle: TITLES_PAGES.currentTasks,
        buttonTitle: BUTTONS_NAMES.backToList,
        buttonClick: stepBack,
      });
    } else {
      const tasks = await getAllFakeTasks();
      this.setState({
        pageTitle: TITLES_PAGES.allTasks,
        tasks,
        buttonTitle: BUTTONS_NAMES.create,
        buttonClick: createTask,
      });
    }
  }

  async getProgress(id) {
    const tasks = await getMemberTasks(id);
    this.setState({ tasks });
  }

  render() {
    const { tasks, pageTitle, buttonTitle, buttonClick } = this.state;

    return (
      <>
        <PageTitle title={pageTitle} buttonTitle={buttonTitle} onClick={buttonClick} />
        <Table titles={TABLE_TITLES.currentTasks} items={tasks} />
      </>
    );
  }
}
