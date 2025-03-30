import React from 'react';
import { Link, Outlet } from 'react-router-dom'; // Outlet מציין את המקום שבו הדפים יטענו
import UserProfile from './components/UserProfile';

const Layout: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}> {/* המעטפת הראשית עם גובה מינימלי של 100% */}
    
      <header 
        style={{ 
          padding: '10px', 
          backgroundColor: '#f8f8f8', 
          borderBottom: '1px solid #ddd', 
          position: 'fixed', // קובע שה-header יישאר קבוע למעלה
          top: 0, // נשאר למעלה של הדף
          left: 0, // יתחיל מהצד השמאלי
          width: '100%', // יימתח על כל רוחב הדף
          zIndex: 1000, // לוודא שה-header יהיה מעל לשאר התוכן
        }}
      >
        <nav>
          <ul style={{ 
            display: 'flex', 
            listStyle: 'none', 
            justifyContent: 'center',  // מרכז את הקישורים
            gap: '20px' 
          }}>
            <li>
              <Link to="/">Home</Link>
            </li>          
            <li>
              <Link to="/Mygroups">My Groups</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main style={{ marginTop: '70px', flex: 1 }}> {/* מוסיף מרווח למעלה כדי שהתוכן לא יכוסה על ידי ה-header */}
        <UserProfile />
        <Outlet />
      </main>

      <footer 
        style={{
          position: 'fixed', // הפוטר יהיה קבוע
          bottom: 0, // נמצא בתחתית הדף
          left: 0, // מתחיל מהצד השמאלי
          width: '100%', // יימתח על כל רוחב הדף
          backgroundColor: '#f8f8f8',
          padding: '10px',
          textAlign: 'center', // מרכז את התוכן
          borderTop: '1px solid #ddd', // קו בין הפוטר לשאר התוכן
        }}
      >
        <p>© 2025 My Application</p>
      </footer>
    </div>
  )
};

export default Layout;
