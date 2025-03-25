const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
    <div className="text-center max-w-2xl">
      {/* Updated to a more attractive 404 illustration */}
      <img
        src="https://cdn.dribbble.com/users/1175431/screenshots/6188233/404-error-dribbble-800x600.gif"
        alt="Page not found"
        className="w-full max-w-md mx-auto mb-8 rounded-lg shadow-xl"
      />
      
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Oops! Page Not Found
      </h1>
      
      <p className="text-lg md:text-xl text-gray-600 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <div className="space-y-4 sm:space-y-0 sm:space-x-4">
        <a
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Go to Homepage
        </a>
       
      </div>
    </div>
  </div>
);

export default NotFound;