import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardButton = ({ userType }) => {
  const navigate = useNavigate();

  const getDashboardPath = (userType) => {
    switch (userType) {
      case 'admin':
        return '/admin-dashboard';
      case 'user':
        return '/user-dashboard';
      case 'guest':
        return '/guest-dashboard';
      default:
        return '/';
    }
  };

  const handleNavigation = () => {
    const path = getDashboardPath(userType);
    navigate(path);
  };

  return (
    <button onClick={handleNavigation}>
      Go to Dashboard
    </button>
  );
};

export default DashboardButton;
