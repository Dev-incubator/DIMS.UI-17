import React from 'react';
import { initialStateCreatMember } from '../../../../shared/store';
import { BUTTONS_TYPES, BUTTONS_NAMES, USER_FIELDS_KEYS } from '../../../../shared/constants';
import { Button } from '../../../Buttons/Button/Button';
import { ModalRow } from '../ModalRow/ModalRow';
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
    return (
      <form onSubmit={this.handleSubmit} className={style.wrapper}>
        <div className={style.section__fields}>
          {USER_FIELDS_KEYS.map((item) => {
            const { name, title, type, options } = item;
            const { ...state } = this.state;

            return (
              <ModalRow
                key={item.name}
                onChange={this.handleChange}
                value={state[name]}
                name={name}
                options={options}
                type={type}
                title={title}
              />
            );
          })}
        </div>
        <div className={style.section__buttons}>
          <Button onClick={this.handleCreateUser} />
          <Button isBackButton stylingType={BUTTONS_TYPES.typeSecondary} title={BUTTONS_NAMES.backToList} />
        </div>
      </form>
    );
  }
}
