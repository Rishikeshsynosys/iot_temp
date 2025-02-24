import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./guards/ProtectedRoute";
import { modules } from "./constants/modules";
import FullPageLoader from "./components/UI/Loader";

import "./App.css";

const LoginPage = lazy(() => import("./pages/Login"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<FullPageLoader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            {modules?.map(({ path, element: Element }) => (
              <Route key={path} path={path} element={<Element />} />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
