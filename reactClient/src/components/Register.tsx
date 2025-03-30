import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useAuth } from '../context/AuthContext';
const Register = ({ onRegisterSuccess }: { onRegisterSuccess: () => void }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [previousLastName, setPreviousLastName] = useState('');
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { setUser, setToken } = useAuth(); 
  // פונקציה לשליחה של הבקשה לשרת
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      previousLastName,
      numberOfChildren,
      email,
      password,
    };
    try {
      // קריאת POST ל-API עם הנתונים שנשלחים מהמשתמש
      const response = await axios.post('https://localhost:7207/api/auth/register', user);

      if (response.data.token) {
        if (response.data.token) {
            const registeredUser = { 
              ...user, 
              id: response.data.id,  // הוספת ה-id שהתקבל מהשרת
            };
        localStorage.setItem('authToken', response.data.token);       
        setUser(registeredUser);
        setToken(response.data.token);
     
      }
      // אם נרשם בהצלחה
      setSuccessMessage('User registered successfully!');
      setError('');
      // קריאה ל-onRegisterSuccess כדי להודיע לקומפוננטה האב שהרישום עבר בהצלחה
      onRegisterSuccess();
    }
}
     catch (err: unknown) {
      // בדיקה אם err הוא מסוג AxiosError
      if (err instanceof AxiosError) {
        // אם השגיאה היא מסוג AxiosError, נוכל לגשת ל-response ול-data
        setError('Registration failed: ' + err.response?.data?.message);
      } else {
        // אם השגיאה אינה מסוג AxiosError, מציגים שגיאה כללית
        setError('Registration failed: Unknown error');
      }
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Previous Last Name:</label>
          <input
            type="text"
            value={previousLastName}
            onChange={(e) => setPreviousLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Number of Children:</label>
          <input
            type="number"
            value={numberOfChildren}
            onChange={(e) => setNumberOfChildren(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
    </div>
  );
};
export default Register;
