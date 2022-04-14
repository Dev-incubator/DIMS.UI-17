import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const SettingsContext = createContext(null);

export class SettingsProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      theme: {
        isShowSettingsPage: false,
        toggleSettingsPageHandler: this.toggleSettingsPage,
      },
    };
  }

  toggleSettingsPage = () => {
    this.setState((prevState) => ({
      theme: { ...prevState.theme, isShowSettingsPage: !prevState.theme.isShowSettingsPage },
    }));
  };

  render() {
    const { theme } = this.state;
    const { children } = this.props;

    return <SettingsContext.Provider value={theme}>{children}</SettingsContext.Provider>;
  }
}

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
