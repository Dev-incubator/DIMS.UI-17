import React from 'react';
import propTypes from 'prop-types';
import { initialStateCreatMember } from '../../../../shared/initialStates';
import { BUTTONS_TYPES, BUTTONS_NAMES, USER_FIELDS_KEYS } from '../../../../shared/constants';
import { Button } from '../../../Buttons/Button/Button';
import { ModalRow } from '../ModalRow/ModalRow';
import style from './CreateMemberModal.module.css';
import { createUser } from '../../../../services/auth-services';
import { editUser, getAllUsers } from '../../../../services/users-services ';
import noop from '../../../../shared/noop';
import { validateFormCreateUser } from '../../../../shared/helpers';

export class CreateMemberModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialStateCreatMember;
  }

  async componentDidMount() {
    const { userData } = this.props;
    this.setState(userData);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const { password } = this.state;
    this.setState({ [name]: value });

    const { name: fildName, error } = validateFormCreateUser(name, value, password);
    console.log(fildName, error);
    this.setState((prevState) => {
      return { ...prevState, formErrors: { ...prevState.formErrors, [fildName]: error } };
    });
    console.log(this.state);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { setUsersHandler, toggleModalHandler, isEditMode, id } = this.props;
    const { formErrors, ...data } = this.state;
    const { password } = this.state;
    console.log(formErrors);

    Object.entries(formErrors).forEach(([name, value]) => {
      const { name: fildName, error } = validateFormCreateUser(name, value, password);
      this.setState((prevState) => {
        return { ...prevState, formErrors: { ...prevState.formErrors, [fildName]: error } };
      });
    });

    const isAdded = isEditMode ? await editUser(id, data) : await createUser(data);
    if (isAdded) {
      toggleModalHandler();
      const updatedUsers = await getAllUsers();
      setUsersHandler(updatedUsers);
    }
  };

  render() {
    const { toggleModalHandler, isReadOnlyMode } = this.props;
    const { formErrors } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={style.wrapper}>
        <div className={style.section__fields}>
          {USER_FIELDS_KEYS.map((item) => {
            const { name, title, type, options } = item;
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
                isReadOnlyMode={isReadOnlyMode}
                errors={formErrors[name]}
              />
            );
          })}
        </div>
        <div className={style.section__buttons}>
          {!isReadOnlyMode && <input type='submit' value='Save' />}

          <Button
            onClick={toggleModalHandler}
            stylingType={BUTTONS_TYPES.typeSecondary}
            title={BUTTONS_NAMES.backToList}
          />
        </div>
      </form>
    );
  }
}

CreateMemberModal.propTypes = {
  setUsersHandler: propTypes.func,
  toggleModalHandler: propTypes.func.isRequired,
  userData: propTypes.shape({}),
  isReadOnlyMode: propTypes.oneOfType([propTypes.bool, propTypes.string]),
  id: propTypes.string,
  isEditMode: propTypes.bool,
};

CreateMemberModal.defaultProps = {
  userData: {},
  setUsersHandler: noop,
  isReadOnlyMode: false,
  id: '0',
  isEditMode: false,
};
