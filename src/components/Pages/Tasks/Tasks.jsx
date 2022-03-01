import React from 'react';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES, PAGES_KEYS } from '../../../shared/constants';
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
      tableTitles: [null],
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
        tableTitles: TABLE_TITLES.currentTasks,
      });
    } else {
      const tasks = await getAllFakeTasks(PAGES_KEYS.tasks);
      this.setState({
        pageTitle: TITLES_PAGES.allTasks,
        tasks,
        buttonTitle: BUTTONS_NAMES.create,
        buttonClick: createTask,
        tableTitles: TABLE_TITLES.allTasks,
      });
    }
  }

  async getProgress(id) {
    const tasks = await getMemberTasks(id);
    this.setState({ tasks });
  }

  render() {
    const { tasks, pageTitle, buttonTitle, buttonClick, tableTitles } = this.state;

    return (
      <>
        <PageTitle title={pageTitle} buttonTitle={buttonTitle} onClick={buttonClick} />
        <Table titles={tableTitles} items={tasks} />
      </>
    );
  }
}
