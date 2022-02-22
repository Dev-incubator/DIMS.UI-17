import styles from './Progress.module.css';
import { ProgressRow } from './progressRow/ProgressRow';
import { PageHeader } from '../helpers/PageHeader';
import { TableHeader } from '../helpers/TableHeader';

const tableTitles = ['#', 'Task name', 'Task note', 'Date'];

export function Progress() {
  return (
    <div>
      <PageHeader text='Eric Scotts&rsquo;s progress' />
      <table className={styles.progress}>
        <TableHeader titles={tableTitles} />
        <tbody>
          <ProgressRow
            title='Create database project'
            description='Create table for user entity in data base'
            date='01.11.2020'
            number='1'
          />
          <ProgressRow
            title='Create database project'
            description='Create table for user entity in data base'
            date='01.11.2020'
            number='2'
          />
          <ProgressRow
            title='Create database project'
            description='Create table for user entity in data base'
            date='01.11.2020'
            number='3'
          />
        </tbody>
      </table>
    </div>
  );
}
