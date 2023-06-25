import React, { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import './toggle-container.css';

interface ToggleContainerProps {
  children: React.JSX.Element | React.JSX.Element[];
  btnLabel: string;
  btnPosition: string;
  btnCancelPosition: string;
}

export interface ToggleHandle {
  toggleVisibility: () => void;
}

const ToggleContainer = forwardRef<ToggleHandle, ToggleContainerProps>(
  ({ children, btnLabel, btnCancelPosition, btnPosition }, ref) => {
    const [visible, setVisible] = useState<boolean>(false);

    const toggleVisibility = () => {
      setVisible(!visible);
    };

    useImperativeHandle(ref, () => {
      return {
        toggleVisibility,
      };
    });

    const hidden = { display: visible ? 'none' : '' };
    const show = { display: visible ? '' : 'none' };

    return (
      <div>
        <div className={btnPosition} style={hidden}>
          <button
            className="rounded-sm text-sm font-semibold transition-colors px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white focus:ring-4 focus:ring-blue-200"
            onClick={toggleVisibility}
          >
            {btnLabel}
          </button>
        </div>
        <div className="togglableContent" style={show}>
          {children}
          <div className={btnCancelPosition}>
            <button
              type="button"
              className="mt-4 rounded-sm text-sm font-semibold transition-colors px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 focus:ring-4 focus:ring-gray-50"
              onClick={toggleVisibility}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
);

ToggleContainer.propTypes = {
  btnLabel: PropTypes.string.isRequired,
};

export default ToggleContainer;
