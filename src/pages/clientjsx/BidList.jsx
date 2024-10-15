import React, { useEffect, useState } from 'react';
import "../../styles/client/bidlist.css";
import { db } from '../../firebase/firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import Userprofile from '../Userprofile';

function BidList() {
  const [jobData, setJobData] = useState([]); // State to store job data
  const [selectedUserId, setSelectedUserId] = useState(null); // State to store selected user ID for Userprofile
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

  const handleAcceptBid = async (jobId, bidId, bidAmount) => {
    try {
      const jobDocRef = doc(db, 'jobs', jobId);
      await updateDoc(jobDocRef, {
        acceptedBid: { userId: bidId, amount: bidAmount }
      });

      // Update the job's acceptedBid in the state
      setJobData(prevData =>
        prevData.map(job =>
          job.id === jobId ? { ...job, acceptedBid: { userId: bidId, amount: bidAmount } } : job
        )
      );

      console.log("Bid accepted successfully!");
    } catch (error) {
      console.error("Error accepting bid: ", error);
    }
  };

  const handleDeclineBid = async (jobId, bidId) => {
    try {
      const jobDocRef = doc(db, 'jobs', jobId);
      await updateDoc(jobDocRef, { acceptedBid: null });

      // Update state to remove the accepted bid
      setJobData(prevData =>
        prevData.map(job =>
          job.id === jobId ? { ...job, acceptedBid: null } : job
        )
      );

      console.log(`Bid declined successfully for userId: ${bidId}`);
    } catch (error) {
      console.error("Error declining bid: ", error);
    }
  };

  const gotoUser = (userId) => {
    setSelectedUserId(userId);
  };

  const closeUserProfile = () => {
    setSelectedUserId(null);
  };

  return (
    <div>
      {selectedUserId ? (
        <Userprofile userId={selectedUserId} closeProfile={closeUserProfile} />
      ) : (
        <div className="job-card-wrapper2">
          {jobData.length ? (
            jobData.map((item, index) => (
              <div key={index} className="job-card2">
                <div className="card-image2"></div>
                <div className="card-content2">
                  <h3>{item.title}</h3>
                  <p><strong>Requirements:</strong> {item.requirements}</p>
                  <p><strong>Description:</strong> {item.description}</p>

                  <div className="bids-section2">
                    <h4>Bids for this Job:</h4>
                    {item.bids && item.bids.length > 0 ? (
                      <ul className="bid-list2">
                        {item.bids.sort((a, b) => a.amount - b.amount).map((bid, bidIndex) => {
                          const isAcceptedBid = item.acceptedBid && item.acceptedBid.userId === bid.userId;

                          return (
                            <li 
                              key={bidIndex} 
                              className="bid-item2"
                              style={{
                                backgroundColor: isAcceptedBid ? '#2ECC71' : '#FFF' // Accepted bids in green
                              }}
                            >
                              <span className="bid-user2" onClick={() => gotoUser(bid.userId)}>
                                User: {bid.userId}
                              </span>
                              <span className="bid-amount2">Bid: ${bid.amount}</span>
                              <div className="bid-actions2">
                                {/* Show accept icon only if there's no accepted bid */}
                                {!item.acceptedBid && (
                                  <i 
                                    className="check-icon2" 
                                    onClick={() => handleAcceptBid(item.id, bid.userId, bid.amount)}
                                  >
                                    ✔️
                                  </i>
                                )}

                                {/* Show decline icon for all bids, even if one is accepted */}
                                <i 
                                  className="cross-icon2" 
                                  onClick={() => handleDeclineBid(item.id, bid.userId)}
                                >
                                  ❌
                                </i>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p>No bids available for this job.</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No job data available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default BidList;
