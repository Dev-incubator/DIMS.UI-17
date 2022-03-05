import React from 'react';
import { getFakeUsers } from '../../../mockApi/getData';
import { PageTitle } from '../../PageTitle/PageTitle';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES, LINKPATH_KEYS } from '../../../shared/constants';
import { Table } from '../../Table/Table';

export class Members extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
    };
  }

  async componentDidMount() {
    const members = await getFakeUsers();
    this.setState({ members });
  }

  render() {
    const { members } = this.state;

    return (
      <div>
        <PageTitle title={TITLES_PAGES.members} buttonTitle={BUTTONS_NAMES.create} />
        <Table titles={TABLE_TITLES.members} items={members} linkPath={LINKPATH_KEYS.track} />
      </div>
    );
  }
}
