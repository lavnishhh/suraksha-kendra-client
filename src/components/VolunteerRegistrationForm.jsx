import React, { useState } from 'react';
// import { addVolunteer } from '../lib/firebase';

const VolunteerRegistrationForm = ()=> {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    skills: '',
    email: '',
    contactNumber: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await addVolunteer(formData);
      setSubmitMessage('Registration Successful. Thank you for volunteering!');
      setFormData({
        name: '',
        age: '',
        gender: '',
        skills: '',
        email: '',
        contactNumber: ''
      });
    } catch (error) {
      setSubmitMessage('Registration Failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                onChange={handleChange}
                className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
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
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Submitting...' : 'Register as Volunteer'}
        </button>
      </div>

      {submitMessage && (
        <div className={`mt-2 text-sm ${submitMessage.includes('Successful') ? 'text-green-600' : 'text-red-600'}`}>
          {submitMessage}
        </div>
      )}
    </form>
  );
}


export default VolunteerRegistrationForm