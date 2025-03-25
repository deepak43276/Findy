import { Component } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

class SignupForm extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    error: '',
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, confirmPassword } = this.state;

    if (!username || !password || !confirmPassword) {
      this.setState({ error: 'All fields are required!' });
      return;
    }

    if (password !== confirmPassword) {
      this.setState({ error: 'Passwords do not match!' });
      return;
    }

    const userDetails = { username, password };
    Cookies.set('user_credentials', JSON.stringify(userDetails), { expires: 30, path: '/' });
    window.location.href = '/login';
  };

  render() {
    const { username, password, confirmPassword, error } = this.state;

    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6">
        <div className="bg-white shadow-2xl rounded-lg p-6 sm:p-8 w-full max-w-md">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 mb-4 sm:mb-6">
            Sign Up
          </h1>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded">
              <p className="text-sm sm:text-base">{error}</p>
            </div>
          )}

          <form onSubmit={this.handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-base sm:text-lg font-bold text-gray-800 mb-1 sm:mb-2 tracking-wide after:content-['*'] after:ml-1 after:text-red-500">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={this.handleChange}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm sm:text-base"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="block text-base sm:text-lg font-bold text-gray-800 mb-1 sm:mb-2 tracking-wide after:content-['*'] after:ml-1 after:text-red-500">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm sm:text-base"
                placeholder="Enter password"
              />
            </div>

            <div>
              <label className="block text-base sm:text-lg font-bold text-gray-800 mb-1 sm:mb-2 tracking-wide after:content-['*'] after:ml-1 after:text-red-500">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.handleChange}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm sm:text-base"
                placeholder="Confirm password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 ease-in-out shadow-lg text-sm sm:text-base mt-2 sm:mt-4"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-700 mt-4 text-sm sm:text-base">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-blue-700 hover:underline font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default SignupForm;