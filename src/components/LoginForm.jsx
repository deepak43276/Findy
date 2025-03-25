import { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

class LoginForm extends Component {
  state = { username: '', password: '', error: '' };

  handleUsernameChange = (e) => this.setState({ username: e.target.value });
  handlePasswordChange = (e) => this.setState({ password: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const savedCredentials = Cookies.get('user_credentials');

    if (savedCredentials) {
      const { username: savedUsername, password: savedPassword } = JSON.parse(savedCredentials);

      if (username === savedUsername && password === savedPassword) {
        Cookies.set('jwt_token', 'dummy_token', { expires: 30, path: '/' });
        this.setState({ error: '' });
        window.location.href = '/'; // Redirect to Home
      } else {
        this.setState({ error: 'Invalid Credentials' });
      }
    } else {
      this.setState({ error: 'No user found, please sign up first!' });
    }
  };

  render() {
    const { username, password, error } = this.state;
    const jwtToken = Cookies.get('jwt_token');
    if (jwtToken !== undefined) {
      return <Navigate to="/" replace />;
    }

    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4">
        <div className="bg-white shadow-2xl rounded-lg p-6 sm:p-8 w-full max-w-md relative">
          {/* Inner background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-200 opacity-70 rounded-lg"></div>

          <div className="relative z-10">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 mb-4 sm:mb-6">Login</h1>

            {error && (
              <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded mb-4">
                {error}
              </p>
            )}

            <form onSubmit={this.handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-base sm:text-lg font-bold text-gray-800 mb-1 sm:mb-2 tracking-wide after:content-['*'] after:ml-1 after:text-red-500">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  required
                  onChange={this.handleUsernameChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm sm:text-base"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label className="block text-base sm:text-lg font-bold text-gray-800 mb-1 sm:mb-2 tracking-wide after:content-['*'] after:ml-1 after:text-red-500">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={this.handlePasswordChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm sm:text-base"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 ease-in-out shadow-lg text-sm sm:text-base"
              >
                Login
              </button>
            </form>

            {/* Sign up link */}
            <p className="text-center text-gray-700 mt-3 sm:mt-4 text-sm sm:text-base">
              Not have an account?{' '}
              <Link 
                to="/signup" 
                className="text-blue-700 hover:underline font-semibold"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;