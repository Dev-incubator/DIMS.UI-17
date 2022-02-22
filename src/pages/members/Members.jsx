import { PureComponent } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import styles from './Members.module.css';
import { MemberInfoRow } from './memberInfoRow/MemberInfoRow';
import { Button } from '../../components/Buttons/Button/Button';
import { BUTTON_COLORS } from '../../scripts/libraries';
import pageStyles from './MemberPage.module.css';
import { db } from '../../scripts/firebase-config';
import { TableHeader } from './helpers/TableHeader';

const memberTableTitles = ['#', 'Full name', 'Direction', 'Education', 'Start', 'Age', 'Action'];

export class Members extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    this.userCollectionRef = collection(db, 'users');
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const data = await getDocs(this.userCollectionRef);
    const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    this.setState({ users });
  };

  render() {
    const { users } = this.state;

    return (
      <div>
        <div className={pageStyles.header}>
          <div className={pageStyles.pageTitle}>Members</div>
          <div className={styles.createButton}>
            <Button color={BUTTON_COLORS.blue}>Create</Button>
          </div>
        </div>
        <table className={styles.members}>
          <TableHeader titles={memberTableTitles} />
          <tbody>
            {users.map((user, index) => (
              <MemberInfoRow
                key={user.id}
                id={user.id}
                direction={user.direction}
                name={user.name}
                number={index + 1}
                age={user.age}
                education={user.education}
                startDate={user.startDate}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Members.propTypes = {};
Members.defaultProps = {};
