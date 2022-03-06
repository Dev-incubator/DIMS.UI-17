import React from 'react';
import { Route } from 'react-router-dom';
import { getFakeUsers } from '../../../mockApi/getData';
import { PageTitle } from '../../PageTitle/PageTitle';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES, LINKPATH_KEYS } from '../../../shared/constants';
import { Table } from '../../Table/Table';
import { Modal } from '../../Common/Modal/Modal';
import { CreateMemberModal } from '../../Common/Modal/CreateMemberModal/CreateMemberModal';

export class Members extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      isActive: false,
    };
  }

  async componentDidMount() {
    const members = await getFakeUsers();
    this.setState({ members });
  }

  callModal = () => {
    this.setState((prevState) => ({ isActive: !prevState.isActive }));
  };

  render() {
    const { members, isActive } = this.state;

    return (
      <>
        <PageTitle title={TITLES_PAGES.members} buttonTitle={BUTTONS_NAMES.create} onClick={this.callModal} />
        <Table titles={TABLE_TITLES.members} items={members} linkPath={LINKPATH_KEYS.track} />
        <Route
          path='/members/popup'
          render={() => (
            <Modal isActive={isActive} callModal={this.callModal}>
              <CreateMemberModal />
            </Modal>
          )}
        />
      </>
    );
  }
}
