import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import RedirectToHomeIfNotLoggedIn from './RedirectToHomeIfNotLoggedIn'; // דואגים לייבא את הקומפוננטה
import { ReactNode } from 'react';

const PrivateRoute: React.FC<{ children: ReactNode }> = ({children}) => {
  const { user } = useAuth();

  if (!user) {
    return <RedirectToHomeIfNotLoggedIn />; // אם המשתמש לא מחובר, מציגים את ההודעה ומנווטים לדף הבית
  }

  return <>{children}</>; // אם המשתמש מחובר, נמשיך להציג את הדף המבוקש
};

export default PrivateRoute;
