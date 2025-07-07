import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets"; // make sure the path is correct

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [searchFilter, setSearchFilter] = useState({
    title: '',
    location: '',
  });

  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
 const [showRecruiterLogin, setShowRecruiterLogin]=useState(false);
  // Load mock data from assets
  useEffect(() => {
    setJobs(jobsData);
  }, []);

  const value = {
    setSearchFilter,
    searchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
