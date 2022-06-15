import { Container } from 'react-bootstrap';
import { ErrorBoundary } from '../Hooks/ErrorBoundary';
import { Header } from '../components/Common/Header/Header';
import { Footer } from '../components/Common/Footer/Footer';
import style from './App.module.css';
import { GetRoute } from '../Routes/getRoute';

export function App() {
  return (
    <Container className={style.container}>
      <Header />
      <ErrorBoundary>
        <main>{GetRoute()}</main>
      </ErrorBoundary>
      <Footer />
    </Container>
  );
}
