import { useState } from 'react';
import './App.css';
import data from './conn/example_data.json';
import myImage from "./assets/images/logo.png";
import myImagelist from "./assets/images/list.jpg";
import { FiBell } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import myImagelogo from "./assets/images/logo.png";
import { FiSearch } from 'react-icons/fi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FaCircle } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('restaurant');
  const [searchTerm, setSearchTerm] = useState(''); // สร้าง state สำหรับการค้นหา
  const navigate = useNavigate();

  const handleBoxClick = (id) => {
    navigate(`/business/${id}`);
  };

  const formatTime = (time) => {
    if (time.toLowerCase() === 'closed') {
      return 'Closed';
    }

    const [hour, minute] = time.split(':');
    const hourInt = parseInt(hour, 10);
    const ampm = hourInt >= 12 ? 'PM' : 'AM';
    const formattedHour = hourInt % 12 || 12;
    return `${formattedHour}:${minute} ${ampm}`;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // กรองข้อมูลตามหมวดหมู่และชื่อที่ค้นหา
  const filteredData = data.filter(business =>
    business.categories.includes(selectedCategory) &&
    business.name.toLowerCase().includes(searchTerm.toLowerCase()) // กรองตามชื่อ
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="container">
        <div className="navbar-top">
          <div className="navbar-top-logo-start">
            <img src={myImagelogo} alt="Description of image" />
          </div>
          <div className='navbar-top-profile'>
            <div className='navbar-top-icons'>
              <FiBell className='navbar-top-icons-fibell' style={{ color: 'white', fontSize: '20px' }} />
            </div>
            <div className="navbar-top-logo">
              <img src={myImagelogo} alt="Description of image" />
            </div>
            <a href="#about" className='name-profile'>Akkarapol</a>
            <FiChevronDown className='navbar-top-icons-fichevroDowm' style={{ color: 'white', fontSize: '15px', marginLeft: '20px' }} />
          </div>
        </div>
        <div className="navbar-left">
          <div className='navbar-left-logo'>
            <img src={myImage} alt="Description of image" />
          </div>
          <div>
            <hr />
          </div>
          <div className='navbar-left-list'>
            <img src={myImagelist} alt="Description of image" />
            <p>Place</p>
          </div>
          <div>
            <hr />
          </div>
        </div>
        <div className="content">
          <div className="content-h">
            <h2 style={{ fontWeight: 'bold' }}>Place List</h2>
          </div>
          <div className="search">
            <div>
              <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="restaurant">Restaurant</option>
                <option value="cafe">Cafe</option>
                <option value="bakery">Bakery</option>
              </select>
            </div>
            <div>
              <span className="line"></span>
            </div>
            <div className="search-container">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search name..."
                  value={searchTerm} // ใช้ state สำหรับการค้นหา
                  onChange={(e) => setSearchTerm(e.target.value)} // อัปเดต state
                />
                <FiSearch className="search-icon" />
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex-container">
            {currentItems.map((business, index) => (
              <div key={index} className="box" onClick={() => handleBoxClick(business.id)} style={{ cursor: 'pointer' }}>
                <div className="box-top">
                  <img src={business.profile_image_url} alt={business.name} />
                  <div className="box-top-two">
                    <p>{business.name}</p>
                    <div className="box-top-three">
                      <div className='box-icon-font'>
                        <FontAwesomeIcon icon={faCalendarAlt} style={{ color: 'black', marginLeft: '20px' }} />
                        <div className="icon-box-one">
                          {business.operation_time
                            .find(day => day.day === 'Monday') ? (
                            <p>
                              {formatTime(business.operation_time.find(day => day.day === 'Monday').time_open)} - {formatTime(business.operation_time.find(day => day.day === 'Monday').time_close)}
                            </p>
                          ) : (
                            <p>Closed</p>
                          )}
                        </div>
                      </div>
                      <div className='box-icon-font-two'>
                        <div className="icon-box-two">
                          <FaCircle className='box-icon-font-two-facircle' />
                        </div>
                        <p>{business.rating}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="box-bottom">
                  <div className="image-gallery">
                    {business.images.map((image, idx) => (
                      <img
                        key={idx}
                        src={image}
                        alt={`Image ${idx + 1}`}
                        className="gallery-image"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}

          </div>

          {/* Pagination controls */}
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              <FiChevronLeft className='pagination-icon' />
            </button>
            <div className="pagination-font"><span>{currentPage}</span></div>

            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              <FiChevronRight className='pagination-icon' />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
