import { useContext } from 'react';
import { Offcanvas } from 'react-bootstrap';
import style from './SetingsPage.module.css';
import { SettingsContext } from '../../../Hooks/useSettings';
import { Button } from '../../Buttons/Button/Button';

export function SettingsPge() {
  const { isShowSettings, toggleSettings, setLightTheme, setDarkTheme, setDarkDimmedTheme } =
    useContext(SettingsContext);

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
}
