import style from './About.module.css';

export function About() {
  return (
    <>
      <h1 className={style.mainTitle}>
        <span className={style.bgTitle}>EMS - APPLICATION FOR MANAGING THE EDUCATIONAL PROCESS</span>
      </h1>
      <section className={style.topic}>
        <div className={style.techContent}>
          <div>
            <h3>Main technologies:</h3>
            <ul className={style.list}>
              <li>react;</li>
              <li>redux;</li>
              <li>firebase, Rest API.</li>
            </ul>
          </div>
          <div>
            <h3>Additional tools:</h3>
            <ul className={style.list}>
              <li>axios;</li>
              <li>react-bootstrap;</li>
              <li>class components, functional components;</li>
              <li>hooks;</li>
              <li>jest;</li>
              <li>redux-thunk;</li>
              <li>prop-types.</li>
            </ul>
          </div>
        </div>
      </section>
      <h2 className={style.title}>
        <span className={style.bgTitle}>How it works?</span>
      </h2>
      <section className={style.topic}>
        <h3 className={style.topicTitle}>ROLES</h3>
        <ul className={style.list}>
          <li>
            <span className={style.admin}>admin</span> - has access to all functionality;
          </li>
          <li>
            <span className={style.mentor}>mentor</span> - has access to members tasks and progress;
          </li>
          <li>
            <span className={style.user}>user</span> - has access to own tasks and tracks.
          </li>
        </ul>
      </section>
      <section className={style.topic}>
        <h3 className={style.topicTitle}>LOGIN</h3>
        <p>Use the login credentials provided to you</p>
      </section>
      <section className={style.topic}>
        <h3 className={style.topicTitle}>MEMBERS PAGE</h3>
        <p>
          <span className={style.access}>Access:</span> <span className={style.admin}>admin</span>,
          <span className={style.mentor}>mentor</span>.
        </p>
        <p>
          We can see all users on this page. We can view the progress of tasks and tasks assigned to users. If you are
          an administrator, we can add, change, remove users.
        </p>
      </section>
      <section className={style.topic}>
        <h3 className={style.topicTitle}>TASKS PAGE</h3>
        <p>
          <span className={style.access}>Access:</span> <span className={style.admin}>admin</span>,
          <span className={style.mentor}>mentor</span>.
        </p>
        <p>On this page we can view all tasks, add, remove tasks, assign tasks to users.</p>
        <p>
          <span className={style.access}>Access:</span> <span className={style.user}>user</span>.
        </p>
        <p>On this page, we can see the tasks assigned to you.</p>
      </section>
      <section className={style.topic}>
        <h3 className={style.topicTitle}>TASKS PAGE</h3>
        <p>
          <span className={style.access}>Access:</span> <span className={style.user}>user</span>.
        </p>
        <p>On this page we can see your progress, mark your progress, change, add, remove your tracks.</p>
      </section>
    </>
  );
}
