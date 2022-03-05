import React from 'react';
import PropTypes from 'prop-types';
import { createTask } from '../../../shared/helpers';
import { TITLES_PAGES, BUTTONS_NAMES, TABLE_TITLES, PAGES_KEYS } from '../../../shared/constants';
import { PageTitle } from '../../PageTitle/PageTitle';
import { Table } from '../../Table/Table';
import { getTracks } from '../../../mockApi/getData';

export class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    if (id) {
      this.getProgress(id);
    }
  }

  async getProgress(id) {
    const progress = await getTracks(id, PAGES_KEYS.track);
    this.setState({ progress });
  }

  render() {
    const { progress } = this.state;

    return (
      <>
        <PageTitle title={TITLES_PAGES.track} buttonTitle={BUTTONS_NAMES.create} onClick={createTask} />
        <Table titles={TABLE_TITLES.track} items={progress} />
      </>
    );
  }
}

Track.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }),
  }).isRequired,
};
