// import { useEffect, useState } from "react";
// import { Typography, Container, Button, Box } from "@mui/material";
// import axios from "axios";
// import Uploader from "./upload";
// import { useNavigate, useLocation } from "react-router-dom";
// import CalendarPage from "./CalendarPage";

// const GroupPage = () => {
//   const [group, setGroup] = useState<any | null>(null);
//   const [upload, setUpload] = useState(false);
//   const [isUploading, setIsUploading] = useState(false); // מצב שמציג אם יש העלאה או לא
//   const location = useLocation();
//   const navigate = useNavigate();
//   const groupId = location.state?.groupId;

//   useEffect(() => {
//     // בקשה ל-API על מנת להציג פרטי הקבוצה
//     const fetchGroupDetails = async () => {
//       const response = await axios.get(`https://localhost:7207/api/Group/${groupId}`);
//       setGroup(response.data);
//     };

//     fetchGroupDetails();
//   }, [groupId]);

//   const hundleUpLoad = () => {
//     setUpload(true);
//   };

//   const handleUploadFinish = () => {
//     setIsUploading(false);
//     setUpload(false); // החבא את ה-Uploader אחרי שההעלאה הסתיימה
//   };

//   if (!group) {
//     return <div>{groupId}jjjj</div>; // טעינה עד שהמידע יגיע
//   }

//   return (
//     <Container
//       maxWidth="sm"
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         minHeight: "100vh",
//         textAlign: "center",
//       }}
//     >
//       <Typography variant="h4" gutterBottom>
//         {group.name}
//       </Typography>
//       <Typography variant="body1">{group.description}</Typography>
//       <Button onClick={() => navigate("/MyGroups")} variant="outlined" sx={{ marginTop: "20px" }}>
//         חזרה לקבוצות
//       </Button>
//       <Button onClick={hundleUpLoad}>upload order file</Button>

//       {upload && !isUploading && (
//         <Uploader
//           GroupId={groupId}
//           onUploadFinish={handleUploadFinish} // העבר את הפונקציה לסיים את העלאה
//         />
//        )} 
//        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "20px" }}>
//         <Button
//           onClick={() => navigate("/calendar", { state: { groupId } })}
//           variant="contained"
//           sx={{
//             backgroundColor: "#1976d2",
//             color: "white",
//             fontSize: "18px",
//             padding: "10px 20px",
//             borderRadius: "8px",
//             fontWeight: "bold",
//           }}
//         >
//           אירועי החודש 📅
//         </Button>
//       </Box>
//     </Container>
   
    
//   );
// };

// export default GroupPage;
import { useEffect, useState } from "react";
import { Typography, Container, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Uploader from "./upload";

const GroupPage = () => {
  const [group, setGroup] = useState<any | null>(null);
  const [upload, setUpload] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const groupId = location.state?.groupId;

  useEffect(() => {
    const fetchGroupDetails = async () => {
      const response = await axios.get(`https://localhost:7207/api/Group/${groupId}`);
      setGroup(response.data);
    };

    fetchGroupDetails();
  }, [groupId]);

  const hundleUpLoad = () => {
    setUpload(true);
  };

  const handleUploadFinish = () => {
    setIsUploading(false);
    setUpload(false);
  };

  if (!group) {
    return <div>{groupId}jjjj</div>;
  }

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
        position: "relative",
      }}
    >
      {/* קונטיינר שממקם את הכפתורים למעלה */}
      <Box
        sx={{
          position: "fixed",
          top: "60px", // כדי שיהיה מתחת ל-header
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px",
          background: "white",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 1000, // שיהיה מעל הכל
        }}
      >
        <Button
          onClick={() => navigate("/calendar", { state: { groupId } })}
          variant="contained"
          sx={{ backgroundColor: "#1976d2", color: "white" }}
        >
          אירועי החודש 📅
        </Button>
        <Button onClick={() => navigate("/MyGroups")} variant="outlined">
          חזרה לקבוצות
        </Button>
        <Button onClick={hundleUpLoad} variant="contained" color="secondary">
          העלאת קובץ הזמנה
        </Button>
      </Box>

      <Typography variant="h4" gutterBottom sx={{ marginTop: "120px" }}>
        {group.name}
      </Typography>
      <Typography variant="body1">{group.description}</Typography>

      {upload && !isUploading && <Uploader GroupId={groupId} onUploadFinish={handleUploadFinish} />}
    </Container>
  );
};

export default GroupPage;
