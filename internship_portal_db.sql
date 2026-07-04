CREATE DATABASE  IF NOT EXISTS `internship_portal_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `internship_portal_db`;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: internship_portal_db
-- ------------------------------------------------------
-- Server version	9.7.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '83244c6e-64ba-11f1-9501-0a002700000c:1-213';

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `student_id` bigint NOT NULL,
  `internship_id` bigint NOT NULL,
  `cover_letter` text,
  `resume_url` varchar(255) DEFAULT NULL,
  `status` enum('PENDING','SHORTLISTED','ACCEPTED','REJECTED') NOT NULL,
  `applied_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_student_internship` (`student_id`,`internship_id`),
  KEY `internship_id` (`internship_id`),
  KEY `idx_applications_status` (`status`),
  KEY `idx_applications_student` (`student_id`),
  CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student_profiles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`internship_id`) REFERENCES `internships` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (1,1,1,'I am interested in this internship.','resume.pdf','REJECTED','2026-06-29 16:50:19','2026-06-30 11:40:21'),(2,1,2,'','resume.pdf','SHORTLISTED','2026-06-29 19:09:35','2026-07-01 13:38:22'),(3,1,3,'','resume.pdf','ACCEPTED','2026-06-29 19:22:32','2026-06-30 11:33:35'),(4,2,4,'','resume.pdf','PENDING','2026-07-01 16:41:45','2026-07-01 16:41:45'),(5,2,1,'','resume.pdf','PENDING','2026-07-01 16:42:03','2026-07-01 16:42:02'),(6,2,5,'','resume.pdf','SHORTLISTED','2026-07-01 17:12:14','2026-07-03 20:17:55'),(7,2,9,'','/uploads/resumes/d31f09e5-227c-47d6-b2dc-28da4ab2371a_resume.pdf','ACCEPTED','2026-07-03 17:47:27','2026-07-03 20:17:48'),(8,2,10,'','/uploads/resumes/d31f09e5-227c-47d6-b2dc-28da4ab2371a_resume.pdf','ACCEPTED','2026-07-03 21:17:29','2026-07-03 21:18:13'),(9,6,1,'','/uploads/resumes/6638de9a-d4f4-499b-8fee-818770c5bb62_certificate.pdf','PENDING','2026-07-04 07:55:15','2026-07-04 07:55:14'),(10,6,2,'','/uploads/resumes/6638de9a-d4f4-499b-8fee-818770c5bb62_certificate.pdf','PENDING','2026-07-04 07:55:26','2026-07-04 07:55:25'),(11,6,3,'','/uploads/resumes/6638de9a-d4f4-499b-8fee-818770c5bb62_certificate.pdf','PENDING','2026-07-04 07:55:38','2026-07-04 07:55:37'),(12,6,8,'','/uploads/resumes/6638de9a-d4f4-499b-8fee-818770c5bb62_certificate.pdf','ACCEPTED','2026-07-04 07:57:51','2026-07-04 08:07:33'),(13,6,10,'','/uploads/resumes/6638de9a-d4f4-499b-8fee-818770c5bb62_certificate.pdf','ACCEPTED','2026-07-04 08:00:35','2026-07-04 08:07:24');
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `internships`
--

DROP TABLE IF EXISTS `internships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `internships` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `is_remote` tinyint(1) DEFAULT '0',
  `stipend` decimal(38,2) DEFAULT NULL,
  `duration_months` int DEFAULT NULL,
  `skills_required` text,
  `openings` int DEFAULT '1',
  `deadline` date DEFAULT NULL,
  `status` enum('OPEN','CLOSED') DEFAULT 'OPEN',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_internships_status` (`status`),
  KEY `idx_internships_deadline` (`deadline`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `internships`
--

LOCK TABLES `internships` WRITE;
/*!40000 ALTER TABLE `internships` DISABLE KEYS */;
INSERT INTO `internships` VALUES (1,'Frontend Developer Intern','TechCorp Solutions','Work on building modern React-based web applications. You will collaborate with senior engineers to deliver features for our SaaS product.','Bangalore',0,20000.00,3,'React, JavaScript, CSS, HTML',3,'2026-07-28','OPEN','2026-06-28 12:36:43','2026-06-30 12:32:47'),(2,'Backend Java Intern','Infosys','Build and maintain RESTful APIs using Spring Boot. Gain hands-on experience with enterprise-grade Java development.','Hyderabad',0,18000.00,6,'Java, Spring Boot, MySQL, REST APIs',5,'2026-08-12','OPEN','2026-06-28 12:36:43','2026-06-28 12:36:43'),(3,'Full Stack Intern','NeoAI Tech','End-to-end development using React and Node.js. Work directly with the product team on a live AI-powered application.','Remote',1,20000.00,3,'React, Node.js, JavaScript, MongoDB',2,'2026-07-18','OPEN','2026-06-28 12:36:43','2026-06-28 12:36:43'),(4,'Data Science Intern','Analytics Hub','Work on real-world machine learning projects involving data cleaning, model building, and visualization.','Mumbai',0,12000.00,4,'Python, Pandas, Scikit-learn, SQL',2,'2026-07-13','OPEN','2026-06-28 12:36:43','2026-06-28 12:36:43'),(5,'UI/UX Design Intern','DesignLab India','Create wireframes, prototypes, and final UI designs for mobile and web apps. Work closely with developers.','Pune',0,10000.00,2,'Figma, Adobe XD, Wireframing, Prototyping',1,'2026-07-08','OPEN','2026-06-28 12:36:43','2026-06-28 12:36:43'),(8,'SDE intern','Google','abc','Mumbai',1,15000.00,3,'java sql ',2,'2026-06-30','OPEN','2026-06-30 12:23:24','2026-06-30 12:23:24'),(9,'Java Developer Intern','TechCorp','Backend Internship','Mumbai',1,15000.00,6,'Java, Spring Boot',2,'2026-08-15','OPEN','2026-06-30 12:26:44','2026-06-30 12:26:44'),(10,'data analyst intern','Google','xyz','Mumbai',1,15000.00,3,'React, JavaScript, CSS, HTML',3,'2026-07-04','OPEN','2026-07-03 20:17:34','2026-07-03 20:17:34');
/*!40000 ALTER TABLE `internships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `student_id` bigint NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_notification_student` (`student_id`),
  CONSTRAINT `fk_notification_student` FOREIGN KEY (`student_id`) REFERENCES `student_profiles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,2,'Application Accepted','Congratulations! TechCorp accepted your application.','APPLICATION',0,'2026-07-01 18:36:30'),(2,1,'Application Shortlisted','Congratulations! You have been shortlisted for Backend Java Intern at Infosys.','APPLICATION',0,'2026-07-01 19:08:23'),(3,2,'Application Accepted','Congratulations! Your application for Java Developer Intern at TechCorp has been accepted.','APPLICATION',0,'2026-07-04 01:47:49'),(4,2,'Application Shortlisted','Congratulations! You have been shortlisted for UI/UX Design Intern at DesignLab India.','APPLICATION',0,'2026-07-04 01:47:56'),(5,2,'Application Accepted','Congratulations! Your application for data analyst intern at Google has been accepted.','APPLICATION',0,'2026-07-04 02:48:13'),(6,6,'Application Accepted','Congratulations! Your application for data analyst intern at Google has been accepted.','APPLICATION',0,'2026-07-04 13:37:40'),(7,6,'Application Accepted','Congratulations! Your application for SDE intern at Google has been accepted.','APPLICATION',0,'2026-07-04 13:37:49');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portal_settings`
--

DROP TABLE IF EXISTS `portal_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portal_settings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `portal_name` varchar(255) DEFAULT NULL,
  `support_email` varchar(255) DEFAULT NULL,
  `max_applications` int DEFAULT NULL,
  `internship_duration` varchar(255) DEFAULT NULL,
  `email_notifications` tinyint(1) DEFAULT NULL,
  `registration_alerts` tinyint(1) DEFAULT NULL,
  `internship_alerts` tinyint(1) DEFAULT NULL,
  `weekly_reports` tinyint(1) DEFAULT NULL,
  `dark_mode` tinyint(1) DEFAULT NULL,
  `session_timeout` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portal_settings`
--

LOCK TABLES `portal_settings` WRITE;
/*!40000 ALTER TABLE `portal_settings` DISABLE KEYS */;
INSERT INTO `portal_settings` VALUES (1,'Student Internship Portal','support@gmail.com',5,'6 Months',1,1,1,0,0,30);
/*!40000 ALTER TABLE `portal_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saved_internships`
--

DROP TABLE IF EXISTS `saved_internships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saved_internships` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `student_id` bigint NOT NULL,
  `internship_id` bigint NOT NULL,
  `saved_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_id` (`student_id`,`internship_id`),
  KEY `fk_saved_internship` (`internship_id`),
  CONSTRAINT `fk_saved_internship` FOREIGN KEY (`internship_id`) REFERENCES `internships` (`id`),
  CONSTRAINT `fk_saved_student` FOREIGN KEY (`student_id`) REFERENCES `student_profiles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saved_internships`
--

LOCK TABLES `saved_internships` WRITE;
/*!40000 ALTER TABLE `saved_internships` DISABLE KEYS */;
INSERT INTO `saved_internships` VALUES (2,2,1,'2026-07-03 02:14:19'),(3,6,1,'2026-07-04 13:31:04');
/*!40000 ALTER TABLE `saved_internships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_profiles`
--

DROP TABLE IF EXISTS `student_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_profiles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `college` varchar(255) DEFAULT NULL,
  `degree` varchar(255) DEFAULT NULL,
  `graduation_year` int DEFAULT NULL,
  `skills` text,
  `resume_url` varchar(255) DEFAULT NULL,
  `bio` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `student_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_profiles`
