import React from 'react';
import propTypes from 'prop-types';
import { initialStateCreatMember } from '../../../../shared/store';
import { BUTTONS_TYPES, BUTTONS_NAMES, USER_FIELDS_KEYS } from '../../../../shared/constants';
import { Button } from '../../../Buttons/Button/Button';
import { ModalRow } from '../ModalRow/ModalRow';
import style from './CreateMemberModal.module.css';
import { createUser } from '../../../../services/auth-services';
import { getAllUsers } from '../../../../services/users-services ';
import noop from '../../../../shared/noop';

export class CreateMemberModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialStateCreatMember;
  }

  async componentDidMount() {
    const { userData } = this.props;
    console.log(userData);
    this.setState(userData);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { handleSetUsers, handleToggleModal } = this.props;
    const isRegistered = await createUser(this.state);
    if (isRegistered) {
      handleToggleModal();
      const updatedUsers = await getAllUsers();
      handleSetUsers(updatedUsers);
    }
  };

  render() {
    const { handleToggleModal, isReadOnlyMode } = this.props;

    return (
      <form onSubmit={this.handleSubmit} className={style.wrapper}>
        <div className={style.section__fields}>
          {USER_FIELDS_KEYS.map((item) => {
            const { name, title, type, options, required } = item;
            const { state } = this;

            return (
              <ModalRow
                key={item.name}
                onChange={this.handleChange}
                value={state[name]}
                name={name}
                options={options}
                type={type}
                title={title}
                required={required}
                isReadOnlyMode={isReadOnlyMode}
              />
            );
          })}
        </div>
        <div className={style.section__buttons}>
          {!isReadOnlyMode && <input type='submit' value='Save' />}

          <Button
            onClick={handleToggleModal}
            stylingType={BUTTONS_TYPES.typeSecondary}
            title={BUTTONS_NAMES.backToList}
          />
        </div>
      </form>
    );
  }
}

CreateMemberModal.propTypes = {
  handleSetUsers: propTypes.func,
  handleToggleModal: propTypes.func.isRequired,
  userData: propTypes.shape({}),
  isReadOnlyMode: propTypes.bool.isRequired,
};

CreateMemberModal.defaultProps = {
  userData: {},
  handleSetUsers: noop,
};
