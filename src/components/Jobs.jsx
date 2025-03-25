import { Component } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link,useParams } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import Header from "./Header";

class Jobs extends Component {
  state = {
    allJobs: [],
    filteredJobs: [],
    searchInput: "",
    employmentTypes: new Set(),
    selectedSalary: "",
    isLoading: false,
    jobsError: false,
  };

  componentDidMount() {
    this.fetchJobs();
  }

  fetchJobs = async () => {
    this.setState({ isLoading: true, jobsError: false });

    try {
      const response = await fetch("./db.json");
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      this.setState(
        { allJobs: data.jobs, filteredJobs: data.jobs, isLoading: false },
        this.filterJobs
      );
    } catch {
      this.setState({ jobsError: true, isLoading: false });
    }
  };

  handleEmploymentChange = (e) => {
    const { employmentTypes } = this.state;
    const newTypes = new Set(employmentTypes);

    e.target.checked
      ? newTypes.add(e.target.value)
      : newTypes.delete(e.target.value);
    this.setState({ employmentTypes: newTypes }, this.filterJobs);
  };

  handleSalaryChange = (e) => {
    this.setState({ selectedSalary: e.target.value }, this.filterJobs);
  };

  changeSearchInput = (e) => {
    this.setState({ searchInput: e.target.value }, this.filterJobs);
  };

  filterJobs = () => {
    const { allJobs, searchInput, employmentTypes, selectedSalary } = this.state;

    const filteredJobs = allJobs.filter((job) => {
      const jobLPA = parseFloat(job.package_per_annum.split(" ")[0]);
      const selectedLPA = selectedSalary ? parseFloat(selectedSalary) : 0;

      return (
        (searchInput === "" ||
          job.title.toLowerCase().includes(searchInput.toLowerCase())) &&
        (employmentTypes.size === 0 || employmentTypes.has(job.employment_type)) &&
        (selectedSalary === "" || jobLPA >= selectedLPA)
      );
    });

    this.setState({ filteredJobs });
  };

  render() {
    const {
      searchInput,
      isLoading,
      jobsError,
      selectedSalary,
      filteredJobs,
    } = this.state;

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Section */}
            <div className="w-full lg:w-1/4 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Type of Employment</h2>
                <div className="space-y-3">
                  {["FULLTIME", "PARTTIME", "FREELANCE", "INTERNSHIP"].map((type) => (
                    <div key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        id={type}
                        value={type}
                        onChange={this.handleEmploymentChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={type} className="ml-3 text-sm text-gray-700">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Salary Range</h2>
                <div className="space-y-3">
                  {[10, 15, 20, 25].map((lpa) => (
                    <div key={lpa} className="flex items-center">
                      <input
                        type="radio"
                        id={`salary-${lpa}`}
                        name="salary"
                        value={String(lpa)}
                        checked={selectedSalary === String(lpa)}
                        onChange={this.handleSalaryChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor={`salary-${lpa}`} className="ml-3 text-sm text-gray-700">
                        {`${lpa} LPA and above`}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Jobs List Section */}
            <div className="w-full lg:w-3/4">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex">
                  <input
                    type="search"
                    value={searchInput}
                    onChange={this.changeSearchInput}
                    placeholder="Search jobs..."
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <BsSearch className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <ThreeDots color="#0b69ff" height={50} width={50} />
                </div>
              ) : jobsError ? (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                    alt="failure view"
                    className="mx-auto h-40 mb-4"
                  />
                  <h1 className="text-xl font-semibold mb-2 text-gray-800">Oops! Something Went Wrong</h1>
                  <p className="text-gray-600 mb-4">We cannot seem to find the page you are looking for.</p>
                  <button 
                    onClick={this.fetchJobs}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <Link 
                        to={`/jobs/${job.id}`} 
                        key={job.id} 
                        className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex flex-col sm:flex-row">
                          <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                            <img
                              src={job.company_logo_url}
                              alt="Company Logo"
                              className="h-16 w-16 object-contain"
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                              <div>
                                <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
                                <p className="text-gray-600 mt-1 flex items-center">
                                  <span className="mr-2">⭐ {job.rating}</span>
                                </p>
                              </div>
                              <div className="mt-2 sm:mt-0">
                                <p className="text-lg font-medium text-gray-900">{job.package_per_annum}</p>
                              </div>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-4">
                              <div className="flex items-center text-gray-600">
                                <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {job.location}
                              </div>
                              <div className="flex items-center text-gray-600">
                                <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {job.employment_type}
                              </div>
                            </div>
                            <hr className="my-4" />
                            <h3 className="text-lg font-medium text-gray-800 mb-2">Description</h3>
                            <p className="text-gray-600 line-clamp-2">{job.job_description}</p>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                        alt="no jobs"
                        className="mx-auto h-40 mb-4"
                      />
                      <h1 className="text-xl font-semibold mb-2 text-gray-800">No Jobs Found</h1>
                      <p className="text-gray-600">We could not find any jobs. Try other filters.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Jobs;