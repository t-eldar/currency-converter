import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import CurrencyService from './api/currencyService';
import Layout from './components/Layout';
import ConverterPage from './pages/ConverterPage';
import RatesPage from './pages/RatesPage'
import ConvertIcon from './icons/convertIcon.svg'
import MonitoringIcon from './icons/monitoringIcon.svg'

function App() {
  const pages = [
    { id: 0, name: 'Конвертер', path: '/', icon: ConvertIcon },
    { id: 1, name: 'Курсы валют', path: '/rates', icon: MonitoringIcon }]

  const [currencies, setCurrencies] = useState([])
  useEffect(() => {
    const result = (async () => {
      const response = await CurrencyService.getCurrencies()
      setCurrencies(response)
    })()
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Layout pages={pages} />}>
        <Route index element={<ConverterPage currencies={currencies}/>} />
        <Route path='/rates' element={<RatesPage currencies={currencies}/>} />
      </Route>
    </Routes>
  );
}

export default App;
