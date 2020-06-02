-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: localhost    Database: aqaratk
-- ------------------------------------------------------
-- Server version	5.7.29-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `display_name` varchar(100) NOT NULL,
  `status` bigint(4) NOT NULL DEFAULT '1',
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'al_jasrah','Al Jasrah',1,'2020-05-22 15:47:56',NULL),(2,'al_bidda','Al Bidda',1,'2020-05-22 15:47:57',NULL),(3,'fereej _mohamed_bin_jasim','Fereej Mohamed Bin Jasim',1,'2020-05-22 15:47:57',NULL),(4,'mushayrib','Mushayrib',1,'2020-05-22 15:48:38',NULL),(5,'al_najada','Al Najada',1,'2020-05-22 15:48:38',NULL),(6,'Barahat Al Jufairi','Barahat Al Jufairi',1,'2020-05-22 15:50:46',NULL),(7,'Fereej Al Asmakh','Fereej Al Asmakh',1,'2020-05-22 15:50:46',NULL),(8,'Old Al Ghanim','Old Al Ghanim',1,'2020-05-22 15:50:46',NULL),(9,'Al Souq','Al Souq',1,'2020-05-22 15:50:46',NULL),(10,'Wadi Al Sail','Wadi Al Sail',1,'2020-05-22 15:50:46',NULL),(11,'Rumeilah','Rumeilah',1,'2020-05-22 15:50:46',NULL),(12,'Al Bidda','Al Bidda',1,'2020-05-22 15:50:46',NULL),(13,'Mushayrib','Mushayrib',1,'2020-05-22 15:50:46',NULL),(14,'Fereej Abdel Aziz','Fereej Abdel Aziz',1,'2020-05-22 15:50:46',NULL),(15,'Ad Dawhah al Jadidah','Ad Dawhah al Jadidah',1,'2020-05-22 15:53:10',NULL),(16,'Old Al Ghanim','Old Al Ghanim',1,'2020-05-22 15:53:11',NULL),(17,'Al Rufaa','Al Rufaa',1,'2020-05-22 15:53:11',NULL),(18,'Old Al Hitmi','Old Al Hitmi',1,'2020-05-22 15:53:11',NULL),(19,'As Salatah','As Salatah',1,'2020-05-22 15:53:31',NULL);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logins`
--

DROP TABLE IF EXISTS `logins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logins` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `mobile_number` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logins`
--

