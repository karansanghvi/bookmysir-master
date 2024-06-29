import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

function HomeTutionAdminPanel() {
  const [tuitions, setTuitions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const tuitionsRef = collection(firestore, 'hometution');

  useEffect(() => {
    const fetchTuitions = async () => {
      try {
        const querySnapshot = await getDocs(tuitionsRef);
        const tuitionsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTuitions(tuitionsData);
      } catch (error) {
        console.error("Error fetching tuitions: ", error);
      }
    };

    fetchTuitions();
  }, [tuitionsRef]);

  const handleRemoveTuition = async (tuitionId) => {
    try {
      await deleteDoc(doc(tuitionsRef, tuitionId));
      const updatedTuitions = tuitions.filter(tuition => tuition.id !== tuitionId);
      setTuitions(updatedTuitions);
    } catch (error) {
      console.error("Error removing tuition: ", error);
    }
  };

  const downloadData = () => {
    const dataToExport = tuitions.map(({ id, name, phoneNumber, role, class: studentClass, selectedClasses, selectedEnggTypes, selectedSubjects, selectedSemesters, selectedBranches, typeOfTuition, address }) => 
      ({ id, name, phoneNumber, role, studentClass, selectedClasses, selectedEnggTypes, selectedSubjects, selectedSemesters, selectedBranches, typeOfTuition, address }));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Home Tuitions");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'bookmysir_website_data.xlsx');
  };

  const totalPages = Math.ceil(tuitions.length / itemsPerPage);
  const currentTuitions = tuitions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <h1 className='text-4xl font-bold mb-4'>Home Tution Details</h1>
      <button onClick={downloadData} className="download-button">Download Data</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            {/* <th>Email</th> */}
            <th>Phone Number</th>
            <th>Role</th>
            <th>Class (Student)</th>
            {/* <th>Engineering (Student)</th> */}
            <th>Class (Teacher)</th>
            <th>Engineering (Teacher)</th>
            <th>Subject</th>
            <th>Engineering Semester</th>
            <th>Engineering Branch</th>
            <th>Type of Tuition</th>
            <th>Flat Number</th>
            <th>Building Name</th>
            <th>Street Name</th>
            <th>Locality</th>
            <th>Pin Code</th>
            <th>Landmark</th>
            <th>City</th>
            <th>State</th>
            <th>Remove Tuition</th>
          </tr>
        </thead>
        <tbody>
          {currentTuitions.map((tuition) => (
            <tr key={tuition.id}>
              <td>{tuition.name}</td>
              {/* <td>{tuition.email}</td> */}
              <td>{tuition.phoneNumber}</td>
              <td>{tuition.role}</td>
              <td>{tuition.class}</td>
              {/* <td>{tuition.engg}</td> */}
              <td>{tuition.selectedClasses}</td>
              <td>{tuition.selectedEnggTypes}</td>
              <td>{tuition.selectedSubjects}</td>
              <td>{tuition.selectedSemester}</td>
              <td>{tuition.selectedBranch}</td>
              <td>{tuition.typeOfTuition}</td>
              <td>{tuition.flat}</td>
              <td>{tuition.building}</td>
              <td>{tuition.street}</td>
              <td>{tuition.locality}</td>
              <td>{tuition.pin}</td>
              <td>{tuition.landmark}</td>
              <td>{tuition.city}</td>
              <td>{tuition.state}</td>
              <td>
                <button onClick={() => handleRemoveTuition(tuition.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}

export default HomeTutionAdminPanel;
