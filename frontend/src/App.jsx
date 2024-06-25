import {Browserrouter,Routes,Route} from 'react-router-dom'
import { Signin } from './pages/Signin'
import './styles/tailwind.css';
function App() {

  return (
    <Browserrouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/signin' element={<Signin/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/send' element={<Sendmoney/>}></Route>
    </Routes>
    </Browserrouter>

  )
}

export default App
