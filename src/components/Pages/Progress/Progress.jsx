import { useEffect } from 'react';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { PageTitle } from '../../PageTitle/PageTitle';
import { TABLE_TITLES, BUTTONS_NAMES, TITLES_PAGES, BUTTONS_TYPES } from '../../../shared/constants';
import { ProgressTableRow } from '../../Table/ProgressTableRow';
import { Table } from '../../Table/Table';
import { getTracksThunk } from '../../../store/actionCreators/tracksActionCreators';
import { getUserTracks } from '../../../store/selectors/selectors';

export function Progress({ history, match }) {
  const dispatch = useDispatch();
  const tracks = useSelector(getUserTracks);
  const {
    params: { id },
  } = match;

  useEffect(() => {
    dispatch(getTracksThunk(id));
  }, [dispatch, id]);

  const items = tracks.map((item, index) => {
    return (
      <ProgressTableRow
        key={item.name + index.toString()}
        index={index + 1}
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
