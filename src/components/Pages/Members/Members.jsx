import React from 'react';
import { getFakeUsers } from '../../../mockApi/getData';
import { getMemberItems } from '../../../shared/helpers';
import { PageTitle } from '../../PageTitle/PageTitle';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES } from '../../../shared/constants';
import { Table } from '../../Table/Table';
import style from './Members.module.css';

export class Members extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  async componentDidMount() {
    const users = await getFakeUsers();
    const items = await getMemberItems(users);
    this.setState({ items });
  }

  render() {
    const { items } = this.state;
    return (
      <div className={style.members}>
        <PageTitle title={TITLES_PAGES.members} buttonTitle={BUTTONS_NAMES.create} />
        <Table titles={TABLE_TITLES.members} items={items} />
      </div>
    );
  }
}
