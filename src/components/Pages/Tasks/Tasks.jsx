import React from 'react';
import propTypes from 'prop-types';
import { TABLE_TITLES, TITLES_PAGES, BUTTONS_NAMES, LINKPATH_KEYS } from '../../../shared/constants';
import { PageTitle } from '../../PageTitle/PageTitle';
import { Table } from '../../Table/Table';
import { getMemberTasks } from '../../../mockApi/getData';
import { initialStateTasks } from '../../../shared/store';

export class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialStateTasks;
  }

  async componentDidMount() {
    const {
      params: {
        match: {
          params: { id },
        },
      },
    } = this.props;
    if (id) {
      await this.getProgress(id);
      this.setState({
        pageTitle: TITLES_PAGES.currentTasks,
        buttonTitle: BUTTONS_NAMES.backToList,
        tableTitles: TABLE_TITLES.currentTasks,
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
        <PageTitle title={pageTitle} buttonTitle={buttonTitle} onClick={buttonClick} isBackButton />
        <Table titles={tableTitles} items={tasks} linkPath={LINKPATH_KEYS.track} />
      </>
    );
  }
}

Tasks.propTypes = {
  params: propTypes.shape({
    match: propTypes.shape({ params: propTypes.shape({ id: propTypes.string }) }),
  }).isRequired,
};
