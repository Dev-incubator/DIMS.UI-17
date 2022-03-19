import React from 'react';
import propTypes from 'prop-types';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES } from '../../../shared/constants';
import { getMemberTasks } from '../../../services/tasks-services';
import { PageTitle } from '../../PageTitle/PageTitle';
import { ButtonsStatusUpdate } from '../../Buttons/ButtonsStatusUpdate/ButtonsStatusUpdate';
import { TableCurrentTasks } from '../../Table/TableCurrentTasks';
import noop from '../../../shared/noop';

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
    if (id) {
      const tasks = await getMemberTasks(id);
      this.setState({ tasks });
    }
  }

  updateStateHandler = (newTaskStatus, taskId) => {
    this.setState((prevState) => {
      const tasks = prevState.tasks.map((item) => (item.id === taskId ? { ...item, statuses: newTaskStatus } : item));

      return { tasks };
    });
  };

  render() {
    const { tasks } = this.state;
    const {
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
          isBackButton
        />
        <TableCurrentTasks
          titles={TABLE_TITLES.currentTasks}
          items={tasks}
          userId={id}
          action={<ButtonsStatusUpdate updateStateHandler={this.updateStateHandler} userId={id} />}
        />
      </>
    );
  }
}

Tasks.propTypes = {
  match: propTypes.shape({ params: propTypes.shape({ id: propTypes.string }) }).isRequired,
};
