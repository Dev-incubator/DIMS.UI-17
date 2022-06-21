import { Container } from 'react-bootstrap';
import { ErrorBoundary } from '../Hooks/ErrorBoundary';
import { Header } from '../components/Common/Header/Header';
import { Footer } from '../components/Common/Footer/Footer';
import style from './App.module.css';
import { Routes } from '../Routes/Routes';

export function App() {
  return (
    <Container className={style.container} fluid>
      <Header />
      <ErrorBoundary>
        <main>
          <Routes />
        </main>
      </ErrorBoundary>
      <Footer />
    </Container>
  );
}
