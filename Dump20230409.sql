-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: grocery_store
-- ------------------------------------------------------
-- Server version	8.0.32

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

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cost` int NOT NULL DEFAULT '0',
  `user` varchar(20) NOT NULL,
  PRIMARY KEY (`user`),
  CONSTRAINT `user` FOREIGN KEY (`user`) REFERENCES `customer` (`uname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contains`
--

DROP TABLE IF EXISTS `contains`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contains` (
  `itemcode` int NOT NULL,
  `c_user` varchar(20) NOT NULL,
  PRIMARY KEY (`itemcode`,`c_user`),
  KEY `c_user_idx` (`c_user`),
  CONSTRAINT `c_user` FOREIGN KEY (`c_user`) REFERENCES `cart` (`user`),
  CONSTRAINT `itemcode` FOREIGN KEY (`itemcode`) REFERENCES `item` (`item_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contains`
--

LOCK TABLES `contains` WRITE;
/*!40000 ALTER TABLE `contains` DISABLE KEYS */;
/*!40000 ALTER TABLE `contains` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `uname` varchar(20) NOT NULL,
  `address` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`uname`),
  CONSTRAINT `uname` FOREIGN KEY (`uname`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES ('cust1','123 good street SW'),('cust2','55 far road SW'),('cust5','78 blue crossing SE');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES ('bakery'),('cash'),('cust_serv'),('deli'),('meat'),('produce'),('warehouse');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `item_code` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `price` int NOT NULL,
  `remaining_num` int NOT NULL,
  `sale_num` int DEFAULT '0',
  `dep_name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`item_code`),
  KEY `sale_num_idx` (`sale_num`),
  KEY `dep_name_idx` (`dep_name`),
  CONSTRAINT `dep_name` FOREIGN KEY (`dep_name`) REFERENCES `department` (`name`),
  CONSTRAINT `sale_num` FOREIGN KEY (`sale_num`) REFERENCES `sale` (`sale_num`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,'apple',1,100,NULL,'produce'),(2,'orange',1,1,NULL,'produce'),(3,'banana',2,100,NULL,'produce'),(4,'lime',1,94,NULL,'produce'),(5,'lemon',1,54,NULL,'produce'),(6,'carrot',3,100,NULL,'produce'),(7,'lettuce',3,56,NULL,'produce'),(8,'chicken',20,0,NULL,'meat'),(9,'pork chop',10,20,NULL,'meat'),(10,'ground beef',10,40,NULL,'meat'),(11,'french bread',5,100,NULL,'bakery'),(12,'bagel',3,100,NULL,'bakery'),(13,'buns 6pk',6,40,NULL,'bakery'),(14,'salami',4,100,NULL,'deli'),(15,'ham',3,100,NULL,'deli'),(16,'turkey breast',5,50,NULL,'deli'),(17,'grapes',10,30,NULL,'produce'),(18,'bacon',12,40,NULL,'deli'),(19,'white bread',5,100,NULL,'bakery'),(20,'salmon fillets',15,20,1,'meat');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manager`
--

DROP TABLE IF EXISTS `manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manager` (
  `id` int NOT NULL,
  `address` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id` FOREIGN KEY (`id`) REFERENCES `staff` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manager`
--

LOCK TABLES `manager` WRITE;
/*!40000 ALTER TABLE `manager` DISABLE KEYS */;
INSERT INTO `manager` VALUES (1,'44 rich street NW');
/*!40000 ALTER TABLE `manager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `cost` int NOT NULL,
  `c_id` int NOT NULL,
  `s_name` varchar(20) NOT NULL,
  PRIMARY KEY (`c_id`),
  KEY `s_name_idx` (`s_name`),
  CONSTRAINT `c_id` FOREIGN KEY (`c_id`) REFERENCES `manager` (`id`),
  CONSTRAINT `c_name` FOREIGN KEY (`s_name`) REFERENCES `supplier` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordered_by`
--

DROP TABLE IF EXISTS `ordered_by`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordered_by` (
  `itemmcode` int NOT NULL,
  `manager_id` int NOT NULL,
  PRIMARY KEY (`itemmcode`,`manager_id`),
  KEY `manager_id_idx` (`manager_id`),
  CONSTRAINT `itemmcode` FOREIGN KEY (`itemmcode`) REFERENCES `item` (`item_code`),
  CONSTRAINT `manager_id` FOREIGN KEY (`manager_id`) REFERENCES `manager` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordered_by`
--

LOCK TABLES `ordered_by` WRITE;
/*!40000 ALTER TABLE `ordered_by` DISABLE KEYS */;
/*!40000 ALTER TABLE `ordered_by` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `packaged`
--

DROP TABLE IF EXISTS `packaged`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `packaged` (
  `icode` int NOT NULL,
  `barcode` varchar(20) NOT NULL,
  PRIMARY KEY (`icode`,`barcode`),
  CONSTRAINT `icode` FOREIGN KEY (`icode`) REFERENCES `item` (`item_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packaged`
--

LOCK TABLES `packaged` WRITE;
/*!40000 ALTER TABLE `packaged` DISABLE KEYS */;
INSERT INTO `packaged` VALUES (8,'11101011'),(9,'10010101'),(10,'00010110'),(11,'11101000'),(12,'10101010'),(13,'10110001'),(14,'11011010'),(15,'101010110'),(16,'10110011'),(18,'11011101'),(19,'00001111'),(20,'00111100');
/*!40000 ALTER TABLE `packaged` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produce`
--

DROP TABLE IF EXISTS `produce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produce` (
  `i_code` int NOT NULL,
  `PLU` int NOT NULL,
  PRIMARY KEY (`i_code`,`PLU`),
  CONSTRAINT `i_code` FOREIGN KEY (`i_code`) REFERENCES `item` (`item_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produce`
--

LOCK TABLES `produce` WRITE;
/*!40000 ALTER TABLE `produce` DISABLE KEYS */;
INSERT INTO `produce` VALUES (1,8362),(2,7667),(3,9083),(4,1111),(5,2451),(6,8274),(7,6534),(17,1937);
/*!40000 ALTER TABLE `produce` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale`
--

DROP TABLE IF EXISTS `sale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale` (
  `sale_num` int NOT NULL AUTO_INCREMENT,
  `percent_discount` int NOT NULL,
  `s_date` varchar(20) NOT NULL,
  `e_date` varchar(20) NOT NULL,
  PRIMARY KEY (`sale_num`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale`
--

LOCK TABLES `sale` WRITE;
/*!40000 ALTER TABLE `sale` DISABLE KEYS */;
INSERT INTO `sale` VALUES (1,10,'01-01-2022','01-01-2024');
/*!40000 ALTER TABLE `sale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `id` int NOT NULL,
  `d_o_b` varchar(20) DEFAULT NULL,
  `ssn` varchar(20) NOT NULL,
  `position` varchar(20) DEFAULT NULL,
  `username` varchar(20) NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  CONSTRAINT `username` FOREIGN KEY (`username`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,'01-01-1989','123456789','manager','manager1'),(2,'05-04-1998','454545454','worker','worker1'),(3,'02-28-2000','333333333','worker','worker2'),(4,'12-12-1999','010101010','worker','worker3'),(5,'09-15-2004','232323232','worker','worker4'),(6,'07-19-2001','676767676','worker','worker5');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplied_by`
--

DROP TABLE IF EXISTS `supplied_by`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplied_by` (
  `sup_name` varchar(20) DEFAULT NULL,
  `itemccode` int DEFAULT NULL,
  KEY `sup_name_idx` (`sup_name`),
  KEY `itemccode_idx` (`itemccode`),
  CONSTRAINT `itemccode` FOREIGN KEY (`itemccode`) REFERENCES `item` (`item_code`),
  CONSTRAINT `sup_name` FOREIGN KEY (`sup_name`) REFERENCES `supplier` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplied_by`
--

LOCK TABLES `supplied_by` WRITE;
/*!40000 ALTER TABLE `supplied_by` DISABLE KEYS */;
INSERT INTO `supplied_by` VALUES ('fresh farms',1),('fresh farms',2),('fresh farms',3),('fresh farms',4),('fresh farms',5),('fresh farms',6),('fresh farms',7),('country butchers',8),('country butchers',9),('country butchers',10),('granny\'s bakery',11),('granny\'s bakery',12),('granny\'s bakery',13),('jo\'s deli',14),('jo\'s deli',15),('jo\'s deli',16),('fresh farms',17),('jo\'s deli',18),('granny\'s bakery',19),('country butchers',20);
/*!40000 ALTER TABLE `supplied_by` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `name` varchar(20) NOT NULL,
  `location` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES ('country butchers','okotoks'),('fresh farms','longview'),('granny\'s bakery','big bad forest'),('jo\'s deli','calgary');
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `password` varchar(20) NOT NULL,
  `username` varchar(20) NOT NULL,
  `fname` varchar(20) DEFAULT NULL,
  `m_init` varchar(1) DEFAULT NULL,
  `l_name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('password','cust1','sherry','o','williams'),('password','cust2','cole','h','cathcart'),('password','cust5','fred','m','orange'),('password','manager1','jon','p','smith'),('password','worker1','paul','m','jones'),('password','worker2','tom','t','bryce'),('password','worker3','bob','r','roger'),('password','worker4','jim','p','sullivan'),('password','worker5','jen','m','bailey');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `worker`
--

DROP TABLE IF EXISTS `worker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `worker` (
  `w_id` int NOT NULL,
  `address` varchar(40) DEFAULT NULL,
  `m_id` int NOT NULL,
  `d_name` varchar(20) NOT NULL,
  `fname` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`w_id`),
  KEY `m_id_idx` (`m_id`),
  KEY `d_name_idx` (`d_name`),
  CONSTRAINT `d_name` FOREIGN KEY (`d_name`) REFERENCES `department` (`name`),
  CONSTRAINT `m_id` FOREIGN KEY (`m_id`) REFERENCES `manager` (`id`),
  CONSTRAINT `w_id` FOREIGN KEY (`w_id`) REFERENCES `staff` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `worker`
--

LOCK TABLES `worker` WRITE;
/*!40000 ALTER TABLE `worker` DISABLE KEYS */;
INSERT INTO `worker` VALUES (2,'55 big street SW',1,'bakery','paul'),(3,'9091 green road NW',1,'cash','tom'),(4,'10 autumn way SW',1,'produce','bob'),(5,'58 strathcona road NW',1,'deli','jim'),(6,'10982 town plaza NW',1,'meat','jen');
/*!40000 ALTER TABLE `worker` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-09  1:15:18
