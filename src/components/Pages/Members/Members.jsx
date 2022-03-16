import React from 'react';
import { PageTitle } from '../../PageTitle/PageTitle';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES, LINKPATH_KEYS, MODALTITLE_KEYS } from '../../../shared/constants';
import { TableWithActions } from '../../Table/TableWithActions';
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
    this.setUsersHandler(users);
  }

  setUsersHandler = (users) => {
    this.setState({ users });
  };

  toggleModalHandler = () => {
    this.setState((prevState) => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    const { users, isModalOpen } = this.state;

    return (
      <>
        <PageTitle title={TITLES_PAGES.members} buttonTitle={BUTTONS_NAMES.create} onClick={this.toggleModalHandler} />
        <TableWithActions
          titles={TABLE_TITLES.members}
          items={users}
          linkPath={LINKPATH_KEYS.track}
          action={<ButtonsAdminMemberPage setUsersHandler={this.setUsersHandler} />}
        />
        {isModalOpen && (
          <Modal
            title={MODALTITLE_KEYS.createMember}
            isModalOpen={isModalOpen}
            toggleModalHandler={this.toggleModalHandler}
          >
            <CreateMemberModal toggleModalHandler={this.toggleModalHandler} setUsersHandler={this.setUsersHandler} />
          </Modal>
        )}
      </>
    );
  }
}
