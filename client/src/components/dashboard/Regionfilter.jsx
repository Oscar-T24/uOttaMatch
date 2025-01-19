import React, { useState } from "react";


const Regionfilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setRegion] = useState([]);
  const [options] = useState(['Montreal', 'Toronto', 'Vancouver', 'Ottawa', 'London', 'Hamilton', 'Niagara', 'Windsor']);

  const filteredOptions = options.filter(
    (option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedRegion.includes(option)
  );


  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addRegion = (region) => {
    setSelectedRegion((prev) => [...prev, region]);
    setSearchTerm('');
  };


  const removeRegion = (regionToRemove) => {
    setSelectedRegion((prev) => prev.filter((region) => region !== regionToRemove));
  };

  const [selectedAgeGroup, setSelectedAgeGroup] = useState("");

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
        {selectedRegion.map((region, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#e0e0e0',
              borderRadius: '20px',
              padding: '5px 10px',
            }}
          >
            {region}
            <button
              onClick={() => removeRegion(region)}
              style={{
                marginLeft: '5px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              ✖
            </button>
          </div>
        ))}
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Region"
        style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
      />
      {searchTerm && filteredOptions.length > 0 && (
        <ul
          style={{
            border: '1px solid #ccc',
            borderRadius: '5px',
            maxHeight: '150px',
            overflowY: 'auto',
            padding: '5px',
            listStyle: 'none',
            margin: '5px 0 0',
          }}
        >
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              style={{
                padding: '5px',
                cursor: 'pointer',
              }}
              onClick={() => addRegion(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Regionfilter;


