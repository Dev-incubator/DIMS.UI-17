import React from 'react';
import { PageTitle } from '../../PageTitle/PageTitle';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES, LINKPATH_KEYS, MODALTITLE_KEYS } from '../../../shared/constants';
import { TableMembers } from '../../Table/TableMembers';
import { Modal } from '../../Common/Modal/Modal';
import { getAllUsers } from '../../../services/users-services ';
import { ButtonsAdminMemberPage } from '../../Buttons/ButtonsAdmin/ButtonsAdmin';
import { CreateMemberForm } from '../../Forms/CreateMemberForm/CreateMemberForm';

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
        <TableMembers
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
            <CreateMemberForm toggleModalHandler={this.toggleModalHandler} setUsersHandler={this.setUsersHandler} />
          </Modal>
        )}
      </>
    );
  }
}
