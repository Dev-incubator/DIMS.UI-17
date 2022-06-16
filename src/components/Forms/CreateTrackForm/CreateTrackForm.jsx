import React from 'react';
import propTypes from 'prop-types';
import { initialStateTrack } from '../../../shared/initialStates';
import { BUTTONS_TYPES, BUTTONS_NAMES, TRACK_FIELDS_KEYS } from '../../../shared/constants';
import { Button } from '../../Buttons/Button/Button';
import style from './CreateTrackForm.module.css';
import { validateFormField } from '../../../shared/helpers/validateFormField/validateFormField';
import { generateId } from '../../../shared/helpers/generateId/generateId';
import { FormField } from '../FormField/FormField';

export class CreateTrackForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = initialStateTrack;
  }

  componentDidMount() {
    const { userTasks, isEditMode, tracks, trackId } = this.props;
    if (isEditMode) {
      const trackData = tracks.find((track) => track.id === trackId);
      if (isEditMode) {
        this.setState({ ...trackData });
      }
    } else {
      const tasksNames = userTasks.map((task) => task.name) || [''];
      this.setState({ name: tasksNames[0] });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });

    this.setState((prevState) => {
      const { formErrors } = prevState;
      const { name: fildName, error } = validateFormField(name, value);
      const updatedErrors = formErrors.map((item) => (item.name === fildName ? { ...item, error } : item));

      return {
        ...prevState,
        [name]: value,
        formErrors: updatedErrors,
      };
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { userTasks, isEditMode, createTrackHandler, updatedTrackHandler } = this.props;
    const { name, formErrors, ...data } = this.state;
    const selectedTask = userTasks.find((task) => task.name === name);
    const errors = formErrors
      .map((item) => {
        const { name: fieldName, error } = validateFormField(item.name, data[item.name]);
        this.setState((prevState) => ({
          ...prevState,
          formErrors: prevState.formErrors.map((field) => (field.name === fieldName ? { ...field, error } : field)),
        }));

        return error;
      })
      .filter((error) => error);
    if (isEditMode && !errors.length) {
      await updatedTrackHandler({ name, ...data });
    } else if (!errors.length) {
      const id = generateId();
      await createTrackHandler(selectedTask.taskId, { ...data, name, id });
    }
  };

  render() {
    const { toggleModalHandler, isReadonly, userTasks } = this.props;
    const { formErrors } = this.state;
    const options = userTasks.map((task) => task.name);

    return (
      <form className={style.wrapper}>
        <div className={style.section__fields}>
          {TRACK_FIELDS_KEYS.map((item) => {
            const { name, title, type, required } = item;
            const { state } = this;
            const { error } = formErrors.find((field) => field.name === name) || '';

            return (
              <FormField
                key={item.name}
                onChange={this.handleChange}
                value={state[name]}
                name={name}
                options={options}
                type={type}
                title={title}
                required={required}
                isReadonly={isReadonly}
                errors={error}
              />
            );
          })}
        </div>
        <div className={style.section__buttons}>
          {!isReadonly && <Button onClick={this.handleSubmit}> Save </Button>}

          <Button onClick={toggleModalHandler} stylingType={BUTTONS_TYPES.typeSecondary}>
            {BUTTONS_NAMES.backToList}
          </Button>
        </div>
      </form>
    );
  }
}

CreateTrackForm.propTypes = {
  createTrackHandler: propTypes.func.isRequired,
  updatedTrackHandler: propTypes.func.isRequired,
  toggleModalHandler: propTypes.func.isRequired,
  isReadonly: propTypes.oneOfType([propTypes.bool, propTypes.string]),
  userTasks: propTypes.arrayOf(propTypes.oneOfType([propTypes.string, propTypes.object, propTypes.array])),
  isEditMode: propTypes.oneOfType([propTypes.bool, propTypes.string]),
  tracks: propTypes.arrayOf(propTypes.object),
  trackId: propTypes.oneOfType([propTypes.object, propTypes.string]),
};

CreateTrackForm.defaultProps = {
  isReadonly: false,
  userTasks: [],
  isEditMode: false,
  trackId: null,
  tracks: [],
};
