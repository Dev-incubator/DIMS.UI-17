import React from 'react';
import propTypes from 'prop-types';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES, BUTTONS_TYPES } from '../../../shared/constants';
import { getMemberTasks } from '../../../services/tasks-services';
import { PageTitle } from '../../PageTitle/PageTitle';
import { ButtonsStatusUpdate } from '../../Buttons/ButtonsStatusUpdate/ButtonsStatusUpdate';
import { TableCurrentTasks } from '../../Table/TableCurrentTasks';
import noop from '../../../shared/noop';
import { Error } from '../../Forms/Error/Error';
import { Modal } from '../../Common/Modal/Modal';

export class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const tasks = await getMemberTasks(id);
    if (tasks) {
      this.setState({ tasks });
    } else {
      this.toggleError();
    }
  }

  updateStateHandler = (newTaskStatus, taskId) => {
    this.setState((prevState) => {
      const tasks = prevState.tasks.map((item) => (item.id === taskId ? { ...item, statuses: newTaskStatus } : item));

      return { tasks };
    });
  };

  toggleError = () => {
    this.setState((prevState) => ({ ...prevState, error: !prevState.error }));
  };

  render() {
    const { tasks, error } = this.state;
    const {
      history,
      match: {
        params: { id },
      },
    } = this.props;

    return (
      <>
        <PageTitle
          title={TITLES_PAGES.currentTasks}
          buttonTitle={BUTTONS_NAMES.backToList}
          onClick={noop}
          stylingType={BUTTONS_TYPES.typeSecondary}
          history={history}
          isBackButton
        />
        <TableCurrentTasks
          titles={TABLE_TITLES.currentTasks}
          items={tasks}
          userId={id}
          action={
            <ButtonsStatusUpdate
              toggleError={this.toggleError}
              updateStateHandler={this.updateStateHandler}
              userId={id}
            />
          }
        />
        {error && (
          <Modal title='Error' isModalOpen={error} toggleModalHandler={this.toggleError}>
            <Error onClick={this.toggleError} />
          </Modal>
        )}
      </>
    );
  }
}

Tasks.propTypes = {
  match: propTypes.shape({ params: propTypes.shape({ id: propTypes.string }) }).isRequired,
  history: propTypes.shape({}).isRequired,
};
