import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/DashBoard";
import Files from "../pages/files/Files";
import FolderDetails from "../pages/folders/FolderDetails";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Collections from "../pages/collections/Collections";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/files" element={<Files />} />
      <Route path="/favorites" element={<Collections mode="favorites" />} />
      <Route path="/trash" element={<Collections mode="trash" />} />
      <Route path="/folders/:folderId"
        element={<FolderDetails />}

      />
      {/* <Route path="/files" element={<Explorer />} /> */}
      {/* <Route path="/folders/:folderId" element={<Explorer />} /> */}
    </Routes>
  );
}

export default AppRoutes;