--

LOCK TABLES `student_profiles` WRITE;
/*!40000 ALTER TABLE `student_profiles` DISABLE KEYS */;
INSERT INTO `student_profiles` VALUES (1,1,'Shriya Kushte','1234567890','Xavier Institute of Engineering','B.Tech CSE',2027,'Java, Spring Boot, React, MySQL','resume.pdf','Aspiring Full Stack Developer','2026-06-28 16:15:47','2026-06-28 16:15:47'),(2,4,'abc','1234567890','xyz','B.E',2026,'java, sql','/uploads/resumes/6f3d7615-7f4c-4cc3-99bc-ee7956868c70_resume.pdf','','2026-06-30 17:30:34','2026-07-04 01:06:39'),(3,15,'abc','','','',NULL,'','','','2026-07-04 01:02:30','2026-07-04 01:02:30'),(4,16,'abc','','','',NULL,'','','','2026-07-04 01:03:00','2026-07-04 01:03:00'),(6,18,'abc','1234567890','xyz','B.E',2026,'java, sql','/uploads/resumes/6638de9a-d4f4-499b-8fee-818770c5bb62_certificate.pdf','','2026-07-04 01:04:39','2026-07-04 07:55:07');
/*!40000 ALTER TABLE `student_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('STUDENT','ADMIN') NOT NULL DEFAULT 'STUDENT',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin User','admin@gmail.com','$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','ADMIN','2026-06-28 12:36:43','2026-07-03 21:36:14'),(2,'Shriya Kushte','shriya@gmail.com','$2a$10$qdBE.1VY8eKEXjDJU2jsQOUtXp/RJVgQXcsGqJD7oPg4nWKaQc5Wi','STUDENT','2026-06-28 15:14:46','2026-06-28 15:14:46'),(3,'Admin','admin@internsphere.com','$2a$12$FWc4rnMMq3GmKqmyUIa8luiIWjB9TNVxH5AROTNbMEI9BR1C.M9Mu','ADMIN','2026-06-30 12:55:05','2026-06-30 12:55:05'),(4,'abc','abc@gmail.com','$2a$10$cbxyRLifgaFpisn.pRI7QOQD7Ru6dR5RhwTICBPhVJtU2k9v1FwD.','STUDENT','2026-06-30 17:15:57','2026-06-30 17:15:57'),(5,'admin123','admin123@internsphere.com','$2a$10$GuMmkK50A7So9g2jVkZkhu/Uwmidc22V4uXcg22VXz6U48F8f9IeK','STUDENT','2026-07-03 17:52:48','2026-07-03 17:52:48'),(15,'abc','shriyakushte2856@gmail.com','$2a$10$4DoKaha3B3ZOg3dokADJt.VY8dJQyJM2RZ4SPjWthdlUOx/Il4wVK','STUDENT','2026-07-04 01:02:30','2026-07-04 01:02:30'),(16,'abc','shriyakushte1028@gmail.com','$2a$10$sDj5MJuoY95kQui1YM9yce/9JP9L9md57ATtuGNWIcofYtGdj8Dmq','STUDENT','2026-07-04 01:03:01','2026-07-04 01:03:00'),(18,'abc','shriyakushte28@gmail.com','$2a$10$0vzdf8Zrg8FaeVj3gSo0UOBttBOlZTAmXk.xGke9BfFis4Ixtxm.e','STUDENT','2026-07-04 01:04:39','2026-07-04 01:04:39');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-04 16:58:41
