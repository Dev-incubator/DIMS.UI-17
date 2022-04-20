import { Offcanvas } from 'react-bootstrap';
import { SettingsContext } from '../../../Hooks/useSettings';
import { Button } from '../../Buttons/Button/Button';
import style from './SetingsPage.module.css';

export function SettingsPge() {
  return (
    <SettingsContext.Consumer>
      {({ isShowSettings, toggleSettings, setLightTheme, setDarkTheme, setDarkDimmedTheme }) => {
        return (
          <Offcanvas show={isShowSettings} onHide={toggleSettings} className={style.settings}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Settings</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className={style.theme}>
                <p>Theme mode</p>
                <div className={style.buttonWrapper}>
                  <Button title='Light' onClick={setLightTheme} className={style.light} />
                  <Button title='Dark' onClick={setDarkTheme} className={style.dark} />
                  <Button title='Dark dimmed' onClick={setDarkDimmedTheme} className={style.darkDimmed} />
                </div>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        );
      }}
    </SettingsContext.Consumer>
  );
}
