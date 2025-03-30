import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useAuth } from '../context/AuthContext';



const Login = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser, setToken } = useAuth(); 
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  // למנוע את שליחת הטופס הרגילה

    try {
      // שליחת בקשה לשרת עם פרטי המשתמש
      const response = await axios.post('https://localhost:7207/api/auth/login', {
        email,
        password,
      },{
        headers: {
          "Content-Type": "application/json",  // לוודא שהשרת מקבל את הנתונים כ-JSON
        },
      });

      // אם הלוגין הצליח, נשמור את ה-token ב-localStorage
      const { token, user } = response.data;
     
      if (!token || !user) {
        throw new Error("Login failed");
      }

      // שמירה ב-localStorage של ה-token ושל המידע על המשתמש
      localStorage.setItem('authToken', token);      
      setUser(user);
      setToken(token);
    // עכשיו, אתה יכול לשמור את המידע של המשתמש ב-localStorage
  
      // נעדכן את ההורה שתחילת הלוגין הצליחה
      onLoginSuccess();

      setErrorMessage('');
      // alert("התחברת בהצלחה!");
    } catch (error: unknown) { // אם השגיאה היא לא ידועה, נצטרך לבדוק אם היא שגיאת Axios
        if (error instanceof AxiosError) {
          // אם זה שגיאת Axios, נוכל לגשת ל-response שלה
          setErrorMessage(error.response ? error.response.data.Message : 'שגיאה לא צפויה');
        } else if (error instanceof Error) {
          // אם מדובר בשגיאה רגילה (לא Axios)
          setErrorMessage(error.message || 'שגיאה לא צפויה');
        } else {
          // אם זה לא שגיאה כלל (כלומר משהו שלא ניתן לזהות)
          setErrorMessage('שגיאה לא צפויה');
        }
      }
  };

  return (
    <div>
      <h2>התחברות</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>אימייל</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>סיסמא</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">התחבר</button>
      </form>

      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  );
};

export default Login;
