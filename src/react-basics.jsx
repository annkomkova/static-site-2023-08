import "./react-basics.css";

import React from "react";
import { createRoot } from "react-dom/client";

import O_Shedule from "./react-basics/O_Shedule.jsx";

document.body.innerHTML = '<div id="app"></div>';

const root = createRoot(document.getElementById("app"));

root.render(<O_Shedule />);
