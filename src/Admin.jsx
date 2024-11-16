import React from 'react';
import './pages/Admin/admin.css'

function Admin() {
  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Welcome to Admin Dashboard</h1>
      </header>
      
      <div className="admin-container">
        <nav className="admin-sidebar">
          <ul>
            <li><a href="/admin/dashboard">All Posts</a></li>
            <li><a href="/admin/users">All Users</a></li>
            <li><a href="/admin/settings">Logout</a></li>
          </ul>
        </nav>

        <main className="admin-main">
          <h2>Admin Content</h2>
          <p>This is where you can manage your platform's content and users.</p>
        </main>
      </div>
    </div>
  );
}

export default Admin;
