import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

function PurchasedCoursesAdminPanel() {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchPurchasedCourses();
  }, []);

  const fetchPurchasedCourses = async () => {
    try {
      const coursesRef = collection(firestore, 'purchasedCourses');
      const snapshot = await getDocs(coursesRef);
      const coursesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPurchasedCourses(coursesList);
    } catch (error) {
      console.error("Error fetching purchased courses: ", error);
    }
  };

  const handleDownloadData = () => {
    const dataToExport = purchasedCourses.map(course => ({
      Name: course.name,
      Price: `₹${course.totalPrice}`,
      'Student Name': course.studentDetails?.fullName || 'N/A',
      'Email Address': course.studentDetails?.emailAddress || 'N/A',
      'Phone Number': course.studentDetails?.phoneNumber || 'N/A',
      'School/College Name': course.studentDetails?.educationName || 'N/A',
      'Total Price': `₹${course.totalPrice}`
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Purchased Courses");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'purchased_courses_data.xlsx');
  };

  const removeCourse = async (courseId) => {
    try {
      await deleteDoc(doc(firestore, 'purchasedCourses', courseId));
      const updatedCourses = purchasedCourses.filter(course => course.id !== courseId);
      setPurchasedCourses(updatedCourses);
    } catch (error) {
      console.error("Error removing course: ", error);
    }
  };

  const totalPages = Math.ceil(purchasedCourses.length / itemsPerPage);
  const currentCourses = purchasedCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
      <h1 className='text-4xl font-bold mb-4'>Purchased Courses</h1>
      <button onClick={handleDownloadData} className="download-button">Download Data</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Student Name</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>School/College Name</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCourses.map(course => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>₹{course.totalPrice}</td>
              <td>{course.studentDetails?.fullName || 'N/A'}</td>
              <td>{course.studentDetails?.emailAddress || 'N/A'}</td>
              <td>{course.studentDetails?.phoneNumber || 'N/A'}</td>
              <td>{course.studentDetails?.educationName || 'N/A'}</td>
              <td>₹{course.totalPrice}</td>
              <td>
                <button onClick={() => removeCourse(course.id)}>Remove</button>
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

export default PurchasedCoursesAdminPanel;
