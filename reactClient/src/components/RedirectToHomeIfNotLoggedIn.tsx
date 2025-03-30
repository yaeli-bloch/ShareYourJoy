import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RedirectToHomeIfNotLoggedIn = () => {
  const [openDialog, setOpenDialog] = useState(true);  // מציג את הדיאלוג בהתחלה
  const { user } = useAuth(); // בודק אם המשתמש מחובר
  const navigate = useNavigate(); // נווט את המשתמש

  // פונקציה לסגירת הדיאלוג וניווט לדף הבית
  const handleCloseDialog = () => {
    setOpenDialog(false);  // סגור את הדיאלוג
    navigate('/');  // הוביל את המשתמש לדף הבית
  };

  // אם אין משתמש מחובר, מציגים את הדיאלוג
  if (!user) {
    return (
      <Dialog open={openDialog}>
        <DialogTitle>התחברות/הרשמה נדרשת</DialogTitle>
        <DialogContent>
          <p>כדי לגשת לדף הקבוצות, עליך להתחבר או להירשם תחילה.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            הבנתי
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  // אם המשתמש מחובר, נוודא שהוא יכול להמשיך
  return null;  // אם יש יוזר, לא מציגים את הדיאלוג
};

export default RedirectToHomeIfNotLoggedIn;
