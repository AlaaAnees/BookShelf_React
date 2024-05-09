import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

import "react-alice-carousel/lib/alice-carousel.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="350723405048-3d9tlue8l8ofecqg1sgmev1c8evakv43.apps.googleusercontent.com">
    <App/>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
