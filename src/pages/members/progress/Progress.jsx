import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './Progress.module.css';
import { ProgressRow } from './progressRow/ProgressRow';
import { PageHeader } from '../helpers/PageHeader';
import { TableHeader } from '../helpers/TableHeader';
import { getUserById, getUserProgress } from '../../../scripts/api-service';

const tableTitles = ['#', 'Task name', 'Task note', 'Date'];

export class Progress extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      progress: [],
      name: null,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const userId = match.params.id;
    const progress = await getUserProgress(userId);
    const user = await getUserById(userId);
    this.setState((prevState) => ({ ...prevState, progress, name: user.name }));
  }

  render() {
    const { progress, name } = this.state;
    if (!progress || !name) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <PageHeader text={`${name}'s progress`} />
        <table className={styles.progress}>
          <TableHeader titles={tableTitles} />
          <tbody>
            {progress.map((task, index) => (
              <ProgressRow
                key={task.id}
                title={task.taskTitle}
                date={task.date}
                taskNote={task.taskNote}
                number={index + 1}
                taskId={task.taskId}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Progress.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string.isRequired }) }).isRequired,
};
