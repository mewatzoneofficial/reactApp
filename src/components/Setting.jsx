import React from "react";

function Setting() {
  return (
    <div>
      <h2 className="mb-4">⚙️ Settings</h2>
      <form className="col-md-6">
        <div className="form-group mb-3">
          <label>Admin Name</label>
          <input type="text" className="form-control" defaultValue="Admin User" />
        </div>
        <div className="form-group mb-3">
          <label>Email</label>
          <input type="email" className="form-control" defaultValue="admin@example.com" />
        </div>
        <div className="form-group mb-3">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="••••••••" />
        </div>
        <button className="btn btn-success">Save Changes</button>
      </form>
    </div>
  );
}

export default Setting;
