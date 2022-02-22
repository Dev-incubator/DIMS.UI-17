import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import pageStyles from '../MemberPage.module.css';
import { BUTTON_VALUES } from '../../../scripts/libraries';

export function PageHeader({ text }) {
  return (
    <div className={pageStyles.header}>
      <div className={pageStyles.pageTitle}>{text}</div>
      <NavLink to='/users'>
        <button type='button' className={pageStyles.buttonBack}>
          {BUTTON_VALUES.backToList}
        </button>
      </NavLink>
    </div>
  );
}

PageHeader.propTypes = {
  text: PropTypes.string.isRequired,
};
