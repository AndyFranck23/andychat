import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Admin } from './admin/Admin'
import { Login } from './admin/Login'
import { SignUp } from './admin/SignUp'
import ProtectedRoute from './admin/components/ProtectedRoute'


export const NOM_DE_DOMAIN = "https://andychat2.onrender.com"

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path='admin/*' element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
        />
        <Route path='login' element={<Login />} />
        <Route path='signUp' element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default App
