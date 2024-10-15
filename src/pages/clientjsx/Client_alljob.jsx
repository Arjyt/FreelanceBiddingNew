import React, { useEffect, useState } from 'react';
import "../../styles/client/client_alljob.css";
import { db } from '../../firebase/firebase'; // Import Firestore configuration
import { collection, query, where, getDocs } from 'firebase/firestore';
import '../../styles/client/client_alljob.css'
function Client_alljob() {
  const [jobData, setJobData] = useState([]); // State to store job data
  const user = localStorage.getItem("loggedInUser"); // Get the logged-in user ID

  useEffect(() => {
    const fetchJobs = async () => {
      if (!user) return; // Ensure user is logged in
      
      const jobCollectionRef = collection(db, "jobs"); // Reference to jobs collection
      const q = query(jobCollectionRef, where("userid", "==", user)); // Query to filter jobs by user ID
      
      try {
        const querySnapshot = await getDocs(q); // Fetch matching jobs
        const jobs = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })); // Map the data
        setJobData(jobs); // Set job data in state
      } catch (error) {
        console.error("Error fetching jobs: ", error); // Handle errors
      }
    };

    fetchJobs(); // Fetch jobs when the component mounts
  }, [user]);

  if (!jobData.length) {
    return <p>No job data available.</p>; // Fallback if no data found
  }

  return (
    <div className="job-card-wrapper">
      {jobData.map((item, index) => (
        <div key={index} className="job-card">
          <div className="card-image"></div>
          <div className="card-content">
            <h3>{item.title}</h3>
            <p><strong>Requirements:</strong> {item.requirements}</p>
            <p><strong>Description:</strong> {item.description}</p>
            <div className="b">
            <button className="bid">Delete</button>
            <button className="bid" style={{ backgroundColor: "cyan", marginLeft: "10px" }}>Edit</button>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}

export default Client_alljob;
