import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Signin from './components/member/Signin';

import DashAdmin from './components/admin/DashAdmin';
import ProjectForm from './components/admin/ProjectForm';
import ProjectList from './components/admin/ProjectList';
import TaskList from './components/admin/TaskList';
import Team from './components/admin/Team';

import DashUser from './components/member/DashUser';
import Task from './components/member/Task';
import TeamDash from './components/member/TeamDash';
import Project from './components/member/Project';

const App = () => {
  return (
    <Routes>
      {/* Signin Page */}
      <Route path="/" element={<Signin />} />

      {/* Admin Dashboard */}
      <Route path="/dashadmin" element={<DashAdmin />}>
        <Route index element={<div>Welcome Admin</div>} />
        <Route path="addproject" element={<ProjectForm />} />
        <Route path="editproject" element={<ProjectForm />} />
        <Route path="projects" element={<ProjectList />} />
        <Route path="tasks" element={<TaskList />} />
        <Route path="team" element={<Team />} />
      </Route>

      {/* User Dashboard */}
      <Route path="/dashuser" element={<DashUser />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<TeamDash />} />
        <Route path="tasks" element={<Task />} />
        <Route path="projects" element={<Project />} />

      </Route>

      {/* Catch unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
