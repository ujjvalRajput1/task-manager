CREATE DATABASE task_manager;
USE task_manager;

CREATE TABLE users (
  id INT 'AUTO_INCREMENT' PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('admin','member') DEFAULT 'member'
);

CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  description TEXT,
  createdBy INT
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  projectId INT,
  assignedTo INT,
  status ENUM('todo','in-progress','done') DEFAULT 'todo',
  dueDate DATE
);