import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    roll_no: '',
    email: '',
    password: '',
    confirm_password: '',
    gender: '',
    date_of_joining: '',
    room_number: '',
    hostel_no: '',
    profile_pic: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === 'profile_pic' ? files[0] : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess('User signed up successfully.');
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      console.error('Failed to sign up:', error);
      setError('Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">Sign Up</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}
      <form enctype="multipart/form-data" onSubmit={handleSubmit}>
        <input type="text" name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleChange} className="border rounded px-4 py-2 mb-4 w-full" required />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="border rounded px-4 py-2 mb-4 w-full" required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="border rounded px-4 py-2 mb-4 w-full" required />
        <input type="password" name="confirm_password" placeholder="Confirm Password" value={formData.confirm_password} onChange={handleChange} className="border rounded px-4 py-2 mb-4 w-full" required />
        <select name="gender" value={formData.gender} onChange={handleChange} className="border rounded px-4 py-2 mb-4 w-full" required>
          <option value="">Select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
        <input type="text" name="hostel_no" placeholder="Hostel Number" value={formData.hostel_no} onChange={handleChange} className="border rounded px-4 py-2 mb-4 w-full" required />
        <input type="file" name="profile_pic" onChange={handleChange} className="border rounded px-4 py-2 mb-4 w-full" required />
        <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
