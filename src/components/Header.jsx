import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Component } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

class Header extends Component {
  state = {
    isMobileMenuOpen: false
  };

  onLogout = () => {
    Cookies.remove('jwt_token');
    this.props.navigate('/login', { replace: true });
  };

  toggleMobileMenu = () => {
    this.setState(prevState => ({
      isMobileMenuOpen: !prevState.isMobileMenuOpen
    }));
  };

  isActiveTab = (path) => {
    return this.props.location.pathname === path;
  };

  render() {
    const { isMobileMenuOpen } = this.state;

    return (
      <>
        {/* Main Header */}
        <div className="bg-white text-gray-800 py-4 px-4 md:px-10 shadow-md flex items-center justify-between">
          
          {/* App Name */}
          <Link 
            to="/" 
            className="text-2xl md:text-3xl font-extrabold px-2 md:px-5 py-2 text-red-900 hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Findy
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex flex-1 justify-center space-x-6 lg:space-x-12 text-lg font-semibold">
            <Link 
              to="/" 
              className={`relative pb-1 hover:text-orange-500 transition-all duration-300 ${
                this.isActiveTab('/') ? 'text-orange-500' : 'text-gray-800'
              }`}
            >
              Home
              {this.isActiveTab('/') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></span>
              )}
            </Link>
            <Link 
              to="/jobs" 
              className={`relative pb-1 hover:text-orange-500 transition-all duration-300 ${
                this.isActiveTab('/jobs') ? 'text-orange-500' : 'text-gray-800'
              }`}
            >
              Jobs
              {this.isActiveTab('/jobs') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></span>
              )}
            </Link>
            <Link 
              to="/about" 
              className={`relative pb-1 hover:text-orange-500 transition-all duration-300 ${
                this.isActiveTab('/about') ? 'text-orange-500' : 'text-gray-800'
              }`}
            >
              About
              {this.isActiveTab('/about') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></span>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button - Hidden on desktop */}
          <button
            className="md:hidden p-2 rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none"
            onClick={this.toggleMobileMenu}
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Desktop Logout Button - Hidden on mobile */}
          <button
            type="button"
            onClick={this.onLogout}
            className="hidden md:block border border-gray-800 px-5 py-2 text-lg font-semibold text-gray-800 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-md"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu - Only shows when toggled */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="flex flex-col items-center space-y-4 py-4">
              <Link 
                to="/" 
                className={`w-full text-center py-2 hover:bg-gray-100 ${
                  this.isActiveTab('/') ? 'text-orange-500 font-bold border-b-2 border-orange-500' : 'text-gray-800'
                }`}
                onClick={this.toggleMobileMenu}
              >
                Home
              </Link>
              <Link 
                to="/jobs" 
                className={`w-full text-center py-2 hover:bg-gray-100 ${
                  this.isActiveTab('/jobs') ? 'text-orange-500 font-bold border-b-2 border-orange-500' : 'text-gray-800'
                }`}
                onClick={this.toggleMobileMenu}
              >
                Jobs
              </Link>
              <Link 
                to="/about" 
                className={`w-full text-center py-2 hover:bg-gray-100 ${
                  this.isActiveTab('/about') ? 'text-orange-500 font-bold border-b-2 border-orange-500' : 'text-gray-800'
                }`}
                onClick={this.toggleMobileMenu}
              >
                About
              </Link>
              <button
                type="button"
                onClick={() => {
                  this.onLogout();
                  this.toggleMobileMenu();
                }}
                className="w-1/2 border border-gray-800 px-5 py-2 text-lg font-semibold text-gray-800 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-md"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}

// Higher-Order Component to pass `navigate` and `location` as props
function withRouter(Component) {
  return function (props) {
    const navigate = useNavigate();
    const location = useLocation();
    return <Component {...props} navigate={navigate} location={location} />;
  };
}

export default withRouter(Header);