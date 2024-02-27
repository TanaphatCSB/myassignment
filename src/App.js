import React, { useState } from "react";
import './App.css';
import videoFile from './picture/video.mp4';
import Result from './Result.js';
import { format } from 'date-fns';
//  import { th } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import th from 'date-fns/locale/th'; // นำเข้าไฟล์ locale ภาษาไทย



function App() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [idCard, setIdCard] = useState("");
  const [gender, setGender] = useState(""); 
  const [birthday, setBirthday] = useState(""); 
  const [showResult, setShowResult] = useState(false); 
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [idCardError, setIdCardError] = useState('');

  const handleNameChange = (e) => {
    const regex = /^[a-zA-Z\u0E00-\u0E7F\s]+$/;
    const value = e.target.value;

    if (!regex.test(value) && value !== '') {
      setNameError('กรุณากรอกเฉพาะตัวอักษรเท่านั้น');
    } else {
      setNameError('');
      setName(value);
    }
  };

  const handleSurnameChange = (e) => {
    const regex = /^[a-zA-Z\u0E00-\u0E7F\s]+$/;
    const value = e.target.value;

    if (!regex.test(value) && value !== '') {
      setSurnameError('กรุณากรอกเฉพาะตัวอักษรเท่านั้น');
    } else {
      setSurnameError('');
      setSurname(value);
    }
  };
  
  
  
  const handleConfirm = () => {
    setShowModal(false);
    setShowResult(true); 
  };

  const handleReset = () => {
    setName("");
    setSurname("");
    setIdCard("");
    setGender("");
    setBirthday("");
    setShowResult(false); // Reset การแสดงผล
  }


  const confirmData = () => {
    // ตรวจสอบข้อมูลและแสดง Modal เมื่อข้อมูลถูกต้อง
    if (name === "" || surname === "" || idCard === "" || gender === "" || birthday === "") {
      setShowAlert(true);
    } else if (!checkIdCardError(idCard)) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      setShowModal(true);
    }
  };
  

  const formatIdCard = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{1})?(\d{4})?(\d{5})?(\d{2})?(\d{1})?/, function(match, p1, p2, p3, p4, p5) {
      var parts = [];
      if (p1) parts.push(p1);
      if (p2) parts.push(p2);
      if (p3) parts.push(p3);
      if (p4) parts.push(p4);
      if (p5) parts.push(p5);
      return parts.join('-');
    });
  }

 

 
  const checkIdCardError = (value) => {
    const idCardPattern = /^\d{1}-\d{4}-\d{5}-\d{2}-\d{1}$/;
    if (!idCardPattern.test(value) && value !== '') {
      setIdCardError('รูปแบบที่ป้อนไม่ถูกต้อง');
      return false; // รูปแบบไม่ถูกต้อง
    } else {
      setIdCardError('');
      return true; // รูปแบบถูกต้อง
    }
  }
 
  const handleIdCardChange = (e) => {
    const { value } = e.target;
    const formattedIdCard = formatIdCard(value);
    setIdCard(formattedIdCard);
    checkIdCardError(formattedIdCard);
  }


  const getThaiGender = (gender) => {
    return gender === 'male' ? 'ชาย' : gender === 'female' ? 'หญิง' : gender === 'more' ? 'อื่นๆ':'';
  };

  const getThaiBirthDate = (birthdate) => {
  const formattedDate = new Date(birthdate);
  const thaiYear = formattedDate.getFullYear() + 543;
  return format(formattedDate, 'dd MMMM', { locale: th }) + ` พ.ศ. ${thaiYear}`;
};
 

  const checkServiceStatus = () => {
    if (gender && birthday) {
      // หาอายุของผู้ใช้
      const today = new Date();
      const birthDate = new Date(birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
  
      // เพิ่มเงื่อนไขการเข้ารับบริการในช่วงวันที่ที่ต้องการ
      const startDate = new Date('2566-06-01'); // วันที่เริ่มต้น
      const endDate = new Date('2566-08-31'); // วันที่สิ้นสุด
      if (birthDate >= startDate && birthDate <= endDate) {
        return <p style={{ color: "green" }}>สามารถเข้ารับบริการได้</p>;
      }
      
      // ตรวจสอบเงื่อนไขการเข้ารับบริการ
      if ((age > 65 && (gender === 'male' || gender === 'female')) || (age >= 0.5 && age <= 2)) {
        return <p style={{ color: "green" }}>สามารถเข้ารับบริการได้ <br></br>ในช่วงวันที่ 1 มิถุนายน พ.ศ.2566 - 31 สิงหาคม พ.ศ 2566</p>;
      }

      else if (age < 0.5) {
        const sixMonthsDate = new Date(birthDate);
        sixMonthsDate.setMonth(sixMonthsDate.getMonth() + 6); // วันที่ที่ผู้ใช้มีอายุ 6 เดือน
        const sixMonthsMonthNamesThai = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน','กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
        const sixMonthsMonthIndex = sixMonthsDate.getMonth(); // ดัชนีของเดือน
        const sixMonthsMonth = sixMonthsMonthNamesThai[sixMonthsMonthIndex]; // เดือนที่ผู้ใช้มีอายุ 6 เดือนเป็นภาษาไทย
        const sixMonthsDay = sixMonthsDate.getDate(); // วันที่
        const sixMonthsYear = sixMonthsDate.getFullYear()  + 543; // ปีที่ผู้ใช้มีอายุ 6 เดือน
      
        return (
          <p style={{color: "red"}}>
            ไม่สามารถเข้ารับบริการได้<br></br>เนื่องจากอายุจะครบ 6 เดือนในวันที่ {sixMonthsDay} {sixMonthsMonth} พ.ศ. {sixMonthsYear}
          </p>
        );
      }
      
      else if (age >= 65) {
        const turning65Date = new Date(birthDate);
        turning65Date.setFullYear(turning65Date.getFullYear() + 65); // วันที่ที่จะครบ 65 ปี
        const turning65Day = turning65Date.getDate(); // วันที่
        const turning65MonthNamesThai = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน','กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
        const turning65MonthIndex = turning65Date.getMonth(); // ดัชนีของเดือน
        const turning65Month = turning65MonthNamesThai[turning65MonthIndex]; // เดือนที่จะครบ 65 ปีเป็นภาษาไทย
        const turning65Year = turning65Date.getFullYear() + 543; // ปีที่จะครบ 65 ปีเป็นพุทธศักราช
        return (
          <p style={{color: "red"}}>
            ไม่สามารถเข้ารับบริการได้เนื่องจากอายุจะครบ 65 ปีวันที่ {turning65Day} {turning65Month} พ.ศ. {turning65Year}
          </p>
        );
      }
      else {
        return <p style={{color: "red"}}>คุณไม่สามารถใช้บริการได้ <br></br> เนื่องจากอายุของคุณไม่อยู่ในเกณฑ์</p>;
      }
    } else {
      return null; // ถ้าข้อมูลไม่ครบถ้วน ไม่แสดงสถานะ
    }
  }


  

  return (
    <div>
    <video autoPlay loop muted className="video-bg">
    <source src={videoFile}type="video/mp4" />
    Your browser does not support the video tag.
  </video>
 
 
  {!showResult && (
        <div className="Formbg" style={{fontFamily: 'MyThaiFont' }}>
          <div className="myform">
            <h2>แบบฟอร์มลงทะเบียนฉีดวัคซีนโควิด-19 ช่วงวันที่ 1 มิ.ย 2566 - 31 ส.ค. 2566</h2>
            <div className="txtbox">
              <label>ชื่อ</label>
              <input  type="text"  name="name"  value={name}  onChange={handleNameChange} />
      {nameError && <p class ="err">{nameError}</p>}
            </div>

            <div className="txtbox">
              <label>นามสกุล</label>
              <input type="text"  name="surname"  value={surname}  onChange={handleSurnameChange} />
      {surnameError && <p class ="err">{surnameError}</p>}
            </div>

            <div className="txtbox">
              <label>เลขบัตรประชาชน</label>
              {/* <input type="text" name="idCard" pattern="\d{1}-\d{4}-\d{5}-\d{2}-\d{1}" title="รูปแบบที่ถูกต้องคือ x-xxxx-xxxxx-xx-x" value={idCard} onChange={handleIdCardChange} /> */}
              <input  type="text"  name="idCard"  value={idCard}  onChange={handleIdCardChange}/>
              {idCardError && <p class ="err">{idCardError}</p>}

            </div>

            <div className="txtbox2">
              <label>เพศ</label>
              <select name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">โปรดเลือก</option>
                <option value="male">ชาย</option>
                <option value="female">หญิง</option>
                <option value="more">อื่นๆ</option>
              </select>
            </div>

            <div className="txtbox2">
              <label>วัน/เดือน/ปี เกิด</label>
                     <input type="date" id="birthday" name="birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} max={new Date().toISOString().split("T")[0]} />  
              

            </div>
            
            <input type="button" value="ตรวจสอบ" onClick={confirmData} className="confirm-button" />
            <input type="reset" value="รีเซ็ต" onClick={handleReset}/>
          </div>
        </div>
      )}

        {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p className=" accept">คุณแน่ใจว่าต้องการยืนยันข้อมูล?</p>
            <div className="modal-buttons">
              <button onClick={handleConfirm}>ใช่</button>
              <button class ="notaccept"onClick={() => setShowModal(false)}>ไม่</button>
            </div>
          </div>
        </div>
      )}


        {showResult ? (
      <Result
        name={name}
        surname={surname}
        idCard={idCard}
        gender={getThaiGender(gender)}
        birthday={getThaiBirthDate(birthday)}
        checkServiceStatus={checkServiceStatus}
        handleReset={handleReset}
      />
    ) : null}
    
        {showAlert && (
        <div className="alert">
          <div className="alert-content">
          <h3>ข้อมูลของคุณผิดพลาด</h3>
          <p>กรุณากรอกข้อมูลให้ครบหรือกรอกข้อมูลให้ถูกต้อง</p>
          <button onClick={() => setShowAlert(false)}>ตกลง</button>
        </div>
        </div>
      )}

      </div>
   
    
  
  );
}

export default App;
