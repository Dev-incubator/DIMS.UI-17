import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const SettingsContext = createContext(null);
const { body } = document;

export class SettingsProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowSettings: false,
      toggleSettings: this.toggleSettings,
      setLightTheme: this.toggleTheme.bind(this, 'light'),
      setDarkTheme: this.toggleTheme.bind(this, 'dark'),
      setDarkDimmedTheme: this.toggleTheme.bind(this, 'dark-dimmed'),
    };
  }

  componentDidMount() {
    this.setState((prevState) => ({ ...prevState, theme: localStorage.getItem('theme') || 'light' }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { theme } = this.state;
    if (prevState.theme !== theme) {
      localStorage.setItem('theme', theme);
      body.setAttribute('data-theme', theme);
    }
  }

  toggleSettings = () => {
    this.setState((prevState) => ({ ...prevState, isShowSettings: !prevState.isShowSettings }));
  };

  toggleTheme(theme) {
    this.setState((prevState) => ({ ...prevState, theme }));
  }

  render() {
    const { children } = this.props;

    return <SettingsContext.Provider value={this.state}>{children}</SettingsContext.Provider>;
  }
}

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
