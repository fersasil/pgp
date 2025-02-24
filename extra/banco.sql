-- MySQL Script generated by MySQL Workbench
-- seg 11 nov 2019 15:21:27 -03
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET armscii8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Address` (
  `idAddress` INT NOT NULL AUTO_INCREMENT,
  `streetAddress` VARCHAR(255) NOT NULL,
  `numberAddress` VARCHAR(255) NOT NULL,
  `complementAddress` VARCHAR(255) NULL DEFAULT NULL,
  `descriptionAddress` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`idAddress`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Event` (
  `idEvent` INT NOT NULL AUTO_INCREMENT,
  `titleEvent` VARCHAR(255) NOT NULL,
  `subtitleEvent` VARCHAR(255) NULL DEFAULT NULL,
  `descriptionEvent` LONGTEXT NOT NULL,
  `entriesEvent` TINYINT(4) NULL DEFAULT NULL,
  `startEvent` DATETIME NOT NULL,
  `endEvent` DATETIME NOT NULL,
  `priceEvent` FLOAT NULL DEFAULT NULL,
  `Address_idAddress` INT NOT NULL,
  PRIMARY KEY (`idEvent`),
  INDEX `fk_Event_Address1_idx` (`Address_idAddress` ASC),
  CONSTRAINT `fk_Event_Address1`
    FOREIGN KEY (`Address_idAddress`)
    REFERENCES `mydb`.`Address` (`idAddress`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `nameUser` VARCHAR(255) NULL DEFAULT NULL,
  `cpfUser` VARCHAR(255) NOT NULL,
  `ocupationUser` VARCHAR(255) NULL DEFAULT NULL,
  `civilstatusUser` VARCHAR(255) NULL DEFAULT NULL,
  `birthdayUser` DATE NULL DEFAULT NULL,
  `genderUser` VARCHAR(255) NULL DEFAULT NULL,
  `nicknameUser` VARCHAR(255) NULL DEFAULT NULL,
  `emailUser` VARCHAR(255) NOT NULL,
  `passwordUser` VARCHAR(255) NOT NULL,
  `phonenumberUser` VARCHAR(255) NULL DEFAULT NULL,
  `imageUser` VARCHAR(255) NULL DEFAULT NULL,
  `hasEvent` TINYINT(1) NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `cpf_UNIQUE` (`cpfUser` ASC),
  UNIQUE INDEX `email_UNIQUE` (`emailUser` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`User_Event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User_Event` (
  `userIdUser` INT NOT NULL,
  `eventIdEvent` INT NOT NULL,
  `relationUserEvent` TINYINT(4) NOT NULL,
  `presence` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`userIdUser`, `eventIdEvent`),
  INDEX `fk_User_has_Event_Event1_idx` (`eventIdEvent` ASC),
  INDEX `fk_User_has_Event_User_idx` (`userIdUser` ASC),
  CONSTRAINT `fk_User_has_Event_User`
    FOREIGN KEY (`userIdUser`)
    REFERENCES `mydb`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_Event_Event1`
    FOREIGN KEY (`eventIdEvent`)
    REFERENCES `mydb`.`Event` (`idEvent`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Tag` (
  `idTag` INT NOT NULL AUTO_INCREMENT,
  `nameTag` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idTag`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`SubEvent`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`SubEvent` (
  `idSubEvents` INT NOT NULL AUTO_INCREMENT,
  `typeSubEvent` VARCHAR(45) NULL DEFAULT NULL,
  `descriptionSubEvent` LONGTEXT NOT NULL,
  `vagasSubEvent` TINYINT(4) NULL DEFAULT NULL,
  `startSubEvent` DATETIME NOT NULL,
  `endSubEvent` DATETIME NOT NULL,
  `priceSubEvent` FLOAT NULL DEFAULT NULL,
  `Event_idEvent` INT NOT NULL,
  PRIMARY KEY (`idSubEvents`),
  INDEX `fk_SubEvent_Event1_idx` (`Event_idEvent` ASC),
  CONSTRAINT `fk_SubEvent_Event1`
    FOREIGN KEY (`Event_idEvent`)
    REFERENCES `mydb`.`Event` (`idEvent`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Event_Tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Event_Tag` (
  `eventidEvent` INT NULL DEFAULT NULL,
  `tagidTag` INT NOT NULL,
  `SubEvent_idSubEvents` INT NULL DEFAULT NULL,
  PRIMARY KEY (`eventidEvent`, `tagidTag`, `SubEvent_idSubEvents`),
  INDEX `fk_Event_has_Tag_Tag1_idx` (`tagidTag` ASC),
  INDEX `fk_Event_has_Tag_Event1_idx` (`eventidEvent` ASC),
  INDEX `fk_EventTag_SubEvent1_idx` (`SubEvent_idSubEvents` ASC),
  CONSTRAINT `fk_Event_has_Tag_Event1`
    FOREIGN KEY (`eventidEvent`)
    REFERENCES `mydb`.`Event` (`idEvent`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Event_has_Tag_Tag1`
    FOREIGN KEY (`tagidTag`)
    REFERENCES `mydb`.`Tag` (`idTag`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EventTag_SubEvent1`
    FOREIGN KEY (`SubEvent_idSubEvents`)
    REFERENCES `mydb`.`SubEvent` (`idSubEvents`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Image`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Image` (
  `idImage` INT NOT NULL AUTO_INCREMENT,
  `nameImage` VARCHAR(45) NULL DEFAULT NULL,
  `orderImage` VARCHAR(45) NULL DEFAULT NULL,
  `localaddressImage` VARCHAR(45) NOT NULL,
  `Event_idEvent` INT NOT NULL,
  PRIMARY KEY (`idImage`),
  INDEX `fk_Image_Event1_idx` (`Event_idEvent` ASC),
  CONSTRAINT `fk_Image_Event1`
    FOREIGN KEY (`Event_idEvent`)
    REFERENCES `mydb`.`Event` (`idEvent`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`User_SubEvent`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User_SubEvent` (
  `userIdUser` INT NOT NULL,
  `subeventIdSubEvents` INT NOT NULL,
  `relationUserSubEvent` TINYINT(4) NOT NULL,
  `presence` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`userIdUser`, `subeventIdSubEvents`),
  INDEX `fk_User_has_SubEvent_SubEvent1_idx` (`subeventIdSubEvents` ASC),
  INDEX `fk_User_has_SubEvent_User1_idx` (`userIdUser` ASC),
  CONSTRAINT `fk_User_has_SubEvent_User1`
    FOREIGN KEY (`userIdUser`)
    REFERENCES `mydb`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_SubEvent_SubEvent1`
    FOREIGN KEY (`subeventIdSubEvents`)
    REFERENCES `mydb`.`SubEvent` (`idSubEvents`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Log` (
  `idLog` INT NOT NULL AUTO_INCREMENT,
  `datetimeLogin` DATETIME NULL,
  `datetimeLogout` DATETIME NULL,
  `User_idUser` INT NOT NULL,
  PRIMARY KEY (`idLog`),
  INDEX `fk_Log_User1_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_Log_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `mydb`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
