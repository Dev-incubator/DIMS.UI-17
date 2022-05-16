import React from 'react';
import propTypes from 'prop-types';
import { PageTitle } from '../../PageTitle/PageTitle';
import { TABLE_TITLES, BUTTONS_NAMES, TITLES_PAGES, BUTTONS_TYPES } from '../../../shared/constants';
import { getUserTracks } from '../../../services/tracks-services';
import { ProgressTableRow } from '../../Table/ProgressTableRow';
import { Table } from '../../Table/Table';

export class Progress extends React.PureComponent {
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
    const items = progress.map((item, index) => {
      return (
        <ProgressTableRow
          key={item.name + index.toString()}
          index={index}
          name={item.name}
          node={item.node}
          date={item.date}
        />
      );
    });

    return (
      <div>
        <PageTitle
          title={TITLES_PAGES.progress}
          buttonTitle={BUTTONS_NAMES.backToList}
          stylingType={BUTTONS_TYPES.typeSecondary}
          history={history}
          isBackButton
        />
        <Table title={TABLE_TITLES.progress} items={items} bordered={false} striped={false} hover={false} />
      </div>
    );
  }
}

Progress.propTypes = {
  match: propTypes.shape({ params: propTypes.shape({ id: propTypes.string }) }).isRequired,
  history: propTypes.oneOfType([propTypes.func, propTypes.object, propTypes.number]).isRequired,
};
