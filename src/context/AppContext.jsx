import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [apiData, setApiData] = useState([]); // Stores the Array of Arrays
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedEmployeeId, setCapturedEmployeeId] = useState(null);
  const [profilePhotos, setProfilePhotos] = useState({});

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        apiData,
        setApiData,
        capturedImage,
        setCapturedImage,
        capturedEmployeeId,
        setCapturedEmployeeId,
        profilePhotos,
        setProfilePhotos
      }}
    >
      {children}
    </AppContext.Provider>
  );
};