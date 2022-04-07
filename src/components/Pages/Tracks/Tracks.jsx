import React from 'react';
import propTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { TITLES_PAGES, BUTTONS_NAMES, TABLE_TITLES, MODALTITLE_KEYS } from '../../../shared/constants';
import { createTrack, getTracks, removeTrack, updateTracks } from '../../../services/tracks-services';
import { PageTitle } from '../../PageTitle/PageTitle';
import { ModalWindow } from '../../Common/Modal/Modal';
import { getMemberTasks } from '../../../services/tasks-services';
import { ButtonsTrack } from '../../Buttons/ButtonsTrack/ButtonsTrack';
import { CreateTrackForm } from '../../Forms/CreateTrackForm/CreateTrackForm';
import { DeleteForm } from '../../Forms/DeleteForm/DeleteForm';
import { TableHead } from '../../Table/TableHead';
import { TrackTableRow } from '../../Table/TrackTableRow';
import { compareObjects } from '../../../shared/helpers/compareObjects/compareObjects';

export class Tracks extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      userTasks: [],
      taskId: null,
      userId: null,
      selectedTrack: null,
      selectedTask: null,
      isTrackModalOpen: false,
      isDeleteModalOpen: false,
      isEditMode: false,
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
    await this.getData(id, userId);
  }

  async componentDidUpdate(prevProps, prevState) {
    const { tracks, taskId, userId, userTasks, selectedTask, selectedTrack } = this.state;

    if (prevState.tracks.length > tracks.length && prevState.tracks.length) {
      await this.getData(taskId, userId);
      this.toggleModalDeleteHandler();

      return;
    }
    if (
      !compareObjects(
        prevState.tracks.find((item) => item.id === selectedTrack),
        tracks.find((item) => item.id === selectedTrack),
      ) &&
      selectedTrack
    ) {
      this.toggleTrackModalHandler();
      await this.getData(taskId, userId);

      return;
    }
    if (
      !compareObjects(
        prevState.userTasks.find((item) => item.id === selectedTask),
        userTasks.find((item) => item.id === selectedTask),
      ) &&
      selectedTask
    ) {
      this.toggleTrackModalHandler();
      await this.getData(taskId, userId);
    }
  }

  async getData(taskId, userId) {
    const tracks = await getTracks(taskId, userId);
    const userTasks = await getMemberTasks(userId);
    this.setState({ tracks, userTasks, taskId, userId });
  }

  setTracksHandler = (tracks) => {
    this.setState({ tracks });
  };

  selectTrackHandler = (selectedTrack) => {
    this.setState({ selectedTrack });
  };

  toggleModalDeleteHandler = () => {
    this.setState((prevState) => ({ isDeleteModalOpen: !prevState.isDeleteModalOpen }));
  };

  createTrackHandler = async (selectedTaskId, data) => {
    const { userId, userTasks } = this.state;
    const updatedTasks = userTasks.map((item) =>
      item.id === selectedTaskId ? { ...item, statuses: [...item.statuses, data] } : item,
    );
    await createTrack(selectedTaskId, userId, { ...data });

    this.setState({ userTasks: updatedTasks, selectedTask: selectedTaskId });
  };

  updatedTrackHandler = async (data) => {
    const { taskId, userId, tracks } = this.state;
    const updatedTrack = tracks.map((item) => (item.id === data.id ? data : item));
    await updateTracks(data, taskId, userId);
    this.setState({ tracks: updatedTrack });
  };

  deleteTrackHandler = async () => {
    const { taskId, selectedTrack, tracks } = this.state;
    const updatedTracks = tracks.filter((item) => item.id !== selectedTrack);

    await removeTrack(taskId, selectedTrack);
    this.setState({ tracks: updatedTracks });
  };

  toggleTrackModalHandler = () => {
    this.setState((prevState) => {
      const { isTrackModalOpen } = prevState;

      return isTrackModalOpen
        ? {
            ...prevState,
            isTrackModalOpen: !prevState.isTrackModalOpen,
            selectedTask: null,
            selectedTrack: null,
            isEditMode: false,
          }
        : { ...prevState, isTrackModalOpen: !prevState.isTrackModalOpen };
    });
  };

  turnOnEditModeHandler = () => {
    this.setState({ isEditMode: true });
  };

  render() {
    const { isTrackModalOpen, tracks, userTasks, taskId, isDeleteModalOpen, userId, isEditMode, selectedTrack } =
      this.state;

    return (
      <>
        <PageTitle
          title={TITLES_PAGES.track}
          buttonTitle={BUTTONS_NAMES.create}
          onClick={this.toggleTrackModalHandler}
        />

        <Table striped bordered hover>
          <TableHead items={TABLE_TITLES.track} />
          {tracks.map((item, index) => {
            return (
              <TrackTableRow
                key={item.name + index.toString()}
                index={index}
                name={item.name}
                node={item.node}
                date={item.date}
                actions={
                  <ButtonsTrack
                    trackId={item.id}
                    setTracksHandler={this.setTracksHandler}
                    userId={userId}
                    taskId={taskId}
                    tracks={tracks}
                    userTasks={userTasks}
                    selectTrackHandler={this.selectTrackHandler}
                    toggleModalDeleteHandler={this.toggleModalDeleteHandler}
                    turnOnEditModeHandler={this.turnOnEditModeHandler}
                    toggleTrackModalHandler={this.toggleTrackModalHandler}
                  />
                }
              />
            );
          })}
        </Table>

        {isTrackModalOpen ? (
          <ModalWindow
            title={MODALTITLE_KEYS.createTrack}
            isModalOpen={isTrackModalOpen}
            toggleModalHandler={this.toggleTrackModalHandler}
          >
            <CreateTrackForm
              taskId={taskId}
              userId={userId}
              tracks={tracks}
              trackId={selectedTrack}
              createTrackHandler={this.createTrackHandler}
              toggleModalHandler={this.toggleTrackModalHandler}
              setTracksHandler={this.setTracksHandler}
              updatedTrackHandler={this.updatedTrackHandler}
              userTasks={userTasks}
              isEditMode={isEditMode}
            />
          </ModalWindow>
        ) : null}

        {isDeleteModalOpen && (
          <ModalWindow
            title='Delete track'
            isModalOpen={isDeleteModalOpen}
            toggleModalHandler={this.toggleModalDeleteHandler}
          >
            <DeleteForm
              item='track'
              deleteHandler={this.deleteTrackHandler}
              toggleModalHandler={this.toggleModalDeleteHandler}
            />
          </ModalWindow>
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
