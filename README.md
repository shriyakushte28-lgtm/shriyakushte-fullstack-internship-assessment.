# InternSphere - Student Internship Portal

InternSphere is a full-stack Student Internship Portal designed to connect students with internship opportunities and provide administrators with tools to manage internships, applications, and student activity.

The platform allows visitors to browse internship opportunities publicly, while registered students can create profiles, upload resumes, apply for internships, save opportunities, track applications, and receive status updates. Administrators can manage internships, students, applications, notifications, profile settings, and portal configuration.

---

## Project Overview

InternSphere simplifies the internship discovery and application process through a centralized platform.

The application provides two main user roles:

### Student

Students can register, log in, manage their profile, upload a resume, browse and search internships, save opportunities, apply for internships, track application status, and receive notifications and email updates.

### Admin

Administrators can access a dedicated dashboard to manage internships, view registered students, review applications, update application statuses, manage profile information, and configure portal settings.

Public users can browse and search available internships without creating an account, but registration and login are required before applying.

---

## Technology Stack

### Frontend

- React.js
- Vite
- JavaScript
- React Router
- Axios
- Tailwind CSS
- Lucide React

### Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- REST APIs
- Maven
- Java Mail Sender
- Thymeleaf Email Templates

### Database

- MySQL

### File Storage

- Cloudinary for resume storage

### Development Tools

- Git
- GitHub
- VS Code
- MySQL Workbench
- Postman

---

## Features Implemented

### Public Features

- Responsive landing page
- Public internship browsing
- Internship search
- Internship filtering
- About Portal page
- Contact Support page
- Login and registration

### Student Features

- Student registration and authentication
- Student dashboard
- Profile creation and editing
- Resume upload
- Browse internships
- Search and filter internships
- View internship details
- Save and unsave internships
- Apply for internships
- Duplicate application prevention
- View submitted applications
- Track application status
- Upcoming internship information
- Student notifications
- Email notifications for important application events
- Profile settings
- Password change functionality

### Admin Features

- Admin authentication
- Admin dashboard
- Dashboard statistics
- Internship management
- Add internship
- Edit internship
- Delete internship
- View registered students
- View student details
- View student resumes
- View internship applications
- Update application status
- Application status workflow
- Student notification generation
- Email updates for application status changes
- Admin profile management
- Admin settings
- Portal settings

---

## Application Status Workflow

Applications can move through different stages:

- Pending
- Shortlisted
- Accepted
- Rejected

Students receive application updates through the portal notification system and email notifications.

---

## Project Structure

```text
internship-assessment/
├── backend/
│   ├── src/
│   └── pom.xml
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── internship_portal_db.sql
└── README.md