
import React, { useState } from 'react';
import '../../styles/client/job.css'
import {db} from '../../firebase/firebase'
import { addDoc, collection } from 'firebase/firestore';


function AddJob() {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobRequirements, setJobRequirements] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const channelCollectionRef=collection(db,"jobs");
  const user=localStorage.getItem("loggedInUser")
  const jobDetails={
    title:jobTitle,
    description:jobDescription,
    requirements:jobRequirements,
    location:jobLocation,
    id:user
  }

 
const handleSubmit = (e) => {
  e.preventDefault();
  
  // Retrieve the current array of jobs from localStorage
  let jobs = JSON.parse(localStorage.getItem("job"));

  // If jobs is not an array (null or something else), initialize it as an empty array
  if (!Array.isArray(jobs)) {
    jobs = [];
  }
  
  // Add the new job to the array
  jobs.push(jobDetails);
  
  // Store the updated array back in localStorage
  localStorage.setItem("job", JSON.stringify(jobs));
  
  // Clear form inputs
  setJobTitle('');
  setJobDescription('');
  setJobRequirements('');
  setJobLocation('');
};

const postData=async()=>{
  await addDoc(channelCollectionRef,{
    userid:user,
    title:jobTitle,
    requirements:jobRequirements,
    location:jobLocation,
    description:jobDescription
  })
}
  return (
    <div className="add-job-opportunity">
      <h2>Add Job Opportunity</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="job-title">Job Title</label>
          <input
            type="text"
            id="job-title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="job-description">Job Description</label>
          <textarea
            id="job-description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows="5"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="job-requirements">Requirements</label>
          <textarea
            id="job-requirements"
            value={jobRequirements}
            onChange={(e) => setJobRequirements(e.target.value)}
            rows="3"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="job-location">Location</label>
          <input
            type="text"
            id="job-location"
            value={jobLocation}
            onChange={(e) => setJobLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn" onClick={postData}>Add Job</button>
      </form>
    </div>
  );
}

export default AddJob;


