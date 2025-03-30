import { useState } from "react";
import { Button, Typography, Box, Container } from "@mui/material";
import Login from "./Login";
import Register from "./Register";
import MyGroups from "./MyGroups";  // או כל קומפוננטה אחרת שתרצי להציג אחרי הצלחה
import UserProfile from "./UserProfile";
const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");  // כדי לעבור בין הקומפוננטות

  // פונקציה שמעדכנת את הסטייט אחרי הצלחה בלוגין או רישום
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage("myGroups");  // אחרי התחברות מוצלחת, העבר לעמוד "MyGroups"
  };

  const handleRegisterSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage("myGroups");  // אחרי רישום מוצלח, העבר לעמוד "MyGroups"
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" gutterBottom>
        ברוך הבא לאתר שלנו!
      </Typography>

      {/* כפתורים לשינוי בין לוגין ורישום */}
      {currentPage === "home" && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Button
            variant="contained"
            size="large"
            sx={{ width: "200px", margin: "10px auto" }}
            onClick={() => setCurrentPage("login")}
          >
            התחברות
          </Button>
          <Button
            variant="contained"
            size="large"
            sx={{ width: "200px", margin: "10px auto" }}
            onClick={() => setCurrentPage("register")}
          >
            הרשמה 
          </Button>
        </Box>
      )}

      {/* תצוגה של לוגין */}
      {currentPage === "login" && <Login onLoginSuccess={handleLoginSuccess} />}

      {/* תצוגה של רישום */}
      {currentPage === "register" && <Register onRegisterSuccess={handleRegisterSuccess} />}

      {/* אם המשתמש מחובר, הראה את הקומפוננטה MyGroups */}
      {/* {isAuthenticated && currentPage === "myGroups" && (  
      <UserProfile />  
)} */}
      
    </Container>
  );
};

export default HomePage;
