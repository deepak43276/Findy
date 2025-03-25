import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Home from './components/Home';
import About from './components/About';
import ProtectedRoute from './components/ProtectedRoute';
import Jobs from './components/Jobs';
import JobItemDetails from './components/JobItemDetails';
import NotFound from './components/NotFound';
import Cookies from 'js-cookie';
import './App.css';


const App = () => {
  const userCredentials = Cookies.get('user_credentials');

  return (
    <Routes>
      {/* Redirect to Signup if no user credentials found */}
      {!userCredentials && <Route path="/" element={<SignupForm />} />}
      
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />
      
      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
      <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
      <Route path="/jobs/:id" element={<ProtectedRoute><JobItemDetails /></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
