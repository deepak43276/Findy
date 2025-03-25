import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 pt-12 pb-8 px-4 sm:px-6 lg:px-8 shadow-lg border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">
              <span className="text-blue-600">Findy</span>
            </h3>
            <p className="text-gray-600">
              Connecting talent with opportunity. Find your dream job or the perfect candidate with our platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Jobs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-gray-600">Erode, Tamilnadu</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-blue-600" />
                <p className="text-gray-600">+91 6374294597</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-blue-600" />
                <p className="text-gray-600">info@Findy.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-6"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Findy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;