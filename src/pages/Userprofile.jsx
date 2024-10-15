import React, { useState, useEffect } from 'react';
import '../styles/profile.css';
import icon from '../components/assets/png-transparent-computer-icons-editing-others-removebg-preview.png';
import { db } from '../firebase/firebase'; // Import Firestore configuration
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Import Firestore functions

function Userprofile({ userId }) {
  const user = userId ? userId : localStorage.getItem("loggedInUser");
  const [username, setUsername] = useState(localStorage.getItem('username') || 'defaultUser');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState(['JavaScript', 'React.js', 'CSS', 'HTML5']);
  const [university, setUniversity] = useState('');
  const [degree, setDegree] = useState('');
  const [year, setYear] = useState('');
  const [cvThumbnail, setCvThumbnail] = useState(null);
  const [thumbnail, setThumbnail] = useState('https://media.licdn.com/dms/image/v2/C4D12AQHMPBvE3avWzg/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1616872522462?e=1732147200&v=beta&t=0Wd9TmPLTcp3ZVLqQb2Rlk069msk4OMFGyrhfAMxG8g');

  useEffect(() => {
    const fetchData = async () => {
      // Ensure that the user ID is valid
      if (!user) return;

      const userDoc = doc(db, "users", user); // Reference to the user's document
      const docSnap = await getDoc(userDoc); // Fetch the document

      if (docSnap.exists()) {
        const storedData = docSnap.data(); // Get user data from Firestore
        setName(storedData.name || '');
        setTitle(storedData.title || '');
        setEmail(storedData.email || '');
        setPhone(storedData.phone || '');
        setLocation(storedData.location || '');
        setBio(storedData.bio || '');
        setSkills(storedData.skills || skills);
        setUniversity(storedData.university || '');
        setDegree(storedData.degree || '');
        setYear(storedData.year || '');
        setThumbnail(storedData.thumbnail || thumbnail);
        setCvThumbnail(storedData.cvThumbnail || null);
      }
    };

    fetchData(); // Fetch user data on component mount or when user ID changes
  }, [user]); // Add user as a dependency

  const updateFirestore = async (key, value) => {
    const userDoc = doc(db, "users", user); // Reference to the user's document
    await setDoc(userDoc, { [key]: value }, { merge: true }); // Update Firestore document
  };

  const handleChange = (setter, key, value) => {
    setter(value);
    updateFirestore(key, value); // Update Firestore when value changes
  };

  const handleSkillsChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
    updateFirestore('skills', newSkills); // Update Firestore with new skills
  };

  const handleCvUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const reader = new FileReader();
      reader.onload = (e) => {
        if (fileType.startsWith('image/')) {
          setCvThumbnail(e.target.result);
          updateFirestore('cvThumbnail', e.target.result); // Update Firestore with CV thumbnail
        } else if (fileType === 'application/pdf') {
          const pdfThumbnail = 'https://example.com/pdf-thumbnail.png';
          setCvThumbnail(pdfThumbnail);
          updateFirestore('cvThumbnail', pdfThumbnail); // Update Firestore with CV thumbnail
        } else {
          alert('Please upload an image or a PDF file.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnail(e.target.result);
        updateFirestore('thumbnail', e.target.result); // Update Firestore with banner thumbnail
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload an image file.');
    }
  };

  return (
    <div className='main9'>
      <div className='user_profile'>
        <div className='banner'>
          <img src={thumbnail} alt='Banner' />
          <input
            type='file'
            id='bannerUpload'
            accept='.pdf,image/*'
            style={{ display: 'none' }}
            onChange={handleBannerUpload}
          />
          <div className='edit_icon'>
            <img
              src={icon}
              alt='Edit Icon'
              onClick={() => document.getElementById('bannerUpload').click()}
            />
          </div>
        </div>

        <div className='profile_card'>
          <div className='profile_section'>
            <div className='profile_photo'>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOK_bYaHApfSgOyEnMnpx9T3Kc_CjvFzaydg&s" alt='Profile' />
            </div>
            <div className='user_info'>
            <h2>{user?.toUpperCase() || 'Your Name'}</h2>
            </div>
          </div>

          <div className='personal_details'>
            <h3>Personal Information</h3>
            <ul>
              <li>
                <strong>Email:</strong>
                <input
                  type='text'
                  value={email}
                  onChange={(e) => handleChange(setEmail, 'email', e.target.value)}
                  placeholder='Enter your email'
                />
              </li>
              <li>
                <strong>Phone:</strong>
                <input
                  type='text'
                  value={phone}
                  onChange={(e) => handleChange(setPhone, 'phone', e.target.value)}
                  placeholder='Enter your phone number'
                />
              </li>
              <li>
                <strong>Location:</strong>
                <input
                  type='text'
                  value={location}
                  onChange={(e) => handleChange(setLocation, 'location', e.target.value)}
                  placeholder='Enter your location'
                />
              </li>
              <li>
                <strong>Bio:</strong>
                <textarea
                  value={bio}
                  onChange={(e) => handleChange(setBio, 'bio', e.target.value)}
                  placeholder='A brief description about yourself'
                />
              </li>
            </ul>

            <h3>Skills</h3>
            <ul className='skills_list'>
              {skills.map((skill, index) => (
                <li key={index}>
                  <input
                    type='text'
                    value={skill}
                    onChange={(e) => handleSkillsChange(index, e.target.value)}
                    placeholder='Enter a skill'
                  />
                </li>
              ))}
            </ul>

            <h3>Education</h3>
            <ul>
              <li>
                <strong>University:</strong>
                <input
                  type='text'
                  value={university}
                  onChange={(e) => handleChange(setUniversity, 'university', e.target.value)}
                  placeholder='Enter your university'
                />
              </li>
              <li>
                <strong>Degree:</strong>
                <input
                  type='text'
                  value={degree}
                  onChange={(e) => handleChange(setDegree, 'degree', e.target.value)}
                  placeholder='Enter your degree'
                />
              </li>
              <li>
                <strong>Year:</strong>
                <input
                  type='text'
                  value={year}
                  onChange={(e) => handleChange(setYear, 'year', e.target.value)}
                  placeholder='Enter your graduation year'
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className='cv'>
        <div className='cvsub'>
          {cvThumbnail ? (
            <img
              src={cvThumbnail}
              alt='CV Thumbnail'
              style={{ maxWidth: '100%', minHeight: '100%' }}
            />
          ) : (
            <p>No CV uploaded</p>
          )}
          <input
            type='file'
            id='cvUpload'
            accept='.pdf,image/*'
            style={{ display: 'none' }}
            onChange={handleCvUpload}
          />
          <button onClick={() => document.getElementById('cvUpload').click()}>Add CV</button>
        </div>
      </div>
    </div>
  );
}

export default Userprofile;
