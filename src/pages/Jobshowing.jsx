import React, { useEffect, useState } from 'react';
import '../styles/jobshowing.css';
import { db } from '../firebase/firebase'; // Import Firestore
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

function Jobshowing() {
  const [jobData, setJobData] = useState([]); // State to store job data
  const [display, setDisplay] = useState(false); // State to control modal display
  const [selectedJob, setSelectedJob] = useState(null); // State to store selected job data
  const [bidAmount, setBidAmount] = useState(""); // State to store the entered bid amount

  const userId = localStorage.getItem("loggedInUser"); // Logged-in user

  // Fetch jobs from Firestore
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobCollectionRef = collection(db, "jobs");
        const querySnapshot = await getDocs(jobCollectionRef);
        const jobs = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setJobData(jobs); // Set job data in state
      } catch (error) {
        console.error("Error fetching jobs: ", error);
      }
    };

    fetchJobs(); // Call fetchJobs on component mount
  }, []);

  if (!jobData.length) {
    return <p>No job data available.</p>; // Fallback if no data found
  }

  function bid(item) {
    setSelectedJob(item); // Store the job details for display in modal
    setDisplay(true); // Show the modal
  }

  async function submitBid() {
    // Update Firestore with the user's bid
    try {
      const jobDocRef = doc(db, "jobs", selectedJob.id);
      const existingBids = selectedJob.bids || [];
      
      // Check if the user has already placed a bid for this job
      const existingBid = existingBids.find((bid) => bid.userId === userId);
      if (existingBid) {
        alert("You have already placed a bid for this job.");
        return;
      }

      // Add the new bid to the selected job's bids array
      const newBid = { userId: userId, amount: bidAmount };
      await updateDoc(jobDocRef, {
        bids: [...existingBids, newBid] // Add the new bid
      });

      // Update local job data with the new bid
      const updatedJobData = jobData.map((job) =>
        job.id === selectedJob.id ? { ...job, bids: [...existingBids, newBid] } : job
      );
      setJobData(updatedJobData); // Update state with the updated job data
    } catch (error) {
      console.error("Error submitting bid: ", error);
    }

    setDisplay(false); // Close the modal after submitting the bid
    setSelectedJob(null); // Reset the selected job
    setBidAmount(""); // Reset bid amount input
  }

  function closeModal() {
    setDisplay(false); // Close the modal
    setSelectedJob(null); // Reset selected job
    setBidAmount(""); // Reset bid amount input
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
            <button className="bid" onClick={() => bid(item)}>Bid</button>

            {/* Check if any bid is accepted */}
            {item.acceptedBid ? (
              item.acceptedBid.userId === userId ? (
                <h4 style={{ color: "green", marginTop: "20px" }}>Your bid is accepted</h4>
              ) : (
                <h4 style={{ color: "red", marginTop: "20px" }}>Not accepted</h4>
              )
            ) : (
              <h4 style={{ color: "gray", marginTop: "20px" }}>No bids accepted yet</h4>
            )}
          </div>
        </div>
      ))}

      {/* Modal Section */}
      {display && selectedJob && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{selectedJob.title}</h2>
            <p><strong>Requirements:</strong> {selectedJob.requirements}</p>
            <p><strong>Description:</strong> {selectedJob.description}</p>
            <input
              type="number"
              placeholder="$ your bid amount"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)} // Capture input
            />
            <button onClick={submitBid}>Submit Bid</button>
            <button onClick={closeModal} style={{ marginLeft: "30px" }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Jobshowing;
