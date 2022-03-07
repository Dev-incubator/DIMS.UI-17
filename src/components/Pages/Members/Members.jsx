import React from 'react';
import propTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { getFakeUsers } from '../../../mockApi/getData';
import { PageTitle } from '../../PageTitle/PageTitle';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES, LINKPATH_KEYS, MODALTITLE_KEYS } from '../../../shared/constants';
import { Table } from '../../Table/Table';
import { Modal } from '../../Common/Modal/Modal';
import { CreateMemberModal } from '../../Common/Modal/CreateMemberModal/CreateMemberModal';

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
      <>
        <PageTitle title={TITLES_PAGES.members} buttonTitle={BUTTONS_NAMES.create} popupPath='popup/createMember/' />
        <Table titles={TABLE_TITLES.members} items={members} linkPath={LINKPATH_KEYS.track} />
        <Route
          path='/members/popup/createMember/'
          render={() => (
            <Modal title={MODALTITLE_KEYS.createMember}>
              <CreateMemberModal />
            </Modal>
          )}
        />
      </>
    );
  }
}

Members.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({}),
  }).isRequired,
};
