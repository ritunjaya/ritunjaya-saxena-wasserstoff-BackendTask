import Login from './screens/Login';
import Register from './screens/Register';
import Dashboard from './screens/Dashboard';
import { Routes, Route } from 'react-router-dom';
import Sider from './component/Sider';
import AdminDashBoard from './screens/AdminDashBoard';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/table" element={<Sider />} />
      <Route path="/admin/dashboard" element={<AdminDashBoard />} />
    </Routes>
  );
}

export default App;

