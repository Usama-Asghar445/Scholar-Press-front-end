// import "./App.css";
import { Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import EmailInstructions from "../pages/auth/EmailInstructions";
import VerifyEmail from "../pages/auth/VerifyEmail";
import ResetPassword from "../pages/auth/ResetPassword";
import Author from "../pages/dashboard/author/Author";
import Editor from "../pages/dashboard/editor/Editor";
import ChiefEditor from "../pages/dashboard/chief-editor/ChiefEditor";
import Reviewer from "../pages/dashboard/reviewer/Reviewer";
import AssociateEditor from "../pages/dashboard/associate-editor/AssociateEditor";
import RoleGuard from "../components/auth/RoleGuard";

function PageRoute() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}

        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/email-verify" element={<VerifyEmail />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route
          path="/auth/email-instructions"
          element={<EmailInstructions />}
        />

        <Route
          path="/author"
          element={
            <RoleGuard allowedRoles={["Author"]}>
              <Author />
            </RoleGuard>
          }
        />
        <Route
          path="/editor"
          element={
            <RoleGuard allowedRoles={["Editor", "Associate Editor"]}>
              <Editor />
            </RoleGuard>
          }
        />
        <Route
          path="/chief-editor"
          element={
            <RoleGuard allowedRoles={["Editor in Chief"]}>
              <ChiefEditor />
            </RoleGuard>
          }
        />
        <Route
          path="/reviewer"
          element={
            <RoleGuard allowedRoles={["Reviewer"]}>
              <Reviewer />
            </RoleGuard>
          }
        />
        <Route
          path="/associate-editor"
          element={
            <RoleGuard allowedRoles={["Associate Editor"]}>
              <AssociateEditor />
            </RoleGuard>
          }
        />

        {/* <Route path="/user/forget-password" element={<ForgotPassword />} />
        <Route path="/user/reset-password" element={<ResetPassword />} />
        <Route path="/user/Verify-email" element={<VerifyCode />} />
        <Route path="/author-dashboard" element={<AuthorDashboard />} />
        <Route path="/user/email-instruction" element={<EmailInstructions />} />

        <Route
          path="/editor-in-chief-dashboard"
          element={<ChiefEditorDashboard />}
        />
        <Route path="/editor-dashboard" element={<EditorDashboard />} />
        <Route path="/reviewer-dashboard" element={<ReviewerDashboard />} /> */}
      </Routes>
    </>
  );
}

export default PageRoute;
