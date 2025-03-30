import React, { useState, useEffect } from "react";
import { Card, CardContent, CardActions, Button, Typography, List, ListItem, ListItemButton, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// הגדרת טיפוס למשתמש
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const MembersOfGroup = () => {
  const [users, setUsers] = useState<User[]>([]); // שינוי הטיפוס של users ל- User[]
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // שינוי הטיפוס של selectedUser ל- User | null
  const location = useLocation();
  const groupId = location.state?.groupId;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`https://localhost:7207/api/User/byGroup/${groupId}`);
        const rawData = await response.json(); // קבלת המידע הגולמי
        
        const formattedData = rawData.map((user: any) => ({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`, // שילוב של השמות
          email: user.email,
        //   phone: user.phone || "לא זמין", // אם אין טלפון, שים ערך ברירת מחדל
        //   address: user.address || "לא זמין", // כנ"ל עבור כתובת
        }));
  
        setUsers(formattedData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    if (groupId) fetchUsers();
  }, [groupId]);

  return (
    <Card sx={{ maxWidth: 500, margin: "auto", mt: 4, p: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          חברים בקבוצה
        </Typography>
        <List>
          {users.map((user) => (
            <ListItem key={user.id} disablePadding>
              <ListItemButton onClick={() => setSelectedUser(user)}>
                <ListItemText primary={user.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </CardContent>

      {/* דיאלוג להצגת פרטי המשתמש */}
      {selectedUser && (
        <Dialog open={Boolean(selectedUser)} onClose={() => setSelectedUser(null)}>
          <DialogTitle>פרטי משתמש</DialogTitle>
          <DialogContent>
            <Typography><strong>שם:</strong> {selectedUser.name}</Typography>
            <Typography><strong>אימייל:</strong> {selectedUser.email}</Typography>
            {/* <Typography><strong>טלפון:</strong> {selectedUser.phone}</Typography>
            <Typography><strong>כתובת:</strong> {selectedUser.address}</Typography> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedUser(null)} color="primary">סגור</Button>
          </DialogActions>
        </Dialog>
      )}
      <CardActions>
  <Button onClick={() => navigate("/MyGroup", { state: { groupId } })} variant="contained" color="primary">
    חזרה לעמוד הקבוצה
  </Button>
</CardActions>
    </Card>
    
  );
};

export default MembersOfGroup;

