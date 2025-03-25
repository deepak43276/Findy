import React, { Component } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaCheckCircle } from "react-icons/fa";

class JobItemDetails extends Component {
  state = {
    jobDetails: null,
    loading: true,
    error: null,
    applied: false
  };

  componentDidMount() {
    this.fetchJobDetails();
  }

  fetchJobDetails = async () => {
    try {
      const response = await fetch("/db.json");
      if (!response.ok) throw new Error("Failed to fetch jobs");

      const data = await response.json();
      const { id } = this.props.params;
      const job = data.jobs.find((job) => job.id === id);

      if (!job) throw new Error("Job not found");

      this.setState({ jobDetails: job, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  handleApplyNow = () => {
    this.setState({ applied: true }, () => {
      setTimeout(() => {
        this.setState({ applied: false });
      }, 3000);
    });
  };

  render() {
    const { jobDetails, loading, error, applied } = this.state;

    if (loading) return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
          <div className="animate-pulse flex flex-col items-center space-y-4">
            <div className="h-12 w-12 bg-blue-200 rounded-full"></div>
            <div className="h-6 w-64 bg-gray-200 rounded"></div>
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );

    if (error) return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );

    if (!jobDetails) return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
          <p className="text-gray-600 text-lg">No job details found.</p>
        </div>
      </div>
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        
        {/* Success Notification */}
        {applied && (
          <div className="fixed top-6 right-6 z-50 animate-fade-in-down">
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 flex items-center shadow-lg rounded-lg">
              <FaCheckCircle className="mr-2 text-xl" />
              <span>Application submitted successfully!</span>
            </div>
          </div>
        )}
        
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <div className="md:flex">
              {/* Left Column */}
              <div className="md:w-1/3 bg-blue-50 p-8 flex flex-col items-center justify-center">
                <div className="mb-6">
                  <img
                    src={jobDetails.company_logo_url}
                    alt="Company Logo"
                    className="h-32 w-32 object-contain mx-auto rounded-lg bg-white p-4 shadow-md"
                  />
                </div>
                
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">{jobDetails.title}</h1>
                <p className="text-xl font-semibold text-blue-600 mb-6">{jobDetails.package_per_annum}</p>
                
                <div className="space-y-3 w-full max-w-xs">
                  <div className="flex items-center text-gray-600">
                    <FaBriefcase className="mr-2 text-blue-500" />
                    <span>{jobDetails.employment_type}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="mr-2 text-blue-500" />
                    <span>{jobDetails.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaMoneyBillWave className="mr-2 text-blue-500" />
                    <span>{jobDetails.package_per_annum} per annum</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaClock className="mr-2 text-blue-500" />
                    <span>Posted 2 days ago</span>
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="md:w-2/3 p-8">
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Job Description</h3>
                  <p className="text-gray-700 leading-relaxed">{jobDetails.job_description}</p>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {jobDetails.requirements?.map((req, index) => (
                      <li key={index}>{req}</li>
                    )) || <li>No specific requirements listed</li>}
                  </ul>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Benefits</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {jobDetails.benefits?.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    )) || <li>Competitive salary and benefits package</li>}
                  </ul>
                </div>
                
                <div className="flex justify-center mt-8">
                  <button
                    onClick={this.handleApplyNow}
                    disabled={applied}
                    className={`px-8 py-3 text-lg rounded-md shadow-md transition-all duration-300 transform hover:scale-105 ${
                      applied 
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                    }`}
                  >
                    {applied ? 'Applied Successfully!' : 'Apply Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default (props) => <JobItemDetails {...props} params={useParams()} />;