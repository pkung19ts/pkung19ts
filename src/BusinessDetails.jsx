import { useParams } from 'react-router-dom'; // ใช้ hook เพื่อดึงพารามิเตอร์จาก URL
import { FiBell, FiChevronLeft, FiChevronDown } from "react-icons/fi"; // ไอคอนที่ใช้ใน navbar
import { FaCircle } from 'react-icons/fa'; // ไอคอนวงกลม
import './BusinessDetails.css'; // นำเข้าไฟล์ CSS
import myImage from "./assets/images/logo.png"; // โลโก้ของร้าน
import myImagelist from "./assets/images/list.jpg"; // รูปภาพในเมนู
import myImagelogo from "./assets/images/logo.png"; // รูปโลโก้
import data from './conn/example_data.json'; // นำเข้าข้อมูลธุรกิจจาก JSON
import React, { useState, useEffect } from 'react'; // นำเข้า React และ hooks

function BusinessDetails() {
    const { id } = useParams(); // ดึง id จากเส้นทาง URL
    const business = data.find(b => b.id === parseInt(id)); // ค้นหาร้านตาม id

    const [activeTab, setActiveTab] = useState('information'); // เก็บสถานะของแท็บที่ถูกเลือก
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 376); // ตรวจสอบขนาดหน้าจอ

    // ฟังก์ชันเพื่อจัดรูปแบบเวลา
    const formatTime = (time) => {
        if (time.toLowerCase() === 'closed') return 'Closed'; // ถ้าร้านปิด

        const [hour, minute] = time.split(':'); // แบ่งเวลาเป็นชั่วโมงและนาที
        const hourInt = parseInt(hour, 10);
        const ampm = hourInt >= 12 ? 'PM' : 'AM'; // เช็ค AM/PM
        const formattedHour = hourInt % 12 || 12; // จัดรูปแบบชั่วโมง
        return `${formattedHour}:${minute} ${ampm}`; // ส่งคืนเวลาในรูปแบบที่ต้องการ
    };

    // ตรวจสอบขนาดหน้าจอเมื่อมีการเปลี่ยนแปลง
    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 376); // อัปเดตสถานะขนาดหน้าจอ
        };

        handleResize(); // ตรวจสอบขนาดหน้าจอเมื่อ component ถูก mount

        window.addEventListener('resize', handleResize); // ฟังเหตุการณ์การเปลี่ยนขนาดหน้าจอ

        return () => {
            window.removeEventListener('resize', handleResize); // ลบฟังเหตุการณ์เมื่อ component ถูก unmount
        };
    }, []);

    return (
        <div className="container-BusinessDetails">
            {/* navbartop */}
            <div className="navbar-top-BusinessDetails">
                <div className='navbar-top-profile'>
                    <div className='navbar-top-icons'>
                        <FiBell style={{ color: 'white', fontSize: '20px' }} /> {/* ไอคอนแจ้งเตือน */}
                    </div>
                    <div className="navbar-top-logo">
                        <img src={myImagelogo} alt="Description of image" /> {/* โลโก้ของโปรไฟล์ */}
                    </div>
                    <a href="#about">Akkarapol</a> {/* ชื่อผู้ใช้งาน */}
                    <FiChevronDown style={{ color: 'white', fontSize: '15px', marginLeft: '20px' }} /> {/* ไอคอนลูกศรลง */}
                </div>
            </div>
            {/* navbarleft */}
            <div className="navbar-left">
                <div className='navbar-left-logo'>
                    <img src={myImage} alt="Description of image" /> {/* โลโก้ของร้าน */}
                </div>
                <div>
                    <hr /> {/* เส้นแบ่ง */}
                </div>
                <div className='navbar-left-list'>
                    <img src={myImagelist} alt="Description of image" /> {/* รูปในเมนู */}
                    <p>Place</p> {/* ข้อความเมนู */}
                </div>
                <div>
                    <hr /> {/* เส้นแบ่ง */}
                </div>
            </div>
            {/* botton-back */}
            <div className="botton-back">
                <button onClick={() => window.history.back()}><FiChevronLeft style={{ fontSize: '18px' }} />BACK</button> {/* ปุ่มกลับ */}
            </div>

            {/* ฟังก์ชั่นเลือกระหว่าง INFORMATION และ IMAGE */}
            {isMobileView ? (
                <div>
                    <div className="tab-buttons">
                        <button
                            className={activeTab === 'information' ? 'active' : ''} // ตรวจสอบแท็บที่ถูกเลือก
                            onClick={() => setActiveTab('information')}
                        >
                            INFORMATION
                        </button>
                        <button
                            className={activeTab === 'image' ? 'active' : ''} // ตรวจสอบแท็บที่ถูกเลือก
                            onClick={() => setActiveTab('image')}
                        >
                            IMAGE
                        </button>
                    </div>
                    <div className="tab-content">
                        {activeTab === 'information' && (
                            <div className="content-box">
                                <div className="content-box1">
                                    <div className="content-box-imges">
                                        <img src={business.profile_image_url} alt={business.name} className="box-one-image" /> {/* รูปโปรไฟล์ */}
                                    </div>
                                    <div className="content-box-detail">
                                        <div className="content-box-name">
                                            <div className="name">
                                                <h2>{business.name}</h2> {/* ชื่อธุรกิจ */}
                                            </div>
                                            <div className="rating">
                                                <FaCircle /> {/* ไอคอนวงกลมสำหรับคะแนน */}
                                                <h2>{business.rating}</h2> {/* คะแนนธุรกิจ */}
                                            </div>
                                        </div>
                                        <div className="content-box-address">
                                            <div className="adress">
                                                <p>Address:</p> {/* ที่อยู่ */}
                                            </div>
                                            <div className="address-detail">
                                                <p>{business.address}</p> {/* รายละเอียดที่อยู่ */}
                                            </div>
                                        </div>
                                        <div className="content-box-time">
                                            <div className="time">
                                                <p>Opening Hour:</p> {/* ชั่วโมงเปิดทำการ */}
                                            </div>
                                            <div className="time-detail">
                                                {business.operation_time.map((day, index) => (
                                                    <div key={index}>
                                                        <p>
                                                            {day.day}: {day.time_open ? formatTime(day.time_open) : "Closed"} - {day.time_close ? formatTime(day.time_close) : ""} {/* ชั่วโมงทำการ */}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'image' && (
                            <div className="content-box2">
                                <div className="content-box-right">
                                    <p style={{ fontWeight: 'bold' }}>Images</p> {/* ส่วนแสดงรูปภาพ */}
                                </div>
                                <div className="content-box-right-imges">
                                    {business.images.map((image, idx) => (
                                        <img
                                            key={idx}
                                            src={image}
                                            alt={`Image ${idx + 1}`} // คำอธิบายรูปภาพ
                                            className="box-two-image"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="desktop-view">
                    <div className="content-box">
                        <div className="content-box1">
                            <div className="content-box-imges">
                                <img src={business.profile_image_url} alt={business.name} className="box-one-image" /> {/* รูปโปรไฟล์ */}
                            </div>
                            <div className="content-box-detail">
                                <div className="content-box-name">
                                    <div className="name">
                                        <h2>{business.name}</h2> {/* ชื่อธุรกิจ */}
                                    </div>
                                    <div className="rating">
                                        <FaCircle /> {/* ไอคอนวงกลมสำหรับคะแนน */}
                                        <h2>{business.rating}</h2> {/* คะแนนธุรกิจ */}
                                    </div>
                                </div>
                                <div className="content-box-address">
                                    <div className="adress">
                                        <p>Address:</p> {/* ที่อยู่ */}
                                    </div>
                                    <div className="address-detail">
                                        <p>{business.address}</p> {/* รายละเอียดที่อยู่ */}
                                    </div>
                                </div>
                                <div className="content-box-time">
                                    <div className="time">
                                        <p>Opening Hour:</p> {/* ชั่วโมงเปิดทำการ */}
                                    </div>
                                    <div className="time-detail">
                                        {business.operation_time.map((day, index) => (
                                            <div key={index}>
                                                <p>
                                                    {day.day}: {day.time_open ? formatTime(day.time_open) : "Closed"} - {day.time_close ? formatTime(day.time_close) : ""} {/* ชั่วโมงทำการ */}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content-box2">
                            <div className="content-box-right">
                                <p style={{ fontWeight: 'bold' }}>Images</p> {/* ส่วนแสดงรูปภาพ */}
                            </div>
                            <div className="content-box-right-imges">
                                {business.images.map((image, idx) => (
                                    <img
                                        key={idx}
                                        src={image}
                                        alt={`Image ${idx + 1}`} // คำอธิบายรูปภาพ
                                        className="box-two-image"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BusinessDetails; // ส่งออก component
