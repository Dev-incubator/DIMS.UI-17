import React from 'react';
import { initialStateCreatMember } from '../../../../shared/store';
import { BUTTONS_TYPES, BUTTONS_NAMES, DIRECTIONS_KEYS, SEX_KEYS, USER_ROLES } from '../../../../shared/constants';
import { Button } from '../../../Buttons/Button/Button';
import { ModalRow } from '../ModalRow/ModalRow';
import style from './CreateMemberModal.module.css';
import { createUser } from '../../../../services/users-services';

export class CreateMemberModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialStateCreatMember;
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name } = this.state;
    console.log(name);
  };

  handleCreateUser = () => {
    createUser(this.state);
  };

  render() {
    const {
      name,
      lastName,
      email,
      direction,
      sex,
      role,
      password,
      confirmPassword,
      birthDate,
      address,
      phone,
      skype,
      startDate,
      education,
      universityAverageAcore,
      mathScore,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={style.wrapper}>
        <div className={style.section}>
          <ModalRow onChange={this.handleChange} value={name} name='name' title='Name:' />
          <ModalRow onChange={this.handleChange} value={lastName} name='lastName' title='Last name:' />
          <ModalRow onChange={this.handleChange} value={email} name='email' title='Email:' />
          <ModalRow
            onChange={this.handleChange}
            value={direction}
            type='select'
            name='direction'
            title='Direction:'
            options={DIRECTIONS_KEYS}
          />
          <ModalRow onChange={this.handleChange} value={sex} type='select' name='sex' title='Sex:' options={SEX_KEYS} />
          <ModalRow
            onChange={this.handleChange}
            value={role}
            type='select'
            name='role'
            title='Role:'
            options={USER_ROLES}
          />
          <ModalRow onChange={this.handleChange} value={password} name='password' title='Password:' />
          <ModalRow
            onChange={this.handleChange}
            value={confirmPassword}
            name='confirmPassword'
            title='Confirm password:'
          />
        </div>
        <div className={style.section}>
          <ModalRow
            onChange={this.handleChange}
            value={birthDate}
            type='date'
            name='birthDate'
            title='Date of Birth:'
          />
          <ModalRow onChange={this.handleChange} value={address} name='address' title='Address:' />
          <ModalRow onChange={this.handleChange} value={phone} name='phone' title='Mobile phone:' />
          <ModalRow onChange={this.handleChange} value={skype} name='skype' title='Skype:' />
          <ModalRow onChange={this.handleChange} value={startDate} type='date' name='startDate' title='Start date:' />
          <ModalRow onChange={this.handleChange} value={education} name='education' title='Education:' />
          <ModalRow
            onChange={this.handleChange}
            value={universityAverageAcore}
            name='universityAverageAcore'
            title='University average score:'
          />
          <ModalRow onChange={this.handleChange} value={mathScore} name='mathScore' title='Math score:' />
        </div>
        <div className={style.section__buttons}>
          <Button onClick={this.handleCreateUser} />
          <Button isBackButton stylingType={BUTTONS_TYPES.typeSecondary} title={BUTTONS_NAMES.backToList} />
        </div>
      </form>
    );
  }
}
