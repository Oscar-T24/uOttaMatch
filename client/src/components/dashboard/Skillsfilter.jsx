import React, { useState } from "react";


const Skillfilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [options] = useState(['Python', 'JavaScript', 'React', 'Node.js', 'C++', 'Java', 'HTML', 'CSS']);

  const filteredOptions = options.filter(
    (option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedSkills.includes(option)
  );


  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addSkill = (skill) => {
    setSelectedSkills((prev) => [...prev, skill]);
    setSearchTerm('');
  };


  const removeSkill = (skillToRemove) => {
    setSelectedSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
  };

  const [selectedAgeGroup, setSelectedAgeGroup] = useState("");

  return (
    <div style={{ maxWidth: '150px', margin: 'auto' }}>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
        {selectedSkills.map((skill, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              background: '#e0e0e0',
              borderRadius: '50px',
              padding: '5px 10px',
            }}
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              style={{
                marginLeft: '5px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '10px',
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
        placeholder="Skills..."
        style={{ width: '100%', padding: '5px', boxRadius: 'border-box' }}
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
              onClick={() => addSkill(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Skillfilter;


