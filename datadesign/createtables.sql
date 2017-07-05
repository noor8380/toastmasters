drop database if exists toastmasters;
create database toastmasters;
use toastmasters;

drop table if exists CLUB;
create table CLUB (
	club_id int primary key AUTO_INCREMENT,
	club_name varchar(255) not null,
	club_pic varchar(255),
	club_officer_pic text,
	club_meeting_link text,
	club_intro_link text
);

create table OFFICERS (
	officer_id int primary key AUTO_INCREMENT,
	officer_name varchar(50) not null,
	officer_intro varchar(255) not null,
	officer_role varchar(100),
	officer_offpic varchar(255),
	role_intro text,
	club_id int not null,
	FOREIGN KEY (club_id) REFERENCES CLUB(club_id)
);

create table GUESTS (
	guest_id int primary key AUTO_INCREMENT,
	guest_name varchar(50) not null,
	guest_pic varchar(255) not null,
	guest_intro varchar(255) not null,
	guest_link varchar(255),
	club_id int not null,
	FOREIGN KEY (club_id) REFERENCES CLUB(club_id)
);

create table MEMBERS (
	member_id int primary key AUTO_INCREMENT,
	member_name varchar(50) not null,
	member_pic varchar(255) not null,
	member_intro varchar(255) not null,
	member_link varchar(255),
	club_id int not null,
	FOREIGN KEY (club_id) REFERENCES CLUB(club_id)

);

create table CCPROJECT (
	cc_id int primary key,
	cc_level int not null,
	cc_type varchar(50) not null, 
	cc_name varchar(100)
);

create table CCRECORDS (
	ccr_id int primary key AUTO_INCREMENT,
	complete_time timestamp,
	ccr_status int not null default 0,
	cc_id int not null,
	FOREIGN KEY (cc_id) REFERENCES CCPROJECT(cc_id),
	member_id int not null,
	FOREIGN KEY (member_id) REFERENCES MEMBERS(member_id)
);

create table CLPROJECT (
	cl_id int primary key AUTO_INCREMENT,
	cl_type varchar(50) not null,
	cl_level int not null,
	cl_name varchar(50) not null,
	cc_role varchar(50) not null 
);

create table CLRECORDS (
	clr_id int primary key AUTO_INCREMENT,
	complete_time timestamp,
	clr_status int not null default 0,
	cl_id int not null,
	FOREIGN KEY (cl_id) REFERENCES CLPROJECT(cl_id),
	member_id int not null,
	FOREIGN KEY (member_id) REFERENCES MEMBERS(member_id)
);


insert into ClUB (club_name,club_pic,club_officer_pic,club_meeting_link,club_intro_link) values ("ActNow","https://www.baidu.com/img/bd_logo1.png","https://www.baidu.com/img/bd_logo1.png","https://www.baidu.com/img/bd_logo1.png","https://www.baidu.com/img/bd_logo1.png");


insert into OFFICERS (officer_name, officer_intro, officer_role, officer_offpic, role_intro, club_id) values ("Manager", "self intro here...", "PRISIDENT", "https://www.baidu.com/img/bd_logo1.png", "responsibilities of prisident of actnow",1);
insert into OFFICERS (officer_name, officer_intro, officer_role, officer_offpic, role_intro, club_id) values ("Rosie", "self intro here...", "VPE", "https://www.baidu.com/img/bd_logo1.png", "responsibilities of prisident of actnow",1);
insert into OFFICERS (officer_name, officer_intro, officer_role, officer_offpic, role_intro, club_id) values ("CiCi", "self intro here...", "VPM", "https://www.baidu.com/img/bd_logo1.png", "responsibilities of prisident of actnow",1);

insert into GUESTS (guest_name, guest_pic, guest_intro, guest_link,  club_id) values ("guest1", "https://www.baidu.com/img/bd_logo1.png", "name introduction", " ", 1);
insert into GUESTS (guest_name, guest_pic, guest_intro, guest_link,  club_id) values ("guest2", "https://www.baidu.com/img/bd_logo1.png", "name introduction", " ", 1);

insert into MEMBERS (member_name, member_pic, member_intro, member_link,  club_id) values ("member2", "https://www.baidu.com/img/bd_logo1.png", "name introduction", " ", 1);
insert into MEMBERS (member_name, member_pic, member_intro, member_link,  club_id) values ("member3", "https://www.baidu.com/img/bd_logo1.png", "name introduction", " ", 1);
insert into MEMBERS (member_name, member_pic, member_intro, member_link,  club_id) values ("member4", "https://www.baidu.com/img/bd_logo1.png", "name introduction", " ", 1);

insert into CCPROJECT values ( 1, 1, "CC", "ICE break speech");
insert into CCPROJECT values ( 2, 2, "CC", "get to the point");
insert into CCPROJECT values ( 3, 3, "CC", "get to the point");
insert into CCPROJECT values ( 4, 4, "CC", "get to the point");

insert into CCRECORDS(complete_time,cc_id,member_id) value(now(), 1 ,1 );

insert into CLPROJECT(cl_type,cl_level,cl_name,cc_role) values ( "CL", 1, "priactise listening", "timer");
insert into CLPROJECT(cl_type,cl_level,cl_name,cc_role) values ( "CL", 1, "priactise listening", "ie");

insert into CLRECORDS(complete_time,cl_id,member_id) value(now(), 1 ,1 );


select * from CLUB;
select * from GUESTS where club_id = 1;
select * from MEMBERS where club_id = 1;
select * from CCPROJECT;
select * from CCRECORDS where member_id = 1;
select * from CLPROJECT;
select * from CLRECORDS where member_id = 1;

#get cc status for specific user
select CCRECORDS.member_id, CCRECORDS.ccr_status, CCRECORDS.complete_time, CCPROJECT.cc_id, CCPROJECT.cc_level, CCPROJECT.cc_type, CCPROJECT.cc_name
	from (select * from CCRECORDS where CCRECORDS.member_id = 1) as CCRECORDS
	RIGHT JOIN  CCPROJECT 
	ON CCPROJECT.cc_id = CCRECORDS.cc_id

#get cl status for specific user
select CLRECORDS.member_id, CLRECORDS.clr_status, CLRECORDS.complete_time, CLPROJECT.cl_id, CLPROJECT.cl_type, CLPROJECT.cl_level, CLPROJECT.cl_name, CLPROJECT.cc_role
	from (select * from CLRECORDS where CLRECORDS.member_id = 1) as CLRECORDS
	RIGHT JOIN  CLPROJECT 
	ON CLPROJECT.cl_id = CLRECORDS.cl_id;

show tables;

