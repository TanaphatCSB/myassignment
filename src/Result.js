import React from "react";
import './App.css';

function Result(props) {
  const { name, surname, idCard, gender, birthday, checkServiceStatus, handleReset } = props;

  return (
    <div className="biggestresult">
    <div className = "bigresult">
    <div className="result">
      <h1>ผลการลงทะเบียนของคุณ</h1>
      <p>ชื่อ: {name} {surname}</p>
      <p>เลขบัตรประชาชน: {idCard}</p>
      <p>เพศ: {gender}</p>
      <p>วันเกิด: {birthday}</p>
      {/* เพิ่มการแสดงสถานะการเข้ารับบริการ */}
      <div>{checkServiceStatus()}</div>
        <br></br>

      <input type="reset"  className="back"value="ย้อนกลับ" onClick={handleReset} />

    </div>
    </div>
    </div>
  );
}

export default Result;
