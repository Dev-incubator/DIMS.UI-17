import React from 'react';
import PropTypes from 'prop-types';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES, PAGES_KEYS } from '../../../shared/constants';
import { PageTitle } from '../../PageTitle/PageTitle';
import { Table } from '../../Table/Table';
import { getMemberTasks, getAllFakeTasks } from '../../../mockApi/getData';
import { createTask } from '../../../shared/helpers';

export class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      pageTitle: null,
      buttonTitle: null,
      buttonClick: null,
      tableTitles: [null],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const id = match.params;
    if (id) {
      await this.getProgress(id);
      this.setState({
        pageTitle: TITLES_PAGES.currentTasks,
        buttonTitle: BUTTONS_NAMES.backToList,
        tableTitles: TABLE_TITLES.currentTasks,
      });
    } else {
      const tasks = await getAllFakeTasks(PAGES_KEYS.tasks);
      this.setState({
        pageTitle: TITLES_PAGES.allTasks,
        tasks,
        buttonTitle: BUTTONS_NAMES.create,
        buttonClick: createTask,
        tableTitles: TABLE_TITLES.allTasks,
      });
    }
  }

  async getProgress(id) {
    const tasks = await getMemberTasks(id);
    this.setState({ tasks });
  }

  render() {
    const { tasks, pageTitle, buttonTitle, buttonClick, tableTitles } = this.state;

    return (
      <>
        <PageTitle title={pageTitle} buttonTitle={buttonTitle} onClick={buttonClick} isBackButton={!!true} />
        <Table titles={tableTitles} items={tasks} />
      </>
    );
  }
}

Tasks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }),
  }).isRequired,
};
