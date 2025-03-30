import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Button, TextField, LinearProgress, Box, Typography, IconButton } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from "react-router-dom";

const Uploader = ({ GroupId, onUploadFinish }: { GroupId: number, onUploadFinish: () => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState(""); // משתנה לשם הקובץ
  const [showForm, setShowForm] = useState(false); // מצב של פתיחת הטופס
  const { user } = useAuth(); // הנחת עבודה שיש לך קונטקסט עם userId ו- groupId
  const navigate = useNavigate();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setShowForm(true); // מציג את הטופס כאשר נבחר קובץ
    }
  };

  const handleUpload = async () => {
    if (!file || !title) return;

    try {
      // שלב 1: בקשה לשרת לקבלת ה-Presigned URL
      const response = await axios.get("https://localhost:7207/api/upload/presigned-url", {
        params: { fileName: file.name },
      });

      const presignedUrl = response.data.url;

      // שלב 2: העלאת הקובץ ישירות ל-S3 בעזרת ה-Presigned URL
      await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setProgress(percent); // הצגת התקדמות העלאה
        },
      });

      // חיתוך ה-URL להורדה
      const fileDownloadUrl = presignedUrl.split('?')[0];

      // שלב 3: שליחת הנתונים לשרת לשמירה בבסיס הנתונים (שמירת הקובץ ברשימת הקבצים)
      const fileData = {
        title,
        fileUrl: fileDownloadUrl, // ה-URL להורדה של הקובץ ב-S3
        userId: user?.id,
        groupId: GroupId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await axios.post("https://localhost:7207/api/files", fileData);

      

      // לאחר ההעלאה, נסיר את הטופס ונתוני הקובץ
      setFile(null);
      setTitle("");
      setProgress(0);
      setShowForm(false);

      // איפוס התצוגה של input file (מאפשר בחירה מחדש)
      const inputFileElement = document.querySelector('input[type="file"]');
      if (inputFileElement) {
        (inputFileElement as HTMLInputElement).value = ''; // איפוס התצוגה של input file
      }

      // קריאה לפונקציה לאחר סיום העלאה
      onUploadFinish();

    } catch (error) {
      console.error("שגיאה בהעלאה:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        width: "400px",
        margin: "20px auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          border: "2px dashed #4caf50",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          transition: "background-color 0.3s",
          "&:hover": {
            backgroundColor: "#f1f1f1",
          },
        }}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <CloudUploadIcon sx={{ fontSize: "40px", color: "#4caf50", marginBottom: "10px" }} />
        <Typography variant="body1" sx={{ color: "#4caf50", textAlign: "center" }}>
          לחץ כאן או גרור קובץ כדי להעלות
        </Typography>
        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </Box>

      {showForm && (
        <Box sx={{ width: "100%", marginTop: "15px" }}>
          <TextField
            fullWidth
            label="הכנס כותרת לקובץ"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            sx={{ marginBottom: "15px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            fullWidth
            sx={{
              padding: "12px",
              fontSize: "16px",
              borderRadius: "8px",
              textTransform: "none",
            }}
          >
            העלה קובץ
          </Button>
        </Box>
      )}

      {progress > 0 && (
        <Box sx={{ width: "100%", marginTop: "15px" }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: "10px",
              borderRadius: "5px",
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#4caf50",
              },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#fff",
              fontSize: "12px",
            }}
          >
            {progress}%
          </Box>
        </Box>
      )}
      <Button onClick={() => navigate("/MyGroup", { state: { groupId: GroupId } })} variant="contained" color="primary">
          חזרה לעמוד הקבוצה
      </Button>
    </Box>
  );
};

export default Uploader;
