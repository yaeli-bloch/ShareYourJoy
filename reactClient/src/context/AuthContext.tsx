import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// הגדרת סוגי המשתמש
interface User {
    id :number;
    firstName: string;
    email: string;
    lastName:string;
    previousLastName:string;
    numberOfChildren:number;             
}
// הגדרת סוגי ה-Context
interface AuthContextType {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}
// יצירת ה-Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// יצירת ה-Provider של ה-Context
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    // בדיקה אם יש נתונים ב-localStorage ונשמור אותם ב-state
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('authToken');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
// Hook לשימוש ב-context בקומפוננטות
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
