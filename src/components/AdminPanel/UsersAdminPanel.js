import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export default function UsersAdminPanel() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const usersRef = collection(firestore, 'profilePage'); 
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userDocs = await getDocs(usersRef);
        const usersData = userDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, [usersRef]);

  const handleRemoveUser = async (userId) => {
    try {
      await deleteDoc(doc(usersRef, userId));
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error removing user: ", error);
    }
  };

  const downloadData = () => {
    const dataToExport = users.map(({ id, name, email, phoneNumber, address, schoolName, schoolMarks, collegeName, collegeMarks }) => ({
      id,
      name,
      email,
      phoneNumber,
      address,
      schoolName,
      schoolMarks,
      collegeName,
      collegeMarks
    }));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'bookmysir_website_data.xlsx');
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const currentUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
      <h1 className='text-4xl font-bold mb-4'>Users</h1>
      <button onClick={downloadData} className="download-button">Download Data</button>
      <table>
        <thead>
          <tr>
            <th>Unique ID</th>
            <th>Name</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Address</th> {/* New column */}
            <th>School Name</th> {/* New column */}
            <th>Marks in School</th> {/* New column */}
            <th>College Name</th> {/* New column */}
            <th>Marks in College</th> {/* New column */}
            <th>Remove User</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.address}</td>
              <td>{user.schoolName}</td> 
              <td>{user.schoolMarks}</td> 
              <td>{user.collegeName}</td> 
              <td>{user.collegeMarks}</td> 
              <td>
                <button onClick={() => handleRemoveUser(user.id)}>Remove</button>
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
