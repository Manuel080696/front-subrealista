import { Footer } from './components/footer';
import { Header } from './components/header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import './App.css';
import RentCreateForm from './forms/RentCreateForm/RentCreateForm';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/rent-create' element={<RentCreateForm />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
