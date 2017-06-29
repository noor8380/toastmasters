drop database if exists toastmasters;
create database toastmasters;
use toastmasters;

drop table if exists CLUB;
create table CLUB (
	club_id int primary key AUTO_INCREMENT,
	club_name varchar(255) not null,
	club_pic varchar(255),
	club_intro text
);

desc CLUB;

insert into ClUB (club_name,club_pic,club_intro) values ("ActNow","img/actnow.JPG","Toastmasters International is a world leader in communication and leadership development");

select * from CLUB;

show tables;
