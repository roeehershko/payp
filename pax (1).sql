-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 05, 2018 at 03:29 PM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pax`
--

-- --------------------------------------------------------

--
-- Table structure for table `coins`
--

CREATE TABLE `coins` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(50) NOT NULL,
  `code` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `coins`
--

INSERT INTO `coins` (`id`, `title`, `code`) VALUES
(1, 'Pax', 'PAX'),
(2, 'Bitcoin', 'BTC');

-- --------------------------------------------------------

--
-- Table structure for table `coins_transactions`
--

CREATE TABLE `coins_transactions` (
  `id` int(10) UNSIGNED NOT NULL,
  `wallet_id` int(11) UNSIGNED NOT NULL,
  `type_id` int(11) UNSIGNED NOT NULL,
  `uid` varchar(100) NOT NULL,
  `amount` int(11) NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(250) NOT NULL,
  `first_name` varchar(250) NOT NULL,
  `last_name` varchar(250) NOT NULL,
  `phone` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `email`, `first_name`, `last_name`, `phone`, `password`, `created`, `modified`, `deleted`) VALUES
(1, 'user1@gmail.com', 'test', 'test', '1231231231', '123123', '2018-03-28 00:00:00', '2018-03-28 00:00:00', NULL),
(2, 'user2@gmail.com', 'test', 'test', '1231231231', '123123', '2018-03-28 00:00:00', '2018-03-28 00:00:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `orders_statuses`
--

CREATE TABLE `orders_statuses` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders_statuses`
--

INSERT INTO `orders_statuses` (`id`, `title`) VALUES
(1, 'Pending'),
(2, 'Partial'),
(3, 'Completed'),
(4, 'Canceled');

-- --------------------------------------------------------

--
-- Table structure for table `orders_types`
--

CREATE TABLE `orders_types` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders_types`
--

INSERT INTO `orders_types` (`id`, `title`) VALUES
(1, 'Buy'),
(2, 'Sell');

-- --------------------------------------------------------

--
-- Table structure for table `pax_orders`
--

CREATE TABLE `pax_orders` (
  `id` int(10) UNSIGNED NOT NULL,
  `order_type_id` int(11) UNSIGNED NOT NULL,
  `wallet_id` int(11) UNSIGNED NOT NULL,
  `order_status_id` int(11) UNSIGNED NOT NULL,
  `request_amount` int(11) NOT NULL,
  `remaining_amount` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `pax_orders_transactions`
--

CREATE TABLE `pax_orders_transactions` (
  `id` int(10) UNSIGNED NOT NULL,
  `order_id` int(11) UNSIGNED NOT NULL,
  `amount` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `paypers`
--

CREATE TABLE `paypers` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(50) NOT NULL,
  `issued` int(11) NOT NULL,
  `sold` int(11) NOT NULL,
  `remaining` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `paypers`
--

INSERT INTO `paypers` (`id`, `title`, `issued`, `sold`, `remaining`) VALUES
(1, 'Bitcoin Bull', 1000, 0, 1000);

-- --------------------------------------------------------

--
-- Table structure for table `paypers_inventory`
--

CREATE TABLE `paypers_inventory` (
  `id` int(10) UNSIGNED NOT NULL,
  `customer_id` int(11) UNSIGNED NOT NULL,
  `payper_id` int(11) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '0',
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `paypers_ipo`
--

CREATE TABLE `paypers_ipo` (
  `id` int(10) UNSIGNED NOT NULL,
  `payper_id` int(11) UNSIGNED NOT NULL,
  `request_quantity` int(11) NOT NULL,
  `remaining_quantity` int(11) NOT NULL,
  `position` int(11) NOT NULL DEFAULT '1',
  `cost` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `paypers_ipo`
--

INSERT INTO `paypers_ipo` (`id`, `payper_id`, `request_quantity`, `remaining_quantity`, `position`, `cost`, `created`, `modified`) VALUES
(1, 1, 100, 100, 1, 50, '2018-03-28 00:00:00', '2018-03-28 00:00:00'),
(2, 1, 100, 100, 2, 70, '2018-03-28 00:00:00', '2018-03-28 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `paypers_orders`
--

CREATE TABLE `paypers_orders` (
  `id` int(10) UNSIGNED NOT NULL,
  `order_type_id` int(11) UNSIGNED NOT NULL,
  `customer_id` int(11) UNSIGNED DEFAULT NULL,
  `payper_id` int(11) UNSIGNED NOT NULL,
  `order_status_id` int(11) UNSIGNED NOT NULL,
  `request_quantity` int(11) NOT NULL,
  `remaining_quantity` int(11) NOT NULL,
  `cost` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `paypers_transactions`
--

CREATE TABLE `paypers_transactions` (
  `id` int(10) UNSIGNED NOT NULL,
  `customer_id` int(11) UNSIGNED NOT NULL,
  `type_id` int(11) UNSIGNED NOT NULL,
  `payper_id` int(11) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `cost` int(11) NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transactions_types`
