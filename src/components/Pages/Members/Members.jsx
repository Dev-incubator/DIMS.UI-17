import React from 'react';
import { PageTitle } from '../../PageTitle/PageTitle';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES, LINKPATH_KEYS, MODALTITLE_KEYS } from '../../../shared/constants';
import { TableMembers } from '../../Table/TableMembers';
import { Modal } from '../../Common/Modal/Modal';
import { CreateMemberModal } from '../../Common/Modal/CreateMemberModal/CreateMemberModal';
import { getAllUsers } from '../../../services/users-services ';
import { ButtonsAdminMemberPage } from '../../Buttons/ButtonsAdmin/ButtonsAdmin';

export class Members extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isModalOpen: false,
    };
  }

  async componentDidMount() {
    const users = await getAllUsers();
    this.setUsers(users);
  }

  setUsers = (users) => {
    this.setState({ users });
  };

  toggleModal = () => {
    this.setState((prevState) => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    const { users, isModalOpen } = this.state;

    return (
      <>
        <PageTitle title={TITLES_PAGES.members} buttonTitle={BUTTONS_NAMES.create} onClick={this.toggleModal} />
        <TableMembers
          titles={TABLE_TITLES.members}
          items={users}
          linkPath={LINKPATH_KEYS.track}
          action={<ButtonsAdminMemberPage handleSetUsers={this.setUsers} />}
        />
        {isModalOpen && (
          <Modal title={MODALTITLE_KEYS.createMember} isModalOpen={isModalOpen} handleToggleModal={this.toggleModal}>
            <CreateMemberModal handleToggleModal={this.toggleModal} handleSetUsers={this.setUsers} />
          </Modal>
        )}
      </>
    );
  }
}
