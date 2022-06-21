import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import {
  isSmallScreen,
  isMediumScreen,
  isLargeScreen,
  isXSScreen,
} from '../shared/helpers/checkMediaQuery/checkMediaQuery';

export const SettingsContext = createContext(null);
const { body } = document;

export class SettingsProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mediumBreakpoint: null,
      isXSBreakpoint: false,
      isSmallBreakpoint: false,
      isMediumBreakpoint: false,
      isLargeBreakpoint: false,
      isShowSettings: false,
      toggleSettings: this.toggleSettings,
      setLightTheme: this.toggleTheme.bind(this, 'light'),
      setDarkTheme: this.toggleTheme.bind(this, 'dark'),
      setDarkDimmedTheme: this.toggleTheme.bind(this, 'dark-dimmed'),
    };
  }

  componentDidMount() {
    this.setState((prevState) => ({
      ...prevState,
      theme: localStorage.getItem('theme') || 'light',
      isXSBreakpoint: isXSScreen(window.innerWidth),
      isSmallBreakpoint: isSmallScreen(window.innerWidth),
      isMediumBreakpoint: isMediumScreen(window.innerWidth),
      isLargeBreakpoint: isLargeScreen(window.innerWidth),
    }));
    window.addEventListener('resize', this.setBreakpoint);
  }

  componentDidUpdate(prevProps, prevState) {
    const { theme } = this.state;
    if (prevState.theme !== theme) {
      localStorage.setItem('theme', theme);
      body.setAttribute('data-theme', theme);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setBreakpoint);
  }

  toggleSettings = () => {
    this.setState((prevState) => ({ ...prevState, isShowSettings: !prevState.isShowSettings }));
  };

  setBreakpoint = () => {
    this.setState({
      isXSBreakpoint: isXSScreen(window.innerWidth),
      isSmallBreakpoint: isSmallScreen(window.innerWidth),
      isMediumBreakpoint: isMediumScreen(window.innerWidth),
      isLargeBreakpoint: isLargeScreen(window.innerWidth),
    });
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
