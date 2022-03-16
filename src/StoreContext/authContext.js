import React from 'react';

const authUserData = {
  name: '',
  role: '',
  uid: '',
  isAuth: false,
};

class Auth {
  constructor() {
    this.userData = authUserData;
  }

  logout() {
    this.state = authUserData;
  }

  setAuth(name, role, uid) {
    this.userData = { name, role, uid, isAuth: true };
  }
}

export const authData = new Auth();

export const AuthContext = React.createContext();
