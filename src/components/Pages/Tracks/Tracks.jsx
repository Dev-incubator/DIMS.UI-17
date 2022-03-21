import React from 'react';
import propTypes from 'prop-types';
import { TITLES_PAGES, BUTTONS_NAMES, TABLE_TITLES, MODALTITLE_KEYS } from '../../../shared/constants';
import { PageTitle } from '../../PageTitle/PageTitle';
import { Modal } from '../../Common/Modal/Modal';
import { CreateTrackModal } from '../../Common/Modal/CreateTrackModal/CreateTrackModal';
import { getMemberTasks } from '../../../services/tasks-services';
import { getTracks } from '../../../services/tracks-services';
import { ButtonsTrack } from '../../Buttons/ButtonsTrack/ButtonsTrack';
import { TableWithActions } from '../../Table/TableWithActions';

export class Tracks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      isModalOpen: false,
      userTasks: [],
    };
  }

  async componentDidMount() {
    const {
      params: {
        match: {
          params: { id },
        },
      },
      userId,
    } = this.props;
    const tracks = await getTracks(id, userId);
    const userTasks = await getMemberTasks(userId);
    this.setState({ tracks, userTasks });
  }

  setTracksHandler = (tracks) => {
    this.setState({ tracks });
  };

  toggleModalHandler = () => {
    this.setState((prevState) => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    const { isModalOpen, tracks, userTasks } = this.state;
    const {
      params: {
        match: {
          params: { id },
        },
      },
      userId,
    } = this.props;

    return (
      <>
        <PageTitle title={TITLES_PAGES.track} buttonTitle={BUTTONS_NAMES.create} onClick={this.toggleModalHandler} />
        <TableWithActions
          titles={TABLE_TITLES.track}
          items={tracks}
          action={
            <ButtonsTrack
              trackId={tracks.id}
              setTracksHandler={this.setTracksHandler}
              userId={userId}
              taskId={id}
              tracks={tracks}
              userTasks={userTasks}
            />
          }
        />
        {isModalOpen && (
          <Modal
            title={MODALTITLE_KEYS.createTrack}
            isModalOpen={isModalOpen}
            toggleModalHandler={this.toggleModalHandler}
          >
            <CreateTrackModal
              taskId={id}
              userId={userId}
              tracks={tracks}
              toggleModalHandler={this.toggleModalHandler}
              setTracksHandler={this.setTracksHandler}
              userTasks={userTasks}
            />
          </Modal>
        )}
      </>
    );
  }
}

Tracks.propTypes = {
  params: propTypes.shape({
    match: propTypes.shape({ params: propTypes.shape({ id: propTypes.string }) }),
  }).isRequired,
  userId: propTypes.string.isRequired,
};