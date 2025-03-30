import React, { useEffect, useState } from "react";
import { Button, Box, Typography, Container } from "@mui/material";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import GroupForm from "./GroupForm";  // ייבוא הקומפוננטה של הטופס
import { useNavigate } from "react-router-dom"; 

const MyGroups = () => {
  const { user } = useAuth();  // מקבלים את המשתמש מה-context
  const [groups, setGroups] = useState<any[]>([]);  // רשימת הקבוצות
  const [showForm, setShowForm] = useState<boolean>(false);  // מצב הצגת הטופס
  const navigate = useNavigate(); 

  // שליחה לבקשה כדי לקבל את הקבוצות שהמשתמש שייך אליהם
  useEffect(() => {
    if (!user) return;

    axios
      .get(`https://localhost:7207/api/user/${user.id}/groups`)  // קריאה ל-API של הקבוצות של המשתמש
      .then((response) => {
        setGroups(response.data);  // עדכון רשימת הקבוצות
      })
      .catch((error) => {
        console.error("Error fetching groups", error);
      });
  }, [user]);

  // פונקציה לחיצה על כפתור הוספת קבוצה
  const handleAddGroupClick = () => {
    setShowForm(true);  // הצגת הטופס
  };

  // פונקציה לסגור את הטופס
  const handleCloseForm = () => {
    setShowForm(false);  // סגירת הטופס
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        הקבוצות שלי
      </Typography>

      {/* כפתור הוספת קבוצה */}
      <Button
  variant="contained"
  color="primary"
  onClick={handleAddGroupClick}
  sx={{
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 9999,  // הגבה את ה-z-index
  }}
>
  הוסף קבוצה
</Button>



      {/* הצגת הטופס במידה ונלחץ על הוסף קבוצה */}
      {showForm ? (
        <GroupForm onClose={handleCloseForm} />
      ) : (
        // אם לא מוצג טופס, הצגת הקבוצות
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {groups.map((group) => (
            <Button
              key={group.id}
              variant="contained"
              onClick={() => navigate("/MyGroup", { state: { groupId: group.id} })} // ניווט לקבוצה
              sx={{ width: "200px", margin: "10px auto" }}
            >
              {group.name}
            </Button>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default MyGroups;
