import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/DashBoard";
import Files from "../pages/files/Files";
import FolderDetails from "../pages/folders/FolderDetails";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/files" element={<Files />} />
      <Route path="/folders/:folderId"
        element={<FolderDetails />}

      />
      {/* <Route path="/files" element={<Explorer />} /> */}
      {/* <Route path="/folders/:folderId" element={<Explorer />} /> */}
    </Routes>
  );
}

export default AppRoutes;