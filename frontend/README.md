# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Installation Instructions

Follow the steps below to set up and run the InternSphere - Student Internship Portal locally.

### Prerequisites

Make sure the following software is installed on your system:

- Java 17 or later
- Maven
- Node.js and npm
- MySQL
- Git

### 1. Clone the Repository

Clone the repository using the following command:

```bash
git clone https://github.com/shriyakushte28-lgtm/shriyakushte-fullstack-internship-assessment..git
```

Navigate to the project directory:

```bash
cd shriyakushte-fullstack-internship-assessment.
```

Switch to the project branch:

```bash
git checkout "ShriyaKushte_shriyakushte28@gmail.com"
```

### 2. Database Setup

The project uses MySQL as the database.

1. Open MySQL Workbench or the MySQL command-line client.
2. Create a database named:

```sql
CREATE DATABASE internship_portal_db;
```

3. Import the provided `internship_portal_db.sql` file into the database.

The SQL script required for the project is included in the root directory of the repository.

### 3. Backend Configuration

Navigate to:

```text
backend/src/main/resources/application.properties
```

The application supports environment variables for configuration.

Configure the following database environment variables if your MySQL credentials are different from the default local configuration:

```text
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
```

For email notification functionality, configure:

```text
MAIL_USERNAME=your_email_address
MAIL_PASSWORD=your_email_app_password
```

For resume upload functionality using Cloudinary, configure:

```text
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Email credentials and Cloudinary credentials are not included in the repository for security reasons. Users running the project locally should configure their own credentials.

### 4. Run the Backend

Open a terminal in the project directory and run:

```bash
cd backend
mvn spring-boot:run
```

The Spring Boot backend will run on:

```text
http://localhost:8080
```

### 5. Run the Frontend

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install the required dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal by Vite, typically:

```text
http://localhost:5173
```

### 6. Using the Application

After both the backend and frontend servers are running:

- Students can register and log in.
- Students can browse, search, save, and apply for internships.
- Students can manage their profile and upload a resume.
- Students can track their application status and receive notifications.
- Administrators can manage internships.
- Administrators can view students and submitted applications.
- Administrators can review applications and update application statuses.

---

## Future Enhancements

The following features can be added in future versions of InternSphere:

- Dedicated company and recruiter accounts
- Company dashboard for posting and managing internships
- Skill-based internship recommendation system
- AI-powered resume analysis and improvement suggestions
- Personalized internship recommendations based on student profiles
- Advanced search and filtering options
- Interview scheduling and calendar integration
- Real-time notifications
- Advanced application analytics and reporting
- Mobile application support
- Production cloud deployment
- Automated testing and CI/CD pipeline integration

---

## Security Note

Sensitive credentials such as database passwords, email app passwords, and Cloudinary API secrets are not included in the source code or repository. These values should be configured securely using environment variables when running the application.

---

Thank you for reviewing InternSphere - Student Internship Portal.
