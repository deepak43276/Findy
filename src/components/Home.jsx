import { Component } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from './Header';
import Footer from './Footer';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Home extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token');
    if (!jwtToken) {
      return <Navigate to="/login" replace />;
    }

    // Images for the slideshow
    const images = [
      "https://th.bing.com/th/id/R.33c9d961bf32b452da4404bf06eaccb1?rik=pcP3gjvgg12bdw&riu=http%3a%2f%2fstatic1.squarespace.com%2fstatic%2f6519bc13ca4ef541967b0b2a%2f6519bc700f00733c6dc979a5%2f654008bbfcbe7012ad85cc77%2f1699639926732%2fsearching-for-a-new-job-2210x1473.jpg%3fformat%3d1500w&ehk=Ms1eLSBnkOHDyg9Iuuo5zPNV%2b6VdvaLcE%2fg2NhFhnlk%3d&risl=&pid=ImgRaw&r=0",
      "https://th.bing.com/th/id/OIP.mJfX6ESTGBC-b8mVGdj3UwHaE8?w=291&h=194&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      "https://c1.wallpaperflare.com/preview/80/193/318/job-job-offer-workplace-job-search.jpg"
    ];

    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000, // Moves every 3 seconds
      pauseOnHover: false, // Prevents pausing when hovered
      pauseOnFocus: false, // Prevents pausing when focused
      arrows: false, // Optionally remove arrows for a cleaner UI
    };
    return (
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen">
        <Header />

        <div className="flex flex-col items-center justify-center text-center px-6 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find The Job That <span className="text-orange-500">Fits Your Life</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-lg">
            Millions of people are searching for jobs, salary insights, and company reviews. Your next opportunity is just a click away!
          </p>

          <Link to="/jobs">
            <button className="mt-6 bg-orange-500 text-white font-semibold text-lg px-6 py-3 rounded-lg shadow-lg hover:bg-orange-600 transition-all duration-300">
              Find Jobs
            </button>
          </Link>
        </div>

        {/* Slideshow */}
        <div className=" mb-8 w-4/5 max-w-4xl mt-8 mx-auto"> {/* Increased width */}
          <Slider {...sliderSettings}>
            {images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-96 rounded-lg shadow-md object-cover" // Increased height to h-96
                />
              </div>
            ))}
          </Slider>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
