import React from 'react';
import propTypes from 'prop-types';
import { getTracks } from '../../../mockApi/getData';
import { PageTitle } from '../../PageTitle/PageTitle';
import { Table } from '../../Table/Table';
import { TABLE_TITLES, BUTTONS_NAMES, TITLES_PAGES } from '../../../shared/constants';

export class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: [],
    };
    this.isComponentMounted = false;
  }

  async componentDidMount() {
    const {
      params: {
        match: {
          params: { id },
        },
      },
    } = this.props;
    this.isComponentMounted = true;
    if (id) {
      await this.getProgress(id);
    }
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  async getProgress(id) {
    if (this.isComponentMounted) {
      const progress = await getTracks(id);
      this.setState({ progress });
    }
  }

  render() {
    const { progress } = this.state;

    return (
      <div>
        <PageTitle title={TITLES_PAGES.progress} buttonTitle={BUTTONS_NAMES.backToList} isBackButton />
        <Table items={progress} titles={TABLE_TITLES.progress} />
      </div>
    );
  }
}

Progress.propTypes = {
  params: propTypes.shape({
    match: propTypes.shape({ params: propTypes.shape({ id: propTypes.string }) }),
  }).isRequired,
};
