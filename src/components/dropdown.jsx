import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/dropdown.css"

const Dropdown = ({children,pos }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDocumentClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', handleDocumentClick);
  }, []);

  const handleChildClick = (navData) => {
    if(navData !== "" || !navData)
    navigate(`/${navData}`);
  };

  return (
    <div className="dropdown-offcanvas" ref={dropdownRef}>
      <div className="dots" onClick={toggleDropdown}>
                <svg
                  width="800px"
                  height="800px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.5 4C14.5 5.38071 13.3807 6.5 12 6.5C10.6193 6.5 9.5 5.38071 9.5 4C9.5 2.61929 10.6193 1.5 12 1.5C13.3807 1.5 14.5 2.61929 14.5 4Z"
                    fill="#000000"
                  />
                  <path
                    d="M14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5C13.3807 9.5 14.5 10.6193 14.5 12Z"
                    fill="#000000"
                  />
                  <path
                    d="M12 22.5C13.3807 22.5 14.5 21.3807 14.5 20C14.5 18.6193 13.3807 17.5 12 17.5C10.6193 17.5 9.5 18.6193 9.5 20C9.5 21.3807 10.6193 22.5 12 22.5Z"
                    fill="#000000"
                  />
                </svg>
              </div>
      {isOpen && (
        <ul className={`dropdown-container ${pos}`} >
          {React.Children.map(children, (child,index) =>
            <li key={index} className="dropdown-item">
              {React.cloneElement(child, {
                onClick: () => handleChildClick(child.props['data-nav']),
              })}
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;