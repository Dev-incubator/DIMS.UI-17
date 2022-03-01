import React from 'react';
import { createTask } from '../../../shared/helpers';
import { TITLES_PAGES, BUTTONS_NAMES, TABLE_TITLES, PAGES_KEYS } from '../../../shared/constants';
import { PageTitle } from '../../PageTitle/PageTitle';
import { Table } from '../../Table/Table';
import { getTracks } from '../../../mockApi/getData';

export class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: [],
    };
  }

  async componentDidMount() {
    const params = new URLSearchParams(document.location.search);
    const id = params.get('member');
    if (id) {
      this.getProgress(id);
    }
  }

  async getProgress(id) {
    const progress = await getTracks(id, PAGES_KEYS.progress);
    this.setState({ progress });
  }

  render() {
    const { progress } = this.state;

    return (
      <>
        <PageTitle title={TITLES_PAGES.track} buttonTitle={BUTTONS_NAMES.create} onClick={createTask} />
        <Table titles={TABLE_TITLES.track} items={progress} />
      </>
    );
  }
}
