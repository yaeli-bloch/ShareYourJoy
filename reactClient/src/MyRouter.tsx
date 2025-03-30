import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyGroups from "./components/MyGroups"; // הדף שמציג את הקבוצות
import GroupPage from "./components/GroupPage"; // הדף של הקבוצה
import HomePage from "./components/HomePage";
import Uploader from "./components/upload";
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./Layout";
import PrivateRoute from "./components/PrivateRoute";
import CalendarPage from "./components/CalendarPage";

export const Myrouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },  
        {
            path: "/Mygroups",
            element: (
              <PrivateRoute>
                <MyGroups />
              </PrivateRoute>
            ),
          },
        {path:"/MyGroup",element:<GroupPage/>},
        {path:"/calendar",element:<CalendarPage/>}   
      ],
    },
    
  ]);

export default function App() {
  return <RouterProvider router={Myrouter} />;
}
