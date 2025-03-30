// import { useAuth } from '../context/AuthContext';
// import { Avatar, Box, Typography } from '@mui/material';
// import { useState, useEffect } from 'react';

// const UserProfile = () => {
//   const { user } = useAuth();  // מקבלים את ה-user מה-context
//   const [showHello, setShowHello] = useState(true);  // להראות "Hello" בהתחלה

//   useEffect(() => {
//     // אחרי 2 שניות להסתיר את "Hello"
//     const timer = setTimeout(() => {
//       setShowHello(false);
//     }, 2000);

//     // לנקות את ה-timer אם הקומפוננטה מוסרת
//     return () => clearTimeout(timer);
//   }, []);

//   if (!user) {
//     return null;  // אם אין יוזר (למשל אם הוא לא מחובר), לא מציגים כלום
//   }

//   // הפקת האות הראשונה משם המשתמש
//   const firstLetter = user.firstName.charAt(0).toUpperCase();

//   return (
//     <Box
//       sx={{
//         position: 'fixed',
//         top: 10,
//         left: 10,
//         display: 'flex',
//         alignItems: 'center',
//         padding: '8px 16px',
//         borderRadius: '50%',
//         boxShadow: 'none',
//         backgroundColor: 'transparent',
//         zIndex: 1000,  // לוודא שזה תמיד מעל התוכן
//       }}
//     >
//       {/* עיגול סגול כהה */}
//       <Avatar 
//         sx={{
//           bgcolor: '#8E24AA', // צבע סגול כהה יותר
//           width: 50, 
//           height: 50,
//           fontSize: 22, // גודל טקסט בתוך העיגול
//           border: 'none',  // אין מסגרת סביב העיגול
//         }}
//       >
//         {firstLetter}
//       </Avatar>

//       <Typography 
//         variant="h6" 
//         sx={{
//           marginLeft: 2, 
//           color: '#8E24AA',  // טקסט בצבע סגול כהה
//           fontWeight: 'bold',
//           display: showHello ? 'inline' : 'none',  // להציג רק בזמן שמילים "Hello" מוצגות
//         }}
//       >
//         Hello {user.firstName}
//       </Typography>

//       <Typography 
//         variant="h6" 
//         sx={{
//           marginLeft: 2, 
//           color: '#8E24AA',  // טקסט בצבע סגול כהה
//           fontWeight: 'bold',
//           display: showHello ? 'none' : 'inline',  // להציג את שם המשתמש אחרי 2 שניות
//         }}
//       >
//         {user.firstName}
//       </Typography>
//     </Box>
//   );
// };

// export default UserProfile;
import { useAuth } from '../context/AuthContext';
import { Avatar, Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

const UserProfile = () => {
  const { user } = useAuth();  // מקבלים את ה-user מה-context
  const [showHello, setShowHello] = useState(true);  // להראות "Hello" בהתחלה

  useEffect(() => {
    // אם יש יוזר, נבצע את פעולת ה-Timer אחרי 2 שניות
    if (user) {
      const timer = setTimeout(() => {
        setShowHello(false);
      }, 2000);

      return () => clearTimeout(timer);  // לנקות את ה-timer אם הקומפוננטה מוסרת
    }
  }, [user]);// אפקט זה מתרחש פעם אחת בהתחלה

  if (!user) {
    return null;  // אם אין יוזר (למשל אם הוא לא מחובר), לא מציגים כלום
  }

  // הפקת האות הראשונה משם המשתמש
  const firstLetter = user.firstName.charAt(0).toUpperCase();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 10,
        left: 10,
        display: 'flex',
        alignItems: 'center',
        padding: '8px 16px',
        borderRadius: '50%',
        boxShadow: 'none',
        backgroundColor: 'transparent',
        zIndex: 1000,  // לוודא שזה תמיד מעל התוכן
      }}
    >
      {/* עיגול סגול כהה */}
      <Avatar 
        sx={{
          bgcolor: '#8E24AA', // צבע סגול כהה יותר
          width: 50, 
          height: 50,
          fontSize: 22, // גודל טקסט בתוך העיגול
          border: 'none',  // אין מסגרת סביב העיגול
        }}
      >
        {firstLetter}
      </Avatar>

      <Typography 
        variant="h6" 
        sx={{
          marginLeft: 2, 
          color: '#8E24AA',  // טקסט בצבע סגול כהה
          fontWeight: 'bold',
          display: showHello ? 'inline' : 'none',  // להציג רק בזמן שמילים "Hello" מוצגות
        }}
      >
        Hello {user.firstName}
      </Typography>

      <Typography 
        variant="h6" 
        sx={{
          marginLeft: 2, 
          color: '#8E24AA',  // טקסט בצבע סגול כהה
          fontWeight: 'bold',
          display: showHello ? 'none' : 'inline',  // להציג את שם המשתמש אחרי 2 שניות
        }}
      >
        {user.firstName}
      </Typography>
    </Box>
  );
};

export default UserProfile;
