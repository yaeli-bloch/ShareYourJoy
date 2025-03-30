import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";

// קומפוננטת טופס לפתיחת קבוצה חדשה
const GroupForm = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [adminPassword, setAdminPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newGroup = {
        name,
        password,
        adminPassword,
      };

      // שליחה לשרת להוספת קבוצה חדשה
      const token = localStorage.getItem("authToken");  // שליפה של הטוקן מ-localStorage

      const response = await axios.post(
        "https://localhost:7207/api/Group",  // כתובת ה-API שלך
        newGroup,  // הנתונים של הקבוצה
        {
          headers: {
            Authorization: `Bearer ${token}`,  // הוספת הטוקן לכותרת Authorization
          },
        }
      );

      // ברגע שהקבוצה נוצרה בהצלחה, סוגרים את הטופס
      console.log("Group created:", response.data);
      onClose(); // סגירת הטופס
    } catch (error) {
      console.error("Error creating group:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "0 auto",
        padding: 2,
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h6">הוסף קבוצה חדשה</Typography>
      <TextField
        label="שם הקבוצה"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="סיסמת הקבוצה"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        label="סיסמת ניהול"
        variant="outlined"
        type="password"
        value={adminPassword}
        onChange={(e) => setAdminPassword(e.target.value)}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={onClose} variant="outlined">
          סגור
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
        >
          {loading ? "יצירת קבוצה..." : "הוסף קבוצה"}
        </Button>
      </Box>
    </Box>
  );
};

export default GroupForm;
