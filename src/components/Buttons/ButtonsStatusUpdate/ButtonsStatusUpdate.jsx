import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button/Button';
import { BUTTONS_NAMES, BUTTONS_TYPES, STATUS_KEYS } from '../../../shared/constants';
import { changeTaskStatus } from '../../../services/tasks-services';

export class ButtonsStatusUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
    };
    this.succesStatusHandler = this.changeStatusHandler.bind(this, BUTTONS_NAMES.success);
    this.activeStatusHandler = this.changeStatusHandler.bind(this, BUTTONS_NAMES.active);
    this.failStatusHandler = this.changeStatusHandler.bind(this, BUTTONS_NAMES.fail);
  }

  componentDidMount() {
    const { status } = this.props;
    this.setState({ status });
  }

  changeStatusHandler = async (newStatus) => {
    const { taskId, userId, updateStateHandler, toggleError } = this.props;
    const updatedStatuses = await changeTaskStatus(taskId, userId, newStatus);
    if (updatedStatuses) {
      this.setState({ status: newStatus });
      updateStateHandler(updatedStatuses, taskId);
    } else {
      toggleError();
    }
  };

  render() {
    const { status } = this.state;

    return (
      <>
        {status === STATUS_KEYS.active ? (
          <Button
            title={BUTTONS_NAMES.success}
            stylingType={BUTTONS_TYPES.typeSave}
            onClick={this.succesStatusHandler}
          />
        ) : (
          <Button
            title={BUTTONS_NAMES.active}
            stylingType={BUTTONS_TYPES.typePrimary}
            onClick={this.activeStatusHandler}
          />
        )}

        <Button title={BUTTONS_NAMES.fail} stylingType={BUTTONS_TYPES.typeDelete} onClick={this.failStatusHandler} />
      </>
    );
  }
}

ButtonsStatusUpdate.propTypes = {
  toggleError: PropTypes.func.isRequired,
  taskId: PropTypes.string,
  userId: PropTypes.string,
  status: PropTypes.string,
  updateStateHandler: PropTypes.func.isRequired,
};

ButtonsStatusUpdate.defaultProps = {
  taskId: '0',
  userId: '0',
  status: '',
};
