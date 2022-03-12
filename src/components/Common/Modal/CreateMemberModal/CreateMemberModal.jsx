import React from 'react';
import propTypes from 'prop-types';
import { initialStateCreatMember } from '../../../../shared/store';
import { BUTTONS_TYPES, BUTTONS_NAMES, USER_FIELDS_KEYS } from '../../../../shared/constants';
import { Button } from '../../../Buttons/Button/Button';
import { ModalRow } from '../ModalRow/ModalRow';
import style from './CreateMemberModal.module.css';
import { createUser } from '../../../../services/auth-services';
import { getAllUsers } from '../../../../services/users-services ';

export class CreateMemberModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialStateCreatMember;
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { handleSetUsers } = this.props;
    const isRegistered = await createUser(this.state);
    if (isRegistered) {
      const {
        params: { history },
      } = this.props;
      history.goBack();
      const updatedUsers = await getAllUsers();
      handleSetUsers(updatedUsers);
    }
  };

  render() {
    const { handleToggleModal } = this.props;

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
              />
            );
          })}
        </div>
        <div className={style.section__buttons}>
          <input type='submit' value='Save' />
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
  params: propTypes.shape({
    history: propTypes.shape({ goBack: propTypes.func.isRequired }),
  }).isRequired,
  handleSetUsers: propTypes.func.isRequired,
  handleToggleModal: propTypes.func.isRequired,
};
