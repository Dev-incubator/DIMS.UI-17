import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const SettingsContext = createContext(null);
const { body } = document;

export class SettingsProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      theme: {
        isShowSettings: false,
        toggleSettings: this.toggleSettings,
        setLightTheme: this.toggleTheme.bind(this, 'light'),
        setDarkTheme: this.toggleTheme.bind(this, 'dark'),
        setDarkDimmedTheme: this.toggleTheme.bind(this, 'dark-dimmed'),
      },
    };
  }

  componentDidMount() {
    this.setState((prevState) => ({ theme: { ...prevState.theme, theme: localStorage.getItem('theme') || 'light' } }));
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      theme: { theme },
    } = this.state;
    if (prevState.theme.theme !== theme) {
      localStorage.setItem('theme', theme);
      body.setAttribute('data-theme', theme);
    }
  }

  toggleSettings = () => {
    this.setState((prevState) => ({
      theme: { ...prevState.theme, isShowSettings: !prevState.theme.isShowSettings },
    }));
  };

  toggleTheme(theme) {
    this.setState((prevState) => ({ theme: { ...prevState.theme, theme } }));
  }

  render() {
    const { theme } = this.state;
    const { children } = this.props;

    return <SettingsContext.Provider value={theme}>{children}</SettingsContext.Provider>;
  }
}

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
