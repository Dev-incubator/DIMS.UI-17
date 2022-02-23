import React from 'react';
import { getFakeCurrentTasks } from '../../../mockApi/getData';
import { PageTitle } from '../../PageTitle/PageTitle';
import { Table } from '../../Table/Table';
import { TABLE_TITLES, BUTTONS_NAMES, TITLES_PAGES, PAGES_KEYS } from '../../../shared/constants';
import { stepBack } from '../../../shared/helpers';

export class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: [],
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
    const progress = await getFakeCurrentTasks(id, PAGES_KEYS.progress);
    this.setState({ progress });
  }

  render() {
    const { progress } = this.state;

    return (
      <div>
        <PageTitle title={TITLES_PAGES.progress} buttonTitle={BUTTONS_NAMES.backToList} onClick={stepBack} />
        <Table items={progress} titles={TABLE_TITLES.progress} />
      </div>
    );
  }
}
