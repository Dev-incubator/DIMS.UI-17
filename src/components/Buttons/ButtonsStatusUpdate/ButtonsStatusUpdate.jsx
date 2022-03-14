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
  }

  componentDidMount() {
    const { status } = this.props;
    this.setState({ status });
  }

  changeStatus = async (newStatus) => {
    const { taskId, userId, updateState } = this.props;
    const updateStatuses = await changeTaskStatus(taskId, userId, newStatus);
    this.setState({ status: newStatus });
    updateState(updateStatuses, taskId);
  };

  render() {
    const { status } = this.state;

    return (
      <>
        {status === STATUS_KEYS.active ? (
          <Button
            title={BUTTONS_NAMES.success}
            stylingType={BUTTONS_TYPES.typeSave}
            onClick={() => {
              this.changeStatus(BUTTONS_NAMES.success);
            }}
          />
        ) : (
          <Button
            title={BUTTONS_NAMES.active}
            stylingType={BUTTONS_TYPES.typePrimary}
            onClick={() => {
              this.changeStatus(BUTTONS_NAMES.active);
            }}
          />
        )}

        <Button
          title={BUTTONS_NAMES.fail}
          stylingType={BUTTONS_TYPES.typeDelete}
          onClick={() => {
            this.changeStatus(BUTTONS_NAMES.fail);
          }}
        />
      </>
    );
  }
}

ButtonsStatusUpdate.propTypes = {
  taskId: PropTypes.string,
  userId: PropTypes.string,
  status: PropTypes.string,
  updateState: PropTypes.func.isRequired,
};

ButtonsStatusUpdate.defaultProps = {
  taskId: '0',
  userId: '0',
  status: '',
};
