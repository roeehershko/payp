-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: pax
-- ------------------------------------------------------
-- Server version	5.7.21

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
-- Table structure for table `coins`
--

DROP TABLE IF EXISTS `coins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coins` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `code` varchar(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coins`
--

LOCK TABLES `coins` WRITE;
/*!40000 ALTER TABLE `coins` DISABLE KEYS */;
INSERT INTO `coins` VALUES (1,'Pax','PAX'),(2,'Bitcoin','BTC');
/*!40000 ALTER TABLE `coins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coins_transactions`
--

DROP TABLE IF EXISTS `coins_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coins_transactions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `wallet_id` int(11) unsigned NOT NULL,
  `type_id` int(11) unsigned NOT NULL,
  `uid` varchar(100) NOT NULL,
  `amount` int(11) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`wallet_id`),
  KEY `customer_id_2` (`wallet_id`,`type_id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `coins_transactions_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `transactions_types` (`id`),
  CONSTRAINT `coins_transactions_ibfk_2` FOREIGN KEY (`wallet_id`) REFERENCES `wallets` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coins_transactions`
--

LOCK TABLES `coins_transactions` WRITE;
/*!40000 ALTER TABLE `coins_transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `coins_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(250) NOT NULL,
  `first_name` varchar(250) NOT NULL,
  `last_name` varchar(250) NOT NULL,
  `phone` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'user1@gmail.com','test','test','1231231231','$2a$10$y9zNi8Vy9dKoUr9k1Kh9LONBQS8leszPF3uoFmOo7qcQOvSnRWHvC','2018-03-28 00:00:00','2018-03-28 00:00:00',NULL),(2,'user2@gmail.com','test','test','1231231231','$2a$10$y9zNi8Vy9dKoUr9k1Kh9LONBQS8leszPF3uoFmOo7qcQOvSnRWHvC','2018-03-28 00:00:00','2018-03-28 00:00:00',NULL);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_statuses`
--

DROP TABLE IF EXISTS `orders_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders_statuses` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_statuses`
--

LOCK TABLES `orders_statuses` WRITE;
/*!40000 ALTER TABLE `orders_statuses` DISABLE KEYS */;
INSERT INTO `orders_statuses` VALUES (1,'Pending'),(2,'Partial'),(3,'Completed'),(4,'Canceled');
/*!40000 ALTER TABLE `orders_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_types`
--

DROP TABLE IF EXISTS `orders_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_types`
--

LOCK TABLES `orders_types` WRITE;
/*!40000 ALTER TABLE `orders_types` DISABLE KEYS */;
INSERT INTO `orders_types` VALUES (1,'Buy'),(2,'Sell');
/*!40000 ALTER TABLE `orders_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pax_orders`
--

DROP TABLE IF EXISTS `pax_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pax_orders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_type_id` int(11) unsigned NOT NULL,
  `wallet_id` int(11) unsigned NOT NULL,
  `order_status_id` int(11) unsigned NOT NULL,
  `request_amount` int(11) NOT NULL,
  `remaining_amount` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_status_id` (`order_status_id`),
  KEY `order_type_id` (`order_type_id`),
  KEY `wallet_id` (`wallet_id`),
  CONSTRAINT `pax_orders_ibfk_1` FOREIGN KEY (`order_status_id`) REFERENCES `orders_statuses` (`id`),
  CONSTRAINT `pax_orders_ibfk_2` FOREIGN KEY (`order_type_id`) REFERENCES `orders_types` (`id`),
  CONSTRAINT `pax_orders_ibfk_3` FOREIGN KEY (`wallet_id`) REFERENCES `wallets` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pax_orders`
--

LOCK TABLES `pax_orders` WRITE;
/*!40000 ALTER TABLE `pax_orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `pax_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pax_orders_transactions`
--

DROP TABLE IF EXISTS `pax_orders_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pax_orders_transactions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(11) unsigned NOT NULL,
  `amount` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pax_orders_transactions`
--

LOCK TABLES `pax_orders_transactions` WRITE;
/*!40000 ALTER TABLE `pax_orders_transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `pax_orders_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paypers`
--

DROP TABLE IF EXISTS `paypers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paypers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `issued` int(11) NOT NULL,
  `sold` int(11) NOT NULL,
  `remaining` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paypers`
--

LOCK TABLES `paypers` WRITE;
/*!40000 ALTER TABLE `paypers` DISABLE KEYS */;
INSERT INTO `paypers` VALUES (1,'Bitcoin Bull',1000,0,1000);
/*!40000 ALTER TABLE `paypers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paypers_inventory`
--

DROP TABLE IF EXISTS `paypers_inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paypers_inventory` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) unsigned NOT NULL,
  `payper_id` int(11) unsigned NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '0',
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `payper_id` (`payper_id`),
  CONSTRAINT `paypers_inventory_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  CONSTRAINT `paypers_inventory_ibfk_2` FOREIGN KEY (`payper_id`) REFERENCES `paypers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paypers_inventory`
--

LOCK TABLES `paypers_inventory` WRITE;
/*!40000 ALTER TABLE `paypers_inventory` DISABLE KEYS */;
INSERT INTO `paypers_inventory` VALUES (2,1,1,75,'2018-04-10 14:19:37','2018-04-10 14:39:05');
/*!40000 ALTER TABLE `paypers_inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paypers_ipo`
--

DROP TABLE IF EXISTS `paypers_ipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paypers_ipo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `payper_id` int(11) unsigned NOT NULL,
  `request_quantity` int(11) NOT NULL,
  `remaining_quantity` int(11) NOT NULL,
  `position` int(11) NOT NULL DEFAULT '1',
  `cost` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  `pax_spent` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `payper_id` (`payper_id`),
  CONSTRAINT `paypers_ipo_ibfk_1` FOREIGN KEY (`payper_id`) REFERENCES `paypers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paypers_ipo`
--

LOCK TABLES `paypers_ipo` WRITE;
/*!40000 ALTER TABLE `paypers_ipo` DISABLE KEYS */;
INSERT INTO `paypers_ipo` VALUES (1,1,10,35,1,5,'2018-03-28 00:00:00','2018-03-28 00:00:00',175),(2,1,100,85,2,15,'2018-03-28 00:00:00','2018-03-28 00:00:00',225);
/*!40000 ALTER TABLE `paypers_ipo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paypers_orders`
--

DROP TABLE IF EXISTS `paypers_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paypers_orders` (
  `id` int(10) unsigned NOT NULL,
  `order_type_id` int(11) unsigned NOT NULL,
  `customer_id` int(11) unsigned DEFAULT NULL,
  `payper_id` int(11) unsigned NOT NULL,
  `order_status_id` int(11) unsigned NOT NULL,
  `request_quantity` int(11) NOT NULL,
  `remaining_quantity` int(11) NOT NULL,
  `cost` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `order_status_id` (`order_status_id`),
  KEY `order_type_id` (`order_type_id`),
  KEY `payper_id` (`payper_id`),
  CONSTRAINT `paypers_orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  CONSTRAINT `paypers_orders_ibfk_2` FOREIGN KEY (`order_status_id`) REFERENCES `orders_statuses` (`id`),
  CONSTRAINT `paypers_orders_ibfk_3` FOREIGN KEY (`order_type_id`) REFERENCES `orders_types` (`id`),
  CONSTRAINT `paypers_orders_ibfk_4` FOREIGN KEY (`payper_id`) REFERENCES `paypers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paypers_orders`
--

LOCK TABLES `paypers_orders` WRITE;
/*!40000 ALTER TABLE `paypers_orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `paypers_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paypers_transactions`
--

DROP TABLE IF EXISTS `paypers_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paypers_transactions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) unsigned NOT NULL,
  `type_id` int(11) unsigned NOT NULL,
  `payper_id` int(11) unsigned NOT NULL,
  `quantity` int(11) NOT NULL,
  `cost` int(11) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `payper_id` (`payper_id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `paypers_transactions_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  CONSTRAINT `paypers_transactions_ibfk_2` FOREIGN KEY (`payper_id`) REFERENCES `paypers` (`id`),
  CONSTRAINT `paypers_transactions_ibfk_3` FOREIGN KEY (`type_id`) REFERENCES `transactions_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paypers_transactions`
--

LOCK TABLES `paypers_transactions` WRITE;
/*!40000 ALTER TABLE `paypers_transactions` DISABLE KEYS */;
INSERT INTO `paypers_transactions` VALUES (11,1,1,1,5,25,'2018-04-10 14:19:37'),(12,1,1,1,5,25,'2018-04-10 14:19:50'),(13,1,1,1,5,25,'2018-04-10 14:21:36'),(14,1,1,1,5,25,'2018-04-10 14:21:43'),(15,1,1,1,5,25,'2018-04-10 14:24:51'),(16,1,1,1,5,25,'2018-04-10 14:37:09'),(17,1,1,1,5,25,'2018-04-10 14:37:09'),(18,1,1,1,5,25,'2018-04-10 14:37:10'),(19,1,1,1,5,75,'2018-04-10 14:37:15'),(20,1,1,1,5,75,'2018-04-10 14:37:18'),(21,1,1,1,5,75,'2018-04-10 14:37:19'),(22,1,1,1,5,25,'2018-04-10 14:37:46'),(23,1,1,1,5,25,'2018-04-10 14:39:04'),(24,1,1,1,5,25,'2018-04-10 14:39:05'),(25,1,1,1,5,25,'2018-04-10 14:39:05');
/*!40000 ALTER TABLE `paypers_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions_types`
--

DROP TABLE IF EXISTS `transactions_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions_types`
--

LOCK TABLES `transactions_types` WRITE;
/*!40000 ALTER TABLE `transactions_types` DISABLE KEYS */;
INSERT INTO `transactions_types` VALUES (1,'Received'),(2,'Send');
/*!40000 ALTER TABLE `transactions_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transfers`
--

DROP TABLE IF EXISTS `transfers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transfers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `wallet_id` int(11) unsigned NOT NULL,
  `amount` double DEFAULT NULL,
  `type_id` int(11) unsigned NOT NULL,
  `status_id` int(11) unsigned NOT NULL,
  `blockchain_address` varchar(100) DEFAULT NULL,
  `blockchain_hash` varchar(100) DEFAULT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `status_id` (`status_id`),
  KEY `type_id` (`type_id`),
  KEY `wallet_id` (`wallet_id`),
  CONSTRAINT `transfers_ibfk_1` FOREIGN KEY (`status_id`) REFERENCES `transfers_statuses` (`id`),
  CONSTRAINT `transfers_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `transactions_types` (`id`),
  CONSTRAINT `transfers_ibfk_3` FOREIGN KEY (`wallet_id`) REFERENCES `wallets` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transfers`
--

LOCK TABLES `transfers` WRITE;
/*!40000 ALTER TABLE `transfers` DISABLE KEYS */;
INSERT INTO `transfers` VALUES (3,2,0.1,2,2,'32oYXkXUkQTWnBKcD4ppaMMdnPMhEXmvCR','749f267f9d238c978fe3e79a6c1f34070b0b8e5a3de8623d1bd144760bf79a5f','2018-04-10 09:42:45','2018-04-10 09:42:45'),(10,2,0.100002,2,2,'32oYXkXUkQTWnBKcD4ppaMMdnPMhEXmvCR','749f267f9d238c978fe3e79a6c1f34070b0b8e5a3de8623d1bd144760bf79a5f','2018-04-10 11:04:57','2018-04-10 11:04:57'),(11,2,0.100002,2,2,'32oYXkXUkQTWnBKcD4ppaMMdnPMhEXmvCR','749f267f9d238c978fe3e79a6c1f34070b0b8e5a3de8623d1bd144760bf79a5f','2018-04-10 11:06:01','2018-04-10 11:06:01'),(12,2,0.100002,2,2,'32oYXkXUkQTWnBKcD4ppaMMdnPMhEXmvCR','749f267f9d238c978fe3e79a6c1f34070b0b8e5a3de8623d1bd144760bf79a5f','2018-04-10 11:06:17','2018-04-10 11:06:17'),(13,2,0.100002,2,2,'32oYXkXUkQTWnBKcD4ppaMMdnPMhEXmvCR','749f267f9d238c978fe3e79a6c1f34070b0b8e5a3de8623d1bd144760bf79a5f','2018-04-10 11:06:48','2018-04-10 11:06:48'),(14,2,0.100002,2,2,'32oYXkXUkQTWnBKcD4ppaMMdnPMhEXmvCR','749f267f9d238c978fe3e79a6c1f34070b0b8e5a3de8623d1bd144760bf79a5f','2018-04-10 11:09:00','2018-04-10 11:09:00'),(15,2,0.100002,2,2,'32oYXkXUkQTWnBKcD4ppaMMdnPMhEXmvCR','749f267f9d238c978fe3e79a6c1f34070b0b8e5a3de8623d1bd144760bf79a5f','2018-04-10 11:10:58','2018-04-10 11:10:58'),(16,2,0.100002,2,2,'32oYXkXUkQTWnBKcD4ppaMMdnPMhEXmvCR','749f267f9d238c978fe3e79a6c1f34070b0b8e5a3de8623d1bd144760bf79a5f','2018-04-10 11:10:59','2018-04-10 11:10:59'),(17,2,0.100002,2,2,'32oYXkXUkQTWnBKcD4ppaMMdnPMhEXmvCR','749f267f9d238c978fe3e79a6c1f34070b0b8e5a3de8623d1bd144760bf79a5f','2018-04-10 11:11:00','2018-04-10 11:11:00'),(18,2,0.100002,2,2,'32oYXkXUkQTWnBKcD4ppaMMdnPMhEXmvCR','749f267f9d238c978fe3e79a6c1f34070b0b8e5a3de8623d1bd144760bf79a5f','2018-04-10 11:11:24','2018-04-10 11:11:24'),(19,2,0.100002,2,2,'32oYXkXUkQTWnBKcD4ppaMMdnPMhEXmvCR','749f267f9d238c978fe3e79a6c1f34070b0b8e5a3de8623d1bd144760bf79a5f','2018-04-10 11:11:25','2018-04-10 11:11:25'),(20,2,0.100002,2,2,'32oYXkXUkQTWnBKcD4ppaMMdnPMhEXmvCR','749f267f9d238c978fe3e79a6c1f34070b0b8e5a3de8623d1bd144760bf79a5f','2018-04-10 11:11:47','2018-04-10 11:11:47'),(21,2,0.100002,2,2,'32oYXkXUkQTWnBKcD4ppaMMdnPMhEXmvCR','749f267f9d238c978fe3e79a6c1f34070b0b8e5a3de8623d1bd144760bf79a5f','2018-04-10 11:11:49','2018-04-10 11:11:49'),(22,2,0.100002,2,2,'32oYXkXUkQTWnBKcD4ppaMMdnPMhEXmvCR','749f267f9d238c978fe3e79a6c1f34070b0b8e5a3de8623d1bd144760bf79a5f','2018-04-10 11:11:51','2018-04-10 11:11:51'),(23,2,0.100002,2,2,'32oYXkXUkQTWnBKcD4ppaMMdnPMhEXmvCR','749f267f9d238c978fe3e79a6c1f34070b0b8e5a3de8623d1bd144760bf79a5f','2018-04-10 11:12:16','2018-04-10 11:12:16'),(24,2,0.100002,2,2,'32oYXkXUkQTWnBKcD4ppaMMdnPMhEXmvCR','749f267f9d238c978fe3e79a6c1f34070b0b8e5a3de8623d1bd144760bf79a5f','2018-04-10 11:12:37','2018-04-10 11:12:37'),(25,2,0.100002,2,2,'32oYXkXUkQTWnBKcD4ppaMMdnPMhEXmvCR','749f267f9d238c978fe3e79a6c1f34070b0b8e5a3de8623d1bd144760bf79a5f','2018-04-10 11:12:41','2018-04-10 11:12:41'),(26,2,0.100002,2,2,'32oYXkXUkQTWnBKcD4ppaMMdnPMhEXmvCR','749f267f9d238c978fe3e79a6c1f34070b0b8e5a3de8623d1bd144760bf79a5f','2018-04-10 11:13:45','2018-04-10 11:13:45'),(27,2,0.100002,2,2,'32oYXkXUkQTWnBKcD4ppaMMdnPMhEXmvCR','749f267f9d238c978fe3e79a6c1f34070b0b8e5a3de8623d1bd144760bf79a5f','2018-04-10 11:13:46','2018-04-10 11:13:46'),(28,2,0.100002,2,2,'32oYXkXUkQTWnBKcD4ppaMMdnPMhEXmvCR','749f267f9d238c978fe3e79a6c1f34070b0b8e5a3de8623d1bd144760bf79a5f','2018-04-10 11:13:46','2018-04-10 11:13:46'),(29,2,0.100002,2,2,'32oYXkXUkQTWnBKcD4ppaMMdnPMhEXmvCR','749f267f9d238c978fe3e79a6c1f34070b0b8e5a3de8623d1bd144760bf79a5f','2018-04-10 11:13:50','2018-04-10 11:13:50'),(30,2,0.100002,2,2,'32oYXkXUkQTWnBKcD4ppaMMdnPMhEXmvCR','749f267f9d238c978fe3e79a6c1f34070b0b8e5a3de8623d1bd144760bf79a5f','2018-04-10 11:13:51','2018-04-10 11:13:51'),(31,2,0.100002,2,2,'32oYXkXUkQTWnBKcD4ppaMMdnPMhEXmvCR','749f267f9d238c978fe3e79a6c1f34070b0b8e5a3de8623d1bd144760bf79a5f','2018-04-10 11:13:52','2018-04-10 11:13:52'),(32,2,0.100002,2,2,'32oYXkXUkQTWnBKcD4ppaMMdnPMhEXmvCR','749f267f9d238c978fe3e79a6c1f34070b0b8e5a3de8623d1bd144760bf79a5f','2018-04-10 11:13:52','2018-04-10 11:13:52'),(33,2,0.100002,2,2,'32oYXkXUkQTWnBKcD4ppaMMdnPMhEXmvCR','749f267f9d238c978fe3e79a6c1f34070b0b8e5a3de8623d1bd144760bf79a5f','2018-04-10 11:13:52','2018-04-10 11:13:52'),(34,2,0.100002,2,2,'32oYXkXUkQTWnBKcD4ppaMMdnPMhEXmvCR','749f267f9d238c978fe3e79a6c1f34070b0b8e5a3de8623d1bd144760bf79a5f','2018-04-10 11:13:53','2018-04-10 11:13:53');
/*!40000 ALTER TABLE `transfers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transfers_statuses`
--

DROP TABLE IF EXISTS `transfers_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transfers_statuses` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transfers_statuses`
--

LOCK TABLES `transfers_statuses` WRITE;
/*!40000 ALTER TABLE `transfers_statuses` DISABLE KEYS */;
INSERT INTO `transfers_statuses` VALUES (1,'Pending'),(2,'Success'),(3,'Failed');
/*!40000 ALTER TABLE `transfers_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallets`
--

DROP TABLE IF EXISTS `wallets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wallets` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `coin_id` int(11) NOT NULL,
  `balance` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallets`
--

LOCK TABLES `wallets` WRITE;
/*!40000 ALTER TABLE `wallets` DISABLE KEYS */;
INSERT INTO `wallets` VALUES (1,1,1,4925),(2,1,2,1.00002),(3,2,1,0),(4,2,2,0);
/*!40000 ALTER TABLE `wallets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `widrawal_requests`
--

DROP TABLE IF EXISTS `widrawal_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `widrawal_requests` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `wallet_id` int(11) NOT NULL,
  `widrawal_status_id` int(11) DEFAULT NULL,
  `blockhain_address` varchar(200) DEFAULT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `widrawal_requests`
--

LOCK TABLES `widrawal_requests` WRITE;
/*!40000 ALTER TABLE `widrawal_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `widrawal_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `widrawal_requests_statuses`
--

DROP TABLE IF EXISTS `widrawal_requests_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `widrawal_requests_statuses` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `widrawal_requests_statuses`
--

LOCK TABLES `widrawal_requests_statuses` WRITE;
/*!40000 ALTER TABLE `widrawal_requests_statuses` DISABLE KEYS */;
INSERT INTO `widrawal_requests_statuses` VALUES (1,'Created'),(2,'Verified'),(3,'Confirmed');
/*!40000 ALTER TABLE `widrawal_requests_statuses` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-10 18:16:32
