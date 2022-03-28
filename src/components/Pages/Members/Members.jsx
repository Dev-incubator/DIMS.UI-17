import React from 'react';
import { PageTitle } from '../../PageTitle/PageTitle';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES, LINKPATH_KEYS, MODALTITLE_KEYS } from '../../../shared/constants';
import { TableMembers } from '../../Table/TableMembers';
import { MyModal } from '../../Common/Modal/Modal';
import { getAllUsers } from '../../../services/users-services ';
import { ButtonsAdminMemberPage } from '../../Buttons/ButtonsAdmin/ButtonsAdmin';
import { CreateMemberForm } from '../../Forms/CreateMemberForm/CreateMemberForm';
import { Error } from '../../Forms/Error/Error';

export class Members extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isModalOpen: false,
      error: false,
    };
  }

  async componentDidMount() {
    const users = await getAllUsers();

    if (users) {
      this.setUsersHandler(users);
    } else {
      this.toggleError();
    }
  }

  setUsersHandler = (users) => {
    this.setState({ users });
  };

  toggleModalHandler = () => {
    this.setState((prevState) => ({ ...prevState, isModalOpen: !prevState.isModalOpen }));
  };

  toggleError = () => {
    this.setState((prevState) => ({ ...prevState, error: !prevState.error }));
  };

  render() {
    const { users, isModalOpen, error } = this.state;

    return (
      <>
        <PageTitle title={TITLES_PAGES.members} buttonTitle={BUTTONS_NAMES.create} onClick={this.toggleModalHandler} />
        <TableMembers
          titles={TABLE_TITLES.members}
          items={users}
          linkPath={LINKPATH_KEYS.track}
          action={<ButtonsAdminMemberPage toggleError={this.toggleError} setUsersHandler={this.setUsersHandler} />}
        />
        <MyModal
          title={MODALTITLE_KEYS.createMember}
          isModalOpen={isModalOpen}
          toggleModalHandler={this.toggleModalHandler}
        >
          <CreateMemberForm toggleModalHandler={this.toggleModalHandler} setUsersHandler={this.setUsersHandler} />
        </MyModal>
        <MyModal title='Error' isModalOpen={error} toggleModalHandler={this.toggleError}>
          <Error onClick={this.toggleError} />
        </MyModal>
      </>
    );
  }
}
