import React from 'react';
import Header from './Header'
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div>
      <Header />
    
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      
      <div className=" mt-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">Findy</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Your simple solution for finding the perfect job 
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
        
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            WorkFolio was created to make job searching and hiring simpler, faster, and more effective.
            We cut through the complexity to connect great companies with talented professionals.
            </p>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Our platform focuses on what really matters - skills, experience.
            </p>
            <Link to="/">
  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300">
    Continue
  </button>
</Link>
          </div>
          <div className="order-1 lg:order-2">
            <img 
              src="https://i.pinimg.com/originals/6b/8f/fe/6b8ffec3b8865694a5bde6acbc906768.jpg" 
              alt="Team working together"
              className="rounded-xl shadow-xl w-full h-auto object-cover"
            />
          </div>
        </div>

       

      
      </div>
    </div>
    </div>
  );
};

export default About;