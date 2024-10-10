import { Route, Routes } from 'react-router'
import { ROUTE } from './constants/path'
import ProcessMain from './pages/process'
import Layout from './components/layout'
import Login from './pages/login'
import HistoryMain from './pages/history'
import WaitMain from './pages/waiting'
import Redirect from 'pages/oauth'

export default function App() {
  return (
    <Routes>
      <Route path={ROUTE.LOGIN} element={<Login />} />
      <Route path={ROUTE.OAUTH} element={<Redirect />} />
      <Route element={<Layout />}>
        <Route path={ROUTE.WAITING_MAIN} element={<WaitMain />} />
        <Route path={ROUTE.PROCESS_MAIN} element={<ProcessMain />} />
        <Route path={ROUTE.HISTORY_MAIN} element={<HistoryMain />} />
      </Route>
    </Routes>
  )
}
