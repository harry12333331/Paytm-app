import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Signin } from './pages/Signin'
import {Signup} from './pages/Signup'
import {Dashboard} from './pages/Dashboard'
import {SendMoney} from './pages/Sendmoney'
import {MainPage} from './pages/Mainpage'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/signin' element={<Signin/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/send' element={<SendMoney/>}></Route>
    </Routes>
    </BrowserRouter>

  )
}

export default App
