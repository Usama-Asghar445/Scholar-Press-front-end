import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaTimes,
  FaBars,
  FaSearch,
  FaBook,
  FaUsers,
  FaGlobe,
  FaPaperPlane,
  FaArrowRight,
  FaChevronDown,
  FaQuoteLeft,
  FaStar,
  FaDownload,
  FaEye,
  FaCalendarAlt,
  FaUserGraduate,
  FaCheckCircle,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Home = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isJournalsOpen, setIsJournalsOpen] = useState(false);
  const [isAuthorsOpen, setIsAuthorsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [email, setEmail] = useState("");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Featured Journals Data
  const featuredJournals = [
    {
      id: 1,
      title: "Advanced Machine Learning in Healthcare",
      authors: "Dr. Sarah Johnson, Dr. Michael Chen",
      journal: "Journal of AI & Medicine",
      abstract: "This comprehensive study explores the application of deep learning algorithms in diagnostic imaging and patient outcome prediction...",
      category: "Computer Science",
      date: "Dec 2024",
      citations: 156,
      downloads: 2340,
      isOpenAccess: true,
    },
    {
      id: 2,
      title: "Climate Change Impact on Marine Ecosystems",
      authors: "Prof. Emily Watson, Dr. James Liu",
      journal: "Environmental Science Review",
      abstract: "An in-depth analysis of rising ocean temperatures and their cascading effects on marine biodiversity and coastal communities...",
      category: "Environmental Science",
      date: "Nov 2024",
      citations: 89,
      downloads: 1560,
      isOpenAccess: true,
    },
    {
      id: 3,
      title: "Quantum Computing: Breaking New Barriers",
      authors: "Dr. Robert Miller, Dr. Anna Schmidt",
      journal: "Physics & Technology Quarterly",
      abstract: "Revolutionary approaches to quantum error correction and their implications for practical quantum computing applications...",
      category: "Physics",
      date: "Oct 2024",
      citations: 203,
      downloads: 3120,
      isOpenAccess: false,
    },
  ];

  // Latest Publications Data
  const latestPublications = [
    {
      id: 1,
      title: "Neural Networks in Financial Forecasting",
      author: "Dr. David Brown",
      journal: "Journal of Financial Technology",
      views: 1250,
      date: "2 days ago",
    },
    {
      id: 2,
      title: "Sustainable Energy Solutions for Urban Areas",
      author: "Prof. Maria Garcia",
      journal: "Green Energy Research",
      views: 980,
      date: "3 days ago",
    },
    {
      id: 3,
      title: "Gene Therapy Advances in Rare Diseases",
      author: "Dr. Jennifer Lee",
      journal: "Medical Genetics Today",
      views: 1580,
      date: "4 days ago",
    },
    {
      id: 4,
      title: "Blockchain Technology in Supply Chain",
      author: "Dr. Thomas Anderson",
      journal: "Business Technology Review",
      views: 720,
      date: "5 days ago",
    },
    {
      id: 5,
      title: "Psychological Effects of Remote Work",
      author: "Prof. Rachel Kim",
      journal: "Journal of Workplace Psychology",
      views: 1120,
      date: "1 week ago",
    },
    {
      id: 6,
      title: "Nanotechnology in Drug Delivery Systems",
      author: "Dr. Kevin Zhang",
      journal: "Pharmaceutical Sciences",
      views: 890,
      date: "1 week ago",
    },
  ];

  // Statistics Data
  const statistics = [
    { number: "50,000+", label: "Published Articles" },
    { number: "120+", label: "Countries Reached" },
    { number: "15,000+", label: "Active Researchers" },
    { number: "500+", label: "Partner Institutions" },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-50">
      {/* ==================== TOP BAR ==================== */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-2 gap-2">
            {/* Left Side - Contact Info */}
            <div className="hidden md:flex items-center flex-wrap gap-4 text-gray-300 text-xs lg:text-sm">
              <div className="flex items-center gap-2 hover:text-amber-500 transition-colors cursor-pointer">
                <MdPhone className="text-amber-500 text-lg" />
                <span>+1 234 567 890</span>
              </div>
              <div className="flex items-center gap-2 hover:text-amber-500 transition-colors cursor-pointer">
                <MdEmail className="text-amber-500 text-lg" />
                <span>info@scholarspress.com</span>
              </div>
              <div className="flex items-center gap-2 hover:text-amber-500 transition-colors cursor-pointer">
                <MdLocationOn className="text-amber-500 text-lg" />
                <span>123 Academic Avenue, NY</span>
              </div>
            </div>

            {/* Right Side - Social Icons */}
            <div className="flex items-center space-x-3">
              <a href="#" className="group" aria-label="Facebook">
                <FaFacebook className="text-gray-300 text-lg lg:text-xl hover:text-amber-500 transform hover:scale-110 transition-all duration-300" />
              </a>
              <a href="#" className="group" aria-label="Twitter">
                <FaTwitter className="text-gray-300 text-lg lg:text-xl hover:text-amber-500 transform hover:scale-110 transition-all duration-300" />
              </a>
              <a href="#" className="group" aria-label="Instagram">
                <FaInstagram className="text-gray-300 text-lg lg:text-xl hover:text-amber-500 transform hover:scale-110 transition-all duration-300" />
              </a>
              <a href="#" className="group" aria-label="LinkedIn">
                <FaLinkedin className="text-gray-300 text-lg lg:text-xl hover:text-amber-500 transform hover:scale-110 transition-all duration-300" />
              </a>
              <a href="#" className="group" aria-label="YouTube">
                <FaYoutube className="text-gray-300 text-lg lg:text-xl hover:text-amber-500 transform hover:scale-110 transition-all duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== MAIN HEADER ==================== */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 lg:py-4">
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-2 lg:space-x-3 flex-shrink-0">
              <img
                src="/assets/logo1.png"
                alt="Scholars Press"
                className="h-12 sm:h-14 lg:h-16 w-auto object-contain"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/60x60?text=SP";
                }}
              />
              <div className="hidden sm:block">
                <h1 className="text-lg lg:text-2xl font-bold text-gray-800">
                  <span className="text-amber-500">Scholars</span> Press
                </h1>
                <p className="text-xs text-gray-500">Excellence in Research</p>
              </div>
            </Link>

            {/* Navigation Menu - Desktop */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-amber-500 font-medium transition-colors duration-300 relative group whitespace-nowrap"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
              </Link>

              {/* Journals Dropdown */}
              <div className="relative group">
                <button className="text-gray-700 hover:text-amber-500 font-medium transition-colors duration-300 flex items-center gap-1 whitespace-nowrap">
                  Journals
                  <FaChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 mt-2 border border-gray-100 overflow-hidden">
                  <Link to="/journals" className="block px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-500 transition-colors border-b border-gray-50">
                    All Journals
                  </Link>
                  <Link to="/journals/category" className="block px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-500 transition-colors border-b border-gray-50">
                    By Category
                  </Link>
                  <Link to="/journals/latest" className="block px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-500 transition-colors border-b border-gray-50">
                    Latest Publications
                  </Link>
                  <Link to="/journals/top-cited" className="block px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-500 transition-colors">
                    Top Cited
                  </Link>
                </div>
              </div>

              {/* Authors Dropdown */}
              <div className="relative group">
                <button className="text-gray-700 hover:text-amber-500 font-medium transition-colors duration-300 flex items-center gap-1 whitespace-nowrap">
                  Authors
                  <FaChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 mt-2 border border-gray-100 overflow-hidden">
                  <Link to="/submit-paper" className="block px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-500 transition-colors border-b border-gray-50">
                    Submit Paper
                  </Link>
                  <Link to="/author-guidelines" className="block px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-500 transition-colors border-b border-gray-50">
                    Author Guidelines
                  </Link>
                  <Link to="/peer-review" className="block px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-500 transition-colors">
                    Peer Review Process
                  </Link>
                </div>
              </div>

              <Link
                to="/resources"
                className="text-gray-700 hover:text-amber-500 font-medium transition-colors duration-300 relative group whitespace-nowrap"
              >
                Resources
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                to="/library"
                className="text-gray-700 hover:text-amber-500 font-medium transition-colors duration-300 relative group whitespace-nowrap"
              >
                Library
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                to="/about"
                className="text-gray-700 hover:text-amber-500 font-medium transition-colors duration-300 relative group whitespace-nowrap"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                to="/contact"
                className="text-gray-700 hover:text-amber-500 font-medium transition-colors duration-300 relative group whitespace-nowrap"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>

            {/* CTA Buttons - Desktop */}
            <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
              <Link
                to="/user/login"
                className="px-4 py-2 text-amber-500 border-2 border-amber-500 rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300 text-sm font-medium whitespace-nowrap"
              >
                Author Portal
              </Link>
              <Link
                to="/submit-paper"
                className="px-4 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transform hover:scale-105 transition-all duration-300 shadow-md text-sm font-medium whitespace-nowrap flex items-center gap-2"
              >
                <FaPaperPlane className="w-3 h-3" />
                Submit Paper
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-gray-700 hover:text-amber-500 p-2 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
            isMobileMenuOpen ? "visible" : "invisible"
          }`}
        >
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              isMobileMenuOpen ? "opacity-50" : "opacity-0"
            }`}
            onClick={toggleMobileMenu}
          ></div>

          <div
            className={`absolute right-0 top-0 h-full w-72 sm:w-80 bg-white shadow-2xl transform transition-transform duration-300 overflow-hidden ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-amber-500">
              <h2 className="text-xl font-bold text-white">Menu</h2>
              <button
                onClick={toggleMobileMenu}
                className="text-white hover:text-amber-100 p-2"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            <nav className="p-4 overflow-y-auto h-full pb-32">
              <Link
                to="/"
                onClick={toggleMobileMenu}
                className="block py-3 text-gray-700 hover:text-amber-500 font-medium border-b border-gray-100"
              >
                Home
              </Link>

              {/* Journals Mobile Dropdown */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => setIsJournalsOpen(!isJournalsOpen)}
                  className="flex justify-between items-center w-full py-3 text-gray-700 hover:text-amber-500 font-medium"
                >
                  Journals
                  <FaChevronDown
                    className={`w-4 h-4 transition-transform ${isJournalsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${isJournalsOpen ? "max-h-48" : "max-h-0"}`}
                >
                  <Link to="/journals" onClick={toggleMobileMenu} className="block py-2 pl-4 text-gray-600 hover:text-amber-500">
                    All Journals
                  </Link>
                  <Link to="/journals/category" onClick={toggleMobileMenu} className="block py-2 pl-4 text-gray-600 hover:text-amber-500">
                    By Category
                  </Link>
                  <Link to="/journals/latest" onClick={toggleMobileMenu} className="block py-2 pl-4 text-gray-600 hover:text-amber-500">
                    Latest Publications
                  </Link>
                  <Link to="/journals/top-cited" onClick={toggleMobileMenu} className="block py-2 pl-4 text-gray-600 hover:text-amber-500">
                    Top Cited
                  </Link>
                </div>
              </div>

              {/* Authors Mobile Dropdown */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => setIsAuthorsOpen(!isAuthorsOpen)}
                  className="flex justify-between items-center w-full py-3 text-gray-700 hover:text-amber-500 font-medium"
                >
                  Authors
                  <FaChevronDown
                    className={`w-4 h-4 transition-transform ${isAuthorsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${isAuthorsOpen ? "max-h-48" : "max-h-0"}`}
                >
                  <Link to="/submit-paper" onClick={toggleMobileMenu} className="block py-2 pl-4 text-gray-600 hover:text-amber-500">
                    Submit Paper
                  </Link>
                  <Link to="/author-guidelines" onClick={toggleMobileMenu} className="block py-2 pl-4 text-gray-600 hover:text-amber-500">
                    Author Guidelines
                  </Link>
                  <Link to="/peer-review" onClick={toggleMobileMenu} className="block py-2 pl-4 text-gray-600 hover:text-amber-500">
                    Peer Review Process
                  </Link>
                </div>
              </div>

              <Link to="/resources" onClick={toggleMobileMenu} className="block py-3 text-gray-700 hover:text-amber-500 font-medium border-b border-gray-100">
                Resources
              </Link>
              <Link to="/library" onClick={toggleMobileMenu} className="block py-3 text-gray-700 hover:text-amber-500 font-medium border-b border-gray-100">
                Library
              </Link>
              <Link to="/about" onClick={toggleMobileMenu} className="block py-3 text-gray-700 hover:text-amber-500 font-medium border-b border-gray-100">
                About
              </Link>
              <Link to="/contact" onClick={toggleMobileMenu} className="block py-3 text-gray-700 hover:text-amber-500 font-medium border-b border-gray-100">
                Contact
              </Link>

              {/* Mobile CTA Buttons */}
              <div className="mt-6 space-y-3">
                <Link
                  to="/user/login"
                  onClick={toggleMobileMenu}
                  className="block w-full px-4 py-3 text-center text-amber-500 border-2 border-amber-500 rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300 font-medium"
                >
                  Author Portal
                </Link>
                <Link
                  to="/submit-paper"
                  onClick={toggleMobileMenu}
                  className="block w-full px-4 py-3 text-center bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all duration-300 font-medium shadow-md"
                >
                  Submit Paper
                </Link>
              </div>

              {/* Mobile Contact Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-500 mb-4">CONTACT US</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <MdPhone className="text-amber-500" />
                    <span>+1 234 567 890</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MdEmail className="text-amber-500" />
                    <span>info@scholarspress.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MdLocationOn className="text-amber-500" />
                    <span>123 Academic Avenue</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-6">
                  <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                    <FaFacebook className="text-xl" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                    <FaTwitter className="text-xl" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                    <FaInstagram className="text-xl" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                    <FaLinkedin className="text-xl" />
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 sm:py-20 lg:py-28 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <FaStar className="w-4 h-4" />
              <span>Trusted by 15,000+ Researchers Worldwide</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Discover, Publish & Access
              <span className="block text-amber-500 mt-2">World-Class Research</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10 px-4">
              Empowering researchers and scholars worldwide to advance knowledge through peer-reviewed publications and open access resources.
            </p>

            {/* Hero Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 mb-12">
              <Link
                to="/search"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transform hover:scale-105 transition-all duration-300 shadow-lg font-semibold text-lg"
              >
                <FaSearch className="w-5 h-5" />
                Search Articles
              </Link>
              <Link
                to="/submit-paper"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 font-semibold text-lg"
              >
                <FaPaperPlane className="w-5 h-5" />
                Submit Paper
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {statistics.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-500">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SEARCH SECTION ==================== */}
      <section className="py-12 bg-white -mt-8 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Find Research Papers, Journals & Articles
            </h2>
            
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by keyword, author, DOI, or journal..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all bg-gray-50 hover:bg-white"
                />
              </div>
              
              {/* Filter Dropdown */}
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all bg-gray-50 hover:bg-white cursor-pointer"
              >
                <option value="all">All Fields</option>
                <option value="medicine">Medicine & Health</option>
                <option value="technology">Technology</option>
                <option value="science">Natural Sciences</option>
                <option value="social">Social Sciences</option>
                <option value="arts">Arts & Humanities</option>
              </select>
              
              {/* Search Button */}
              <button className="px-8 py-4 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all duration-300 font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                <FaSearch className="w-4 h-4" />
                Search
              </button>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-sm text-gray-500">Popular:</span>
              {["Open Access", "Most Cited", "Recent", "Peer Reviewed"].map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1 text-sm bg-amber-50 text-amber-600 rounded-full hover:bg-amber-100 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURED JOURNALS SECTION ==================== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Featured <span className="text-amber-500">Journals</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our collection of peer-reviewed journals from leading researchers across various disciplines.
            </p>
          </div>

          {/* Featured Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredJournals.map((journal) => (
              <div
                key={journal.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-amber-400 bg-amber-400/20 px-2 py-1 rounded">
                      {journal.category}
                    </span>
                    {journal.isOpenAccess && (
                      <span className="text-xs font-medium text-green-400 bg-green-400/20 px-2 py-1 rounded flex items-center gap-1">
                        <FaCheckCircle className="w-3 h-3" />
                        Open Access
                      </span>
                    )}
                  </div>
                  <h3 className="text-white font-bold text-lg line-clamp-2 group-hover:text-amber-400 transition-colors">
                    {journal.title}
                  </h3>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <p className="text-sm text-gray-500 mb-2">{journal.journal}</p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Authors:</span> {journal.authors}
                  </p>
                  <p className="text-gray-600 text-sm mt-3 line-clamp-3">
                    {journal.abstract}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FaQuoteLeft className="w-3 h-3 text-amber-500" />
                      {journal.citations} Citations
                    </span>
                    <span className="flex items-center gap-1">
                      <FaDownload className="w-3 h-3 text-amber-500" />
                      {journal.downloads}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="w-3 h-3 text-amber-500" />
                      {journal.date}
                    </span>
                  </div>

                  {/* Read More Button */}
                  <Link
                    to={`/journal/${journal.id}`}
                    className="mt-4 inline-flex items-center gap-2 text-amber-500 hover:text-amber-600 font-medium text-sm group-hover:gap-3 transition-all"
                  >
                    Read More
                    <FaArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-10">
            <Link
              to="/journals"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
            >
              View All Journals
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES / BENEFITS SECTION ==================== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Why Choose <span className="text-amber-500">Scholars Press</span>?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide a comprehensive platform for researchers to publish, discover, and access quality academic content.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-amber-100 text-center group">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <FaBook className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Quality Research</h3>
              <p className="text-gray-600 text-sm">
                All publications undergo rigorous peer-review by expert scholars in respective fields.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-amber-100 text-center group">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <FaUserGraduate className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Expert Editorial Board</h3>
              <p className="text-gray-600 text-sm">
                Renowned academics and industry experts review and guide publications.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-amber-100 text-center group">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <FaGlobe className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Global Access</h3>
              <p className="text-gray-600 text-sm">
                Connect with researchers from 120+ countries and expand your academic reach.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-amber-100 text-center group">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <FaPaperPlane className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Easy Submission</h3>
              <p className="text-gray-600 text-sm">
                Quick and intuitive submission process with dedicated author support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== LATEST PUBLICATIONS SECTION ==================== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                Latest <span className="text-amber-500">Publications</span>
              </h2>
              <p className="text-gray-600">Stay updated with the newest research in your field.</p>
            </div>
            <Link
              to="/publications"
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-amber-500 hover:text-amber-600 font-medium"
            >
              View All
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Publications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPublications.map((pub) => (
              <div
                key={pub.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-5 border border-gray-100 group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 transition-colors">
                    <FaBook className="w-5 h-5 text-amber-500 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-amber-500 transition-colors">
                      {pub.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{pub.author}</p>
                    <p className="text-xs text-amber-600 font-medium">{pub.journal}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaEye className="w-3 h-3" />
                        {pub.views} views
                      </span>
                      <span>{pub.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== NEWSLETTER SECTION ==================== */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 sm:p-12">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <MdEmail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Stay Updated with Latest Research
            </h2>
            <p className="text-amber-100 mb-8 max-w-xl mx-auto">
              Subscribe to our newsletter for new publications, call for papers, and research updates delivered to your inbox.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-5 py-4 rounded-lg border-2 border-white/30 bg-white/20 text-white placeholder-amber-100 focus:outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-amber-500 rounded-lg hover:bg-amber-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
              >
                Subscribe
              </button>
            </form>

            <p className="text-amber-100/80 text-sm mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-gray-900 text-gray-300">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* About Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="/assets/logo1.png"
                  alt="Scholars Press"
                  className="h-12 w-auto"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/48x48?text=SP";
                  }}
                />
                <div>
                  <h3 className="text-xl font-bold text-white">
                    <span className="text-amber-500">Scholars</span> Press
                  </h3>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                A leading platform for academic publishing, connecting researchers worldwide to advance knowledge and innovation.
              </p>
              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
                  <FaFacebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
                  <FaLinkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
                  <FaYoutube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["Home", "About Us", "Journals", "Submit Paper", "Author Guidelines", "Contact"].map((link) => (
                  <li key={link}>
                    <Link to="#" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                {["Research Tools", "Datasets", "Library Archives", "Open Access", "Peer Review", "Editorial Board"].map((link) => (
                  <li key={link}>
                    <Link to="#" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MdLocationOn className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-400">123 Academic Avenue, Suite 100, New York, NY 10001</span>
                </div>
                <div className="flex items-center gap-3">
                  <MdPhone className="w-5 h-5 text-amber-500" />
                  <span className="text-sm text-gray-400">+1 (234) 567-890</span>
                </div>
                <div className="flex items-center gap-3">
                  <MdEmail className="w-5 h-5 text-amber-500" />
                  <span className="text-sm text-gray-400">info@scholarspress.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500">
                © 2025 Scholars Press. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <Link to="/terms" className="text-sm text-gray-500 hover:text-amber-500 transition-colors">
                  Terms of Service
                </Link>
                <Link to="/privacy" className="text-sm text-gray-500 hover:text-amber-500 transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/cookies" className="text-sm text-gray-500 hover:text-amber-500 transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;