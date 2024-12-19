import React from 'react';
import VolunteerRegistrationForm from '../../components/VolunteerRegistrationForm';

const  VolunteerRegistrationPage = ()=> {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Volunteer Registration</h1>
      <VolunteerRegistrationForm />
    </div>
  );
}

export default VolunteerRegistrationPage
