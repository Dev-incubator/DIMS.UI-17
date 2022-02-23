import React from 'react';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES, PAGES_KEYS } from '../../../shared/constants';
import { PageTitle } from '../../PageTitle/PageTitle';
import { Table } from '../../Table/Table';
import { getFakeCurrentTasks } from '../../../mockApi/getData';
import { stepBack } from '../../../shared/helpers';
import style from './Tasks.module.css';

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
    const tasks = await getFakeCurrentTasks(id, PAGES_KEYS.tasks);
    this.setState({ tasks });
  }

  render() {
    const { tasks } = this.state;
    return (
      <div className={style.admin}>
        <PageTitle title={TITLES_PAGES.currentTasks} buttonTitle={BUTTONS_NAMES.backToList} onClick={stepBack} />
        <Table titles={TABLE_TITLES.currentTasks} items={tasks} />
      </div>
    );
  }
}
