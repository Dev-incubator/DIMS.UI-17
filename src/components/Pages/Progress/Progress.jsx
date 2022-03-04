import React from 'react';
import PropTypes from 'prop-types';
import { getTraks } from '../../../mockApi/getData';
import { PageTitle } from '../../PageTitle/PageTitle';
import { Table } from '../../Table/Table';
import { TABLE_TITLES, BUTTONS_NAMES, TITLES_PAGES } from '../../../shared/constants';

export class Progress extends React.Component {
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
      await this.getProgress(id);
    }
  }

  async getProgress(id) {
    const progress = await getTraks(id);
    this.setState({ progress });
  }

  render() {
    const { progress } = this.state;

    return (
      <div>
        <PageTitle title={TITLES_PAGES.progress} buttonTitle={BUTTONS_NAMES.backToList} isBackButton={!!true} />
        <Table items={progress} titles={TABLE_TITLES.progress} />
      </div>
    );
  }
}

Progress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }),
  }).isRequired,
};
