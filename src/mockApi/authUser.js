import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export function auth(app) {
  const authApp = getAuth(app);
  signInWithEmailAndPassword(authApp, 'then7w@gmai.com', 'Angland2010').then((response) => console.log(response));
}
