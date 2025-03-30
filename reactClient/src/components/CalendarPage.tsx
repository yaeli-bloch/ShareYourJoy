import { useEffect, useState } from "react";
import { Typography, Container, Button, Grid, Box, Grid2 } from "@mui/material";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const CalendarPage = () => {
// const [group, setGroup] = useState<any | null>(null);
  const [files, setFiles] = useState<any[]>([]);  // רשימה של הקבצים
  const location = useLocation();
  const navigate = useNavigate();
  const groupId = location.state?.groupId;

  // טוען את פרטי הקבוצה ואת הקבצים שלה
  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        // טוען את פרטי הקבוצה
        // const response = await axios.get(`https://localhost:7207/api/Group/${groupId}`);
        // setGroup(response.data);
  
        // טוען את רשימת הקבצים של הקבוצה
        const filesResponse = await axios.get(`https://localhost:7207/api/Group/${groupId}/files`);
        setFiles(filesResponse.data);
  
        // הדפס את הקבצים לקונסול כדי לוודא שהם נטענים
        console.log("Loaded files:", filesResponse.data);
      } catch (error) {
        console.error("Error fetching group details or files:", error);
      }
    };
  
    fetchGroupDetails();
  }, [groupId]);

  // if (!group) {
  //   return <div>טוען נתונים...</div>;
  // }

  // פונקציה להמיר את תאריך ההעלאה לתאריך לוח שנה
  const getFileByDate = (date: string) => {
    // מחפש את הקובץ לפי תאריך
    const file = files.find((file: any) => new Date(file.createdAt).toLocaleDateString() === date);
    // אם נמצא קובץ, מחזיר קישור לתמונה ב-AWS
    return file ? <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">{file.title}</a> : null;
  };

  // לוח שנה של החודש הנוכחי
  const getCalendar = () => {
    const currentDate = new Date();
    const month = currentDate.getMonth();  // החודש הנוכחי
    const year = currentDate.getFullYear(); // השנה הנוכחית

    const daysInMonth = new Date(year, month + 1, 0).getDate(); // מספר ימים בחודש

    let calendar = [];
    const firstDayOfMonth = new Date(year, month, 1).getDay();  // היום בשבוע של היום הראשון בחודש
    let dayCount = 1;

    // הוספת ימים ריקים עד ליום הראשון של החודש
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendar.push(<Box key={`empty-${i}`} className="empty-day" />);
    }

    // הוספת הימים בפועל
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day).toLocaleDateString();
      const fileLink = getFileByDate(date); // קישור לקובץ אם יש
      calendar.push(
        <Grid item xs={1} key={day} className="calendar-day">
          <Box sx={{ padding: 1, border: "1px solid #ddd", textAlign: "center" }}>
            <div>{day}</div>
            <div>{fileLink}</div> {/* הצגת קישור אם יש קובץ */}
          </Box>
        </Grid>
      );
    }

    return calendar;
  };

  return (
    <Container maxWidth="sm">
      {/* <Typography variant="h4" gutterBottom>
        {group.name}
      </Typography> */}
      {/* <Typography variant="body1">
        {group.description}
        </Typography> */}
      {/* <Button onClick={() => navigate("/MyGroups")} variant="outlined" sx={{ marginTop: "20px" }}>
        חזרה לקבוצות
      </Button> */}
      <div>
        <h3>לוח שנה:</h3>
        <Grid2 container spacing={1} sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
          {getCalendar()}
        </Grid2>
      </div>
      <Button onClick={() => navigate("/MyGroup", { state: { groupId } })} variant="contained" color="primary">
          חזרה לעמוד הקבוצה
        </Button>
    </Container>
  );
};

export default CalendarPage;



