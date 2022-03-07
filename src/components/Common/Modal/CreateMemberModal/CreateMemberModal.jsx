import React from 'react';
import { initialStateCreatMember } from '../../../../shared/store';
import { BUTTONS_TYPES, BUTTONS_NAMES } from '../../../../shared/constants';
import { Button } from '../../../Buttons/Button/Button';
import style from './CreateMemberModal.module.css';

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
          <label className={style.section__item} htmlFor='name'>
            Name:
            <input onChange={this.handleChange} value={name} type='text' name='name' id='name' />
          </label>
          <label className={style.section__item} htmlFor='lastName'>
            Last name:
            <input onChange={this.handleChange} value={lastName} type='text' name='lastName' id='lastName' />
          </label>
          <label className={style.section__item} htmlFor='email'>
            Email:
            <input onChange={this.handleChange} value={email} type='text' name='email' id='email' />
          </label>
          <label className={style.section__item} htmlFor='direction'>
            Direction:
            <select name='direction' onChange={this.handleChange} value={direction}>
              <option value='java'>Java</option>
              <option value='frontend'>Frontend</option>
            </select>
          </label>
          <label className={style.section__item} htmlFor='sex'>
            Sex:
            <select name='sex' onChange={this.handleChange} value={sex}>
              <option value='male'>Male</option>
              <option value='woman'>Woman</option>
            </select>
          </label>
          <label className={style.section__item} htmlFor='role'>
            Role:
            <select name='role' onChange={this.handleChange} value={role}>
              <option value='member'>member</option>
              <option value='mentor'>Mentor</option>
              <option value='admin'>Admin</option>
            </select>
          </label>
          <label className={style.section__item} htmlFor='password'>
            Password:
            <input onChange={this.handleChange} value={password} type='text' name='password' id='password' />
          </label>
          <label className={style.section__item} htmlFor='confirmPassword'>
            Confirm password:
            <input
              onChange={this.handleChange}
              value={confirmPassword}
              type='text'
              name='confirmPassword'
              id='confirmPassword'
            />
          </label>
        </div>
        <div className={style.section}>
          <label className={style.section__item} htmlFor='birthDate'>
            Date of Birth:
            <input
              onChange={this.handleChange}
              value={birthDate}
              placeholder='yyyy-mm-dd'
              type='date'
              name='birthDate'
              id='birthDate'
            />
          </label>
          <label className={style.section__item} htmlFor='address'>
            Address:
            <input onChange={this.handleChange} value={address} type='text' name='address' id='address' />
          </label>
          <label className={style.section__item} htmlFor='phone'>
            Mobile phone:
            <input onChange={this.handleChange} value={phone} type='text' name='phone' id='phone' />
          </label>
          <label className={style.section__item} htmlFor='skype'>
            Skype:
            <input onChange={this.handleChange} value={skype} type='text' name='skype' id='skype' />
          </label>
          <label className={style.section__item} htmlFor='startDate'>
            Start date:
            <input
              onChange={this.handleChange}
              value={startDate}
              placeholder='yyyy-mm-dd'
              type='date'
              name='startDate'
              id='startDate'
            />
          </label>
          <label className={style.section__item} htmlFor='education'>
            Education:
            <input onChange={this.handleChange} value={education} type='text' name='education' id='education' />
          </label>
          <label className={style.section__item} htmlFor='universityAverageAcore'>
            University average score:
            <input
              onChange={this.handleChange}
              value={universityAverageAcore}
              type='text'
              name='universityAverageAcore'
              id='universityAverageAcore'
            />
          </label>
          <label className={style.section__item} htmlFor='mathScore'>
            Math score:
            <input onChange={this.handleChange} value={mathScore} type='text' name='mathScore' id='mathScore' />
          </label>
        </div>
        <div className={style.section__buttons}>
          <Button />
          <Button isBackButton stylingType={BUTTONS_TYPES.typeSecondary} title={BUTTONS_NAMES.backToList} />
        </div>
      </form>
    );
  }
}
