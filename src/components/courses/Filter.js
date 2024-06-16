import React from 'react';

const Filter = ({ filters, setFilters, applyFilters }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="filter-container">
      <div className="filter-select">
        <select
          name="standard"
          id="standard"
          value={filters.standard}
          onChange={handleFilterChange}
        >
          <option value="">Select Standard</option>
          <option value="9th Standard">9th Standard</option>
          <option value="10th Standard">10th Standard</option>
          <option value="11th Standard">11th Standard</option>
          <option value="12th Standard">12th Standard</option>
          <option value="None">None</option>
        </select>
      </div>
      <div className="filter-select">
        <select
          name="board"
          id="board"
          value={filters.board}
          onChange={handleFilterChange}
        >
          <option value="">Select Board</option>
          <option value="ICSE Board">ICSE Board</option>
          <option value="CBSE Board">CBSE Board</option>
          <option value="HSC Board">HSC Board</option>
          <option value="SSC Board">SSC Board</option>
          <option value="None">None</option>
        </select>
      </div>
      <div className="filter-select">
        <select
          name="branch"
          id="branch"
          value={filters.branch}
          onChange={handleFilterChange}
        >
          <option value="">Select Engineering Branch</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Electronics Engineering">Electronics Engineering</option>
          <option value="Electronics & Telecommunication Engineering">Electronics & Telecommunication Engineering</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
          <option value="Production Engineering">Production Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Automobile Engineering">Automobile Engineering</option>
          <option value="None">None</option>
        </select>
      </div>
      <button onClick={applyFilters} className='md:mr-80 mr-40 view-course-button'>Apply Filters</button>
    </div>
  );
};

export default Filter;
