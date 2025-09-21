import React from "react";

function AlumniJob({ onNavigate }) {
  return (
    <div>
      <h1>Add Job (Alumni)</h1>
      <button onClick={() => onNavigate("alumni-dashboard")}>Back</button>
    </div>
  );
}

export default AlumniJob;