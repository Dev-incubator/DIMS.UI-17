import React from 'react';
import propTypes from 'prop-types';
import { PageTitle } from '../../PageTitle/PageTitle';
import { Table } from '../../Table/Table';
import { TABLE_TITLES, BUTTONS_NAMES, TITLES_PAGES, BUTTONS_TYPES } from '../../../shared/constants';
import { getUserTracks } from '../../../services/tracks-services';

export class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: [],
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const progress = await getUserTracks(id);
    this.setState({ progress });
  }

  render() {
    const { progress } = this.state;
    const { history } = this.props;

    return (
      <div>
        <PageTitle
          title={TITLES_PAGES.progress}
          buttonTitle={BUTTONS_NAMES.backToList}
          stylingType={BUTTONS_TYPES.typeSecondary}
          history={history}
          isBackButton
        />
        <Table items={progress} titles={TABLE_TITLES.progress} />
      </div>
    );
  }
}

Progress.propTypes = {
  match: propTypes.shape({ params: propTypes.shape({ id: propTypes.string }) }).isRequired,
  history: propTypes.shape({}).isRequired,
};
