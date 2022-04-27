import React from 'react';
import propTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserTasksThunk } from '../../../store/actionCreators/tasksActionCreators';
import {
  createTrackThunk,
  removeTrackThunk,
  updateTrackThunk,
} from '../../../store/actionCreators/tracksActionCreators';
import { TITLES_PAGES, BUTTONS_NAMES, TABLE_TITLES, MODALTITLE_KEYS } from '../../../shared/constants';
import { PageTitle } from '../../PageTitle/PageTitle';
import { ModalWindow } from '../../Common/Modal/Modal';
import { ButtonsTrack } from '../../Buttons/ButtonsTrack/ButtonsTrack';
import { CreateTrackForm } from '../../Forms/CreateTrackForm/CreateTrackForm';
import { DeleteForm } from '../../Forms/DeleteForm/DeleteForm';
import { Table } from '../../Table/Table';
import { TrackTableRow } from '../../Table/TrackTableRow';
import { AuthContext } from '../../../Hooks/useAuth';

class Tracks extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
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
    const { userId } = this.context;
    const {
      match: {
        params: { id },
      },
    } = this.props;
    await this.getData(userId);
    this.setState((prevState) => ({ ...prevState, taskId: id, userId }));
  }

  async getData(userId) {
    const { getUserTasks } = this.props;
    await getUserTasks(userId);
  }

  selectTrackHandler = (selectedTrack) => {
    this.setState({ selectedTrack });
  };

  createTrackHandler = async (selectedTaskId, data) => {
    const { createTrack } = this.props;
    const { userId } = this.state;
    await createTrack(selectedTaskId, { ...data, userId });
    this.toggleModal();
  };

  deleteTrackHandler = async () => {
    const { taskId, selectedTrack } = this.state;
    const { removeTrack } = this.props;

    await removeTrack(taskId, selectedTrack);
    this.toggleModal();
  };

  updatedTrackHandler = async (data) => {
    const { taskId, userId } = this.state;
    const { updateTrack } = this.props;

    await updateTrack(data, taskId, userId);
    this.toggleModal();
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

  toggleModalDeleteHandler = () => {
    this.setState((prevState) => ({ isDeleteModalOpen: !prevState.isDeleteModalOpen }));
  };

  turnOnEditModeHandler = () => {
    this.setState({ isEditMode: true });
  };

  toggleModal = () => {
    const { isTrackModalOpen, isDeleteModalOpen } = this.state;
    if (isTrackModalOpen) {
      this.toggleTrackModalHandler();
    } else if (isDeleteModalOpen) {
      this.toggleModalDeleteHandler();
    }
  };

  render() {
    const { isTrackModalOpen, taskId, isDeleteModalOpen, userId, isEditMode, selectedTrack } = this.state;
    const { tasks } = this.props;
    const task = tasks.find((item) => item.taskId === taskId);
    const items = task
      ? task.tracks.map((item, index) => {
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
                  userId={userId}
                  taskId={taskId}
                  tracks={task.tracks}
                  userTasks={tasks}
                  selectTrackHandler={this.selectTrackHandler}
                  toggleModalDeleteHandler={this.toggleModalDeleteHandler}
                  turnOnEditModeHandler={this.turnOnEditModeHandler}
                  toggleTrackModalHandler={this.toggleTrackModalHandler}
                />
              }
            />
          );
        })
      : [];

    return (
      <>
        <PageTitle
          title={TITLES_PAGES.track}
          buttonTitle={BUTTONS_NAMES.create}
          onClick={this.toggleTrackModalHandler}
        />

        <Table title={TABLE_TITLES.track} items={items} />

        {isTrackModalOpen ? (
          <ModalWindow
            title={MODALTITLE_KEYS.createTrack}
            isModalOpen={isTrackModalOpen}
            toggleModalHandler={this.toggleTrackModalHandler}
          >
            <CreateTrackForm
              taskId={taskId}
              userId={userId}
              tracks={task?.tracks}
              trackId={selectedTrack}
              createTrackHandler={this.createTrackHandler}
              toggleModalHandler={this.toggleTrackModalHandler}
              updatedTrackHandler={this.updatedTrackHandler}
              userTasks={tasks}
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

Tracks.contextType = AuthContext;

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getUserTasks: getUserTasksThunk,
      createTrack: createTrackThunk,
      removeTrack: removeTrackThunk,
      updateTrack: updateTrackThunk,
    },
    dispatch,
  );
};

Tracks.propTypes = {
  getUserTasks: propTypes.func.isRequired,
  createTrack: propTypes.func.isRequired,
  removeTrack: propTypes.func.isRequired,
  updateTrack: propTypes.func.isRequired,
  tasks: propTypes.arrayOf(propTypes.object).isRequired,
  match: propTypes.shape({ params: propTypes.shape({ id: propTypes.string }) }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);