--

CREATE TABLE `transactions_types` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transactions_types`
--

INSERT INTO `transactions_types` (`id`, `title`) VALUES
(1, 'Received'),
(2, 'Send');

-- --------------------------------------------------------

--
-- Table structure for table `transfers`
--

CREATE TABLE `transfers` (
  `id` int(10) UNSIGNED NOT NULL,
  `wallet_id` int(11) UNSIGNED NOT NULL,
  `amount` int(11) NOT NULL,
  `type_id` int(11) UNSIGNED NOT NULL,
  `status_id` int(11) UNSIGNED NOT NULL,
  `blockchain_address` varchar(100) NOT NULL,
  `blockchain_hash` varchar(100) NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transfers_statuses`
--

CREATE TABLE `transfers_statuses` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transfers_statuses`
--

INSERT INTO `transfers_statuses` (`id`, `title`) VALUES
(1, 'Pending'),
(2, 'Success'),
(3, 'Failed');

-- --------------------------------------------------------

--
-- Table structure for table `wallets`
--

CREATE TABLE `wallets` (
  `id` int(10) UNSIGNED NOT NULL,
  `customer_id` int(11) NOT NULL,
  `coin_id` int(11) NOT NULL,
  `balance` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `wallets`
--

INSERT INTO `wallets` (`id`, `customer_id`, `coin_id`, `balance`) VALUES
(1, 1, 1, 0),
(2, 1, 2, 0),
(3, 2, 1, 0),
(4, 2, 2, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `coins`
--
ALTER TABLE `coins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coins_transactions`
--
ALTER TABLE `coins_transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`wallet_id`),
  ADD KEY `customer_id_2` (`wallet_id`,`type_id`),
  ADD KEY `type_id` (`type_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders_statuses`
--
ALTER TABLE `orders_statuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders_types`
--
ALTER TABLE `orders_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pax_orders`
--
ALTER TABLE `pax_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_status_id` (`order_status_id`),
  ADD KEY `order_type_id` (`order_type_id`),
  ADD KEY `wallet_id` (`wallet_id`);

--
-- Indexes for table `pax_orders_transactions`
--
ALTER TABLE `pax_orders_transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `paypers`
--
ALTER TABLE `paypers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `paypers_inventory`
--
ALTER TABLE `paypers_inventory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `payper_id` (`payper_id`);

--
-- Indexes for table `paypers_ipo`
--
ALTER TABLE `paypers_ipo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payper_id` (`payper_id`);

--
-- Indexes for table `paypers_orders`
--
ALTER TABLE `paypers_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `order_status_id` (`order_status_id`),
  ADD KEY `order_type_id` (`order_type_id`),
  ADD KEY `payper_id` (`payper_id`);

--
-- Indexes for table `paypers_transactions`
--
ALTER TABLE `paypers_transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `payper_id` (`payper_id`),
  ADD KEY `type_id` (`type_id`);

--
-- Indexes for table `transactions_types`
--
ALTER TABLE `transactions_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transfers`
--
ALTER TABLE `transfers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `status_id` (`status_id`),
  ADD KEY `type_id` (`type_id`),
  ADD KEY `wallet_id` (`wallet_id`);

--
-- Indexes for table `transfers_statuses`
--
ALTER TABLE `transfers_statuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wallets`
--
ALTER TABLE `wallets`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `coins`
--
ALTER TABLE `coins`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `coins_transactions`
--
ALTER TABLE `coins_transactions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders_statuses`
--
ALTER TABLE `orders_statuses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders_types`
--
ALTER TABLE `orders_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pax_orders`
--
ALTER TABLE `pax_orders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pax_orders_transactions`
--
ALTER TABLE `pax_orders_transactions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `paypers`
--
ALTER TABLE `paypers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `paypers_inventory`
--
ALTER TABLE `paypers_inventory`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `paypers_ipo`
--
ALTER TABLE `paypers_ipo`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `paypers_transactions`
--
ALTER TABLE `paypers_transactions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transactions_types`
--
ALTER TABLE `transactions_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `transfers`
--
ALTER TABLE `transfers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transfers_statuses`
--
ALTER TABLE `transfers_statuses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `wallets`
--
ALTER TABLE `wallets`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `coins_transactions`
--
ALTER TABLE `coins_transactions`
  ADD CONSTRAINT `coins_transactions_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `transactions_types` (`id`),
  ADD CONSTRAINT `coins_transactions_ibfk_2` FOREIGN KEY (`wallet_id`) REFERENCES `wallets` (`id`);

--
-- Constraints for table `pax_orders`
--
ALTER TABLE `pax_orders`
  ADD CONSTRAINT `pax_orders_ibfk_1` FOREIGN KEY (`order_status_id`) REFERENCES `orders_statuses` (`id`),
  ADD CONSTRAINT `pax_orders_ibfk_2` FOREIGN KEY (`order_type_id`) REFERENCES `orders_types` (`id`),
  ADD CONSTRAINT `pax_orders_ibfk_3` FOREIGN KEY (`wallet_id`) REFERENCES `wallets` (`id`);

--
-- Constraints for table `paypers_inventory`
--
ALTER TABLE `paypers_inventory`
  ADD CONSTRAINT `paypers_inventory_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  ADD CONSTRAINT `paypers_inventory_ibfk_2` FOREIGN KEY (`payper_id`) REFERENCES `paypers` (`id`);

--
-- Constraints for table `paypers_ipo`
--
ALTER TABLE `paypers_ipo`
  ADD CONSTRAINT `paypers_ipo_ibfk_1` FOREIGN KEY (`payper_id`) REFERENCES `paypers` (`id`);

--
-- Constraints for table `paypers_orders`
--
ALTER TABLE `paypers_orders`
  ADD CONSTRAINT `paypers_orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  ADD CONSTRAINT `paypers_orders_ibfk_2` FOREIGN KEY (`order_status_id`) REFERENCES `orders_statuses` (`id`),
  ADD CONSTRAINT `paypers_orders_ibfk_3` FOREIGN KEY (`order_type_id`) REFERENCES `orders_types` (`id`),
  ADD CONSTRAINT `paypers_orders_ibfk_4` FOREIGN KEY (`payper_id`) REFERENCES `paypers` (`id`);

--
-- Constraints for table `paypers_transactions`
--
ALTER TABLE `paypers_transactions`
  ADD CONSTRAINT `paypers_transactions_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  ADD CONSTRAINT `paypers_transactions_ibfk_2` FOREIGN KEY (`payper_id`) REFERENCES `paypers` (`id`),
  ADD CONSTRAINT `paypers_transactions_ibfk_3` FOREIGN KEY (`type_id`) REFERENCES `transactions_types` (`id`);

--
-- Constraints for table `transfers`
--
ALTER TABLE `transfers`
  ADD CONSTRAINT `transfers_ibfk_1` FOREIGN KEY (`status_id`) REFERENCES `transfers_statuses` (`id`),
  ADD CONSTRAINT `transfers_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `transactions_types` (`id`),
  ADD CONSTRAINT `transfers_ibfk_3` FOREIGN KEY (`wallet_id`) REFERENCES `wallets` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
