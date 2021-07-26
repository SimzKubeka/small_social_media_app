import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import './App.css';
//custom context
import { AuthProvider } from './context/auth-context/auth';
//authorized routes
import AuthRoute from './utils/AuthRoute/AuthRoute';
//components
import Navbar from './components/NavBar/NavBar';
//pages
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Navbar />
          <Route exact path='/' component={HomePage} />
          <AuthRoute path='/login' component={LoginPage} />
          <AuthRoute path='/register' component={RegisterPage} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
