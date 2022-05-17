import { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { PageTitle } from '../../PageTitle/PageTitle';
import { TABLE_TITLES, BUTTONS_NAMES, TITLES_PAGES, BUTTONS_TYPES } from '../../../shared/constants';
import { getUserTracks } from '../../../services/tracks-services';
import { ProgressTableRow } from '../../Table/ProgressTableRow';
import { Table } from '../../Table/Table';

export function Progress({ history, match }) {
  const [progress, getProgress] = useState([]);

  useEffect(() => {
    const {
      params: { id },
    } = match;

    async function getData() {
      const response = await getUserTracks(id);
      getProgress(response);
    }
    getData();
  });

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

Progress.propTypes = {
  match: propTypes.shape({ params: propTypes.shape({ id: propTypes.string }) }).isRequired,
  history: propTypes.oneOfType([propTypes.func, propTypes.object, propTypes.number]).isRequired,
};
