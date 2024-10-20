import React, { createContext, useState, useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ startLoading, stopLoading }}>
      {/* Loader UI */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
          <ClipLoader color={"#3498db"} loading={loading} size={50} />
        </div>
      )}
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
