import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { app } from '../controllers/firebase/main';
import { addVolunteer, fetchUserById } from '../controllers/firebase/auth';
import { useNavigate } from 'react-router-dom';
import { GLOBAL_ERROR_STATE } from '../constants/constsants';

const EmergencyContactAndVolunteer = () => {
  const [activeTab, setActiveTab] = useState('emergency');
  const [emergencyContacts, setEmergencyContacts] = useState([{ name: '', phone: '' }]);
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    skills: '',
    email: '',
    contactNumber: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        setFormData(prevState => ({
          ...prevState,
          email: user.email
        }));
        fetchUserById(user.uid).then(data => {
          if (data && data != GLOBAL_ERROR_STATE) {

            setFormData({
              ...formData,
              ...data
            })
          }
        });

        setIsVolunteer(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleEmergencyContactChange = (index, field, value) => {
    const updatedContacts = [...emergencyContacts];
    updatedContacts[index][field] = value;
    setEmergencyContacts(updatedContacts);
  };

  const addEmergencyContact = () => {
    setEmergencyContacts([...emergencyContacts, { name: '', phone: '' }]);
  };

  const handleVolunteerFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await addVolunteer(user.uid, formData);
      setSubmitMessage('Registration Successful. Thank you for volunteering!');
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      setSubmitMessage('Registration Failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 flex-col md:flex-row">
      {/* Sidebar */}
      <div className=" bg-white shadow-md ">
        <h2 className="text-xl font-semibold mb-1 text-neutral-500 p-4">Dashboard</h2>
        <div className="p-4 flex md:flex-col flex-row">


          <button
            className={`w-full text-left py-2 px-4 rounded ${activeTab === 'emergency' ? 'bg-primary-500 text-white' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveTab('emergency')}
          >
            Add Emergency Contact
          </button>

          <button
            className={`w-full text-left py-2 px-4 rounded ${activeTab === 'volunteer' ? 'bg-primary-500 text-white' : 'hover:bg-gray-200'} ${isVolunteer ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => !isVolunteer && setActiveTab('volunteer')}
            disabled={isVolunteer}
          >
            Sign Up as Volunteer
          </button>


        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-36 ">
        {activeTab === 'emergency' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Add Emergency Contacts</h2>
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  placeholder="Contact Name"
                  value={contact.name}
                  onChange={(e) => handleEmergencyContactChange(index, 'name', e.target.value)}
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={contact.phone}
                  onChange={(e) => handleEmergencyContactChange(index, 'phone', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
            <button
              onClick={addEmergencyContact}
              className="mt-2 p-2 bg-neutral-700 text-white rounded hover:bg-neutral-800"
            >
              + Add Another Contact
            </button>
          </div>
        )}

        {activeTab === 'volunteer' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Sign Up as Volunteer</h2>
            <form onSubmit={handleVolunteerSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleVolunteerFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  required
                  value={formData.age}
                  onChange={handleVolunteerFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>

              <div>
                <span className="block text-sm font-medium text-gray-700">Gender</span>
                <div className="mt-2 space-x-4">
                  {['male', 'female', 'other'].map((gender) => (
                    <label key={gender} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={handleVolunteerFormChange}
                        className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                      />
                      <span className="ml-2 capitalize">{gender}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
                <textarea
                  id="skills"
                  name="skills"
                  rows="3"
                  required
                  value={formData.skills}
                  onChange={handleVolunteerFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                ></textarea>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleVolunteerFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number</label>
                <input
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  required
                  value={formData.contactNumber}
                  onChange={handleVolunteerFormChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Submitting...' : 'Add Volunteer Data'}
                </button>
              </div>

              {submitMessage && (
                <div className={`mt-2 text-sm ${submitMessage.includes('Successful') ? 'text-green-600' : 'text-red-600'}`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyContactAndVolunteer;