LOCK TABLES `logins` WRITE;
/*!40000 ALTER TABLE `logins` DISABLE KEYS */;
INSERT INTO `logins` VALUES (1,'lokesh@gmail.com',8106986509,'','test','','2020-05-21 13:31:49',NULL),(2,'email@gmail.com',8106986509,'','test','098f6bcd4621d373cade4e832627b4f6','2020-05-21 13:38:02',NULL),(3,'email@gmail.com',8106986809,'','test','098f6bcd4621d373cade4e832627b4f6','2020-05-21 13:38:35',NULL),(4,'email@gmail.com',8106986709,'','test','098f6bcd4621d373cade4e832627b4f6','2020-05-21 13:47:12',NULL),(5,'email11@gmail.com',8176926609,'','test1','098f6bcd4621d373cade4e832627b4f6','2020-05-21 13:53:51',NULL),(6,'test123@gmail.com',1234567890,'test12','test123','cc03e747a6afbbcbf8be7668acfebee5','2020-05-26 05:35:11',NULL),(7,'test1213@gmail.com',1234167890,'test12','test1231','cc03e747a6afbbcbf8be7668acfebee5','2020-05-26 05:36:10',NULL),(8,'test1234@gmail.com',7896543210,'test1234','test1234','16d7a4fca7442dda3ad93c9a726597e4','2020-05-26 06:39:35',NULL),(9,'email1234@gmail.com',1212121212,'test','test1212','098f6bcd4621d373cade4e832627b4f6','2020-05-27 13:43:02',NULL),(10,'email12345@gmail.com',1212121211,'test','test12121','098f6bcd4621d373cade4e832627b4f6','2020-05-27 13:45:26',NULL),(11,'email123456@gmail.com',1212121210,'test','test123456','098f6bcd4621d373cade4e832627b4f6','2020-05-27 13:48:45',NULL),(12,'email1234567@gmail.com',1212171210,'test','test1234567','098f6bcd4621d373cade4e832627b4f6','2020-05-27 13:50:31',NULL),(13,'email12345678@gmail.com',1212171220,'test','test12345678','098f6bcd4621d373cade4e832627b4f6','2020-05-27 13:54:04',NULL),(14,'email123456789@gmail.com',1213171220,'test','test123456789','098f6bcd4621d373cade4e832627b4f6','2020-05-27 14:23:15',NULL),(15,'email12345679@gmail.com',1223171220,'test','test12345679','098f6bcd4621d373cade4e832627b4f6','2020-05-27 14:24:53',NULL),(16,'email2345679@gmail.com',123171220,'test','test2345679','098f6bcd4621d373cade4e832627b4f6','2020-05-27 14:26:01',NULL),(17,'testing123@gmail.com',8106986302,'testing','testing','098f6bcd4621d373cade4e832627b4f6','2020-06-01 15:10:14',NULL),(18,'testing1@gmail.com',7207228423,'testing1','testing1','098f6bcd4621d373cade4e832627b4f6','2020-06-01 15:15:57',NULL);
/*!40000 ALTER TABLE `logins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `property` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `login_id` bigint(10) unsigned NOT NULL,
  `location_id` bigint(10) unsigned NOT NULL,
  `property_id` bigint(10) unsigned NOT NULL,
  `no_of_bed_rooms` int(10) DEFAULT NULL,
  `furniture` enum('Semi Furnished','Fully Furnished') NOT NULL,
  `price` varchar(45) DEFAULT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` datetime DEFAULT NULL,
  `images` json DEFAULT NULL,
  `email_sent` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property`
--

LOCK TABLES `property` WRITE;
/*!40000 ALTER TABLE `property` DISABLE KEYS */;
INSERT INTO `property` VALUES (1,1,15,1,1,'Semi Furnished',NULL,'2020-05-28 07:20:40',NULL,'{\"0\": \"images/user_5/Screenshot from 2020-03-21 15-49-34.png\"}',NULL),(2,1,15,1,1,'Semi Furnished',NULL,'2020-05-28 07:22:30',NULL,NULL,NULL),(3,5,15,12,3,'Semi Furnished',NULL,'2020-05-28 08:58:55',NULL,NULL,NULL),(4,5,15,12,2,'Semi Furnished',NULL,'2020-05-28 09:04:22',NULL,NULL,NULL),(5,5,2,12,3,'Semi Furnished',NULL,'2020-05-28 09:07:14',NULL,NULL,NULL),(6,5,15,11,1,'Semi Furnished',NULL,'2020-05-28 09:08:37',NULL,NULL,NULL),(7,5,15,1,2,'Semi Furnished',NULL,'2020-05-28 09:13:54',NULL,NULL,NULL),(8,5,15,12,2,'Semi Furnished',NULL,'2020-05-28 09:21:07',NULL,NULL,NULL),(9,5,2,1,2,'Semi Furnished',NULL,'2020-05-28 09:23:41',NULL,NULL,NULL),(10,5,2,1,2,'Semi Furnished',NULL,'2020-05-28 09:24:16',NULL,NULL,NULL),(11,5,2,11,1,'Semi Furnished',NULL,'2020-05-28 09:25:23',NULL,NULL,NULL),(12,5,15,12,2,'Fully Furnished',NULL,'2020-05-28 12:46:46',NULL,NULL,NULL),(13,5,12,12,2,'Semi Furnished',NULL,'2020-06-01 13:43:18',NULL,NULL,NULL),(14,5,15,12,2,'Semi Furnished',NULL,'2020-06-01 13:44:54',NULL,'{\"0\": \"images/user_5/Screenshot from 2020-06-01 09-10-56.png\"}',NULL),(15,5,15,12,2,'Semi Furnished',NULL,'2020-06-01 13:46:04',NULL,'{\"0\": \"images/user_5/Screenshot from 2020-04-24 14-53-29.png\"}',NULL),(16,18,15,12,2,'Semi Furnished','1000','2020-06-01 15:17:17',NULL,'{\"0\": \"images/user_18/Screenshot from 2020-06-01 13-58-03.png\"}',NULL);
/*!40000 ALTER TABLE `property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_types`
--

DROP TABLE IF EXISTS `property_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `property_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `display_name` varchar(100) NOT NULL,
  `status` bigint(4) NOT NULL DEFAULT '1',
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_types`
--

LOCK TABLES `property_types` WRITE;
/*!40000 ALTER TABLE `property_types` DISABLE KEYS */;
INSERT INTO `property_types` VALUES (1,'apartment','Apartment',1,'2020-05-22 15:40:27',NULL),(3,'villa','Villa',1,'2020-05-22 15:41:27',NULL),(4,'compound','Compound',1,'2020-05-22 15:41:27',NULL),(5,'hotel _appartments','Hotel Appartments',1,'2020-05-22 15:41:59',NULL),(6,'office_space','Office Space',1,'2020-05-22 15:43:34',NULL),(7,'shop','Shop',1,'2020-05-22 15:43:34',NULL),(8,'storehouse','Storehouse',1,'2020-05-22 15:43:34',NULL),(9,'show_room','Show Room',1,'2020-05-22 15:43:34',NULL),(10,'residential_building','Residential Building',1,'2020-05-22 15:45:50',NULL),(11,'commercial_building','Commercial Building',1,'2020-05-22 15:45:50',NULL),(12,'administrative_building','Administrative Building',1,'2020-05-22 15:45:50',NULL),(13,'tower','Tower',1,'2020-05-22 15:45:50',NULL),(14,'staff_accommodation','Staff Accommodation',1,'2020-05-22 15:45:50',NULL);
/*!40000 ALTER TABLE `property_types` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-02 14:11:57
