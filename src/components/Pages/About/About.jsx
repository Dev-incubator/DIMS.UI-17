import style from './About.module.css';

export function About() {
  return (
    <>
      <h1 className={style.mainTitle}>EMS - APPLICATION FOR MANAGING THE EDUCATIONAL PROCESS</h1>
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
      <h2 className={style.title}>How it works?</h2>
      <section className={style.topic}>
        <h3 className={style.topicTitle}>ROLES</h3>
        <ul className={style.list}>
          <li>admin - has access to all functionality;</li>
          <li>mentor - has access to members tasks and progress;</li>
          <li>user - has access to own tasks and tracks.</li>
        </ul>
      </section>
      <section className={style.topic}>
        <h3 className={style.topicTitle}>LOGIN</h3>
        <p>Use the login credentials provided to you</p>
      </section>
      <section className={style.topic}>
        <h3 className={style.topicTitle}>MEMBERS PAGE</h3>
        <p>Access: admin, mentor.</p>
        <p>
          We can see all users on this page. We can view the progress of tasks and tasks assigned to users. If you are
          an administrator, we can add, change, remove users.
        </p>
      </section>
      <section className={style.topic}>
        <h3 className={style.topicTitle}>TASKS PAGE</h3>
        <p>Access: admin, mentor.</p>
        <p>On this page we can view all tasks, add, remove tasks, assign tasks to users.</p>
        <p>Access: user.</p>
        <p>On this page, we can see the tasks assigned to you.</p>
      </section>
      <section className={style.topic}>
        <h3 className={style.topicTitle}>TASKS PAGE</h3>
        <p>Access: user.</p>
        <p>On this page we can see your progress, mark your progress, change, add, remove your tracks.</p>
      </section>
    </>
  );
}
