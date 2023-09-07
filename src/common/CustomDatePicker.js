import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';

function CustomDatePicker({ selected, onChange, onClear }) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  const handleDateChange = (date) => {
    onChange(date);
    setIsOpen(false); // Close the date picker after selecting a date
  };

  const handleClear = () => {
    onClear();
    inputRef.current.blur(); // Remove focus from the input
  };

  const handleInputClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <DatePicker
        selected={selected}
        onChange={handleDateChange}
        dateFormat="yyyy-MM"
        showMonthYearPicker
        customInput={
          <div className="date-picker-input">
            <input
              ref={inputRef}
              className="form-control"
              placeholderText="YYYY-MM"
              value={selected ? selected.toISOString().slice(0, 7) : ''}
              onClick={handleInputClick}
              onKeyDown={handleInputKeyDown}
            />
            {selected && (
              <button
                type="button"
                className="clear-button"
                onClick={handleClear}
                style={{ position: 'absolute', right: '5px', top: '7px', border: "0", backgroundColor: "transparent", color: "#495057", opacity: '0.5' }}
              >
                <span className="mdi mdi-close"></span>
              </button>
            )}
          </div>
        }
        open={isOpen}
        onCalendarClose={() => setIsOpen(false)}
      />
    </div>
  );
}

CustomDatePicker.propTypes = {
  selected: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default CustomDatePicker;
