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

create table MEETING (
	meeting_id int primary key AUTO_INCREMENT,
	meeting_name varchar(50) not null,
	club_id int not null,
	FOREIGN KEY (club_id) REFERENCES CLUB(club_id)
);

create table EVALUATIONS (
	evaluation_id int primary key AUTO_INCREMENT,
	evaluator varchar(50) not null,
	speaker varchar(50) not null,
	content text,
	complete_time timestamp,
	meeting_id int not null,
	FOREIGN KEY (meeting_id) REFERENCES MEETING(meeting_id)
);

insert into CLUB (club_name,club_pic,club_officer_pic,club_meeting_link,club_intro_link) values ("ActNow",
	"http://selfmlj.oss-cn-shanghai.aliyuncs.com/tmms/794062813.jpg",
	"http://selfmlj.oss-cn-shanghai.aliyuncs.com/tmms/591708458.jpg",
	"http://toastmaster.sinaapp.com/toastmaster/index.php/event/list_event/club_id/1.html",
	"https://www.baidu.com/img/bd_logo1.png");

insert into MEETING(meeting_name,club_id) values("ActNow #118 English Meeting",1);
insert into EVALUATIONS(evaluator,speaker,content,complete_time,meeting_id) values("tester","Manager","excellent",now(),1);

insert into OFFICERS (officer_name, officer_intro, officer_role, officer_offpic, role_intro, club_id) values ("Manager", "self intro here...", "President", "http://selfmlj.oss-cn-shanghai.aliyuncs.com/tmms/toaster.jpg", "roles introduction here...",1);
insert into OFFICERS (officer_name, officer_intro, officer_role, officer_offpic, role_intro, club_id) values ("Rosie", "self intro here...", "VPE", "http://selfmlj.oss-cn-shanghai.aliyuncs.com/tmms/toaster.jpg", "roles introduction here...",1);
insert into OFFICERS (officer_name, officer_intro, officer_role, officer_offpic, role_intro, club_id) values ("CiCi", "self intro here...", "VPM", "http://selfmlj.oss-cn-shanghai.aliyuncs.com/tmms/toaster.jpg", "roles introduction here...",1);
insert into OFFICERS (officer_name, officer_intro, officer_role, officer_offpic, role_intro, club_id) values ("Ian", "self intro here...", "VPPR", "http://selfmlj.oss-cn-shanghai.aliyuncs.com/tmms/toaster.jpg", "roles introduction here...",1);
insert into OFFICERS (officer_name, officer_intro, officer_role, officer_offpic, role_intro, club_id) values ("Xiaphy", "self intro here...", "Treasure", "http://selfmlj.oss-cn-shanghai.aliyuncs.com/tmms/toaster.jpg", "roles introduction here...",1);
insert into OFFICERS (officer_name, officer_intro, officer_role, officer_offpic, role_intro, club_id) values ("Sophie", "self intro here...", "Secretary", "http://selfmlj.oss-cn-shanghai.aliyuncs.com/tmms/toaster.jpg", "roles introduction here...",1);
insert into OFFICERS (officer_name, officer_intro, officer_role, officer_offpic, role_intro, club_id) values ("James", "self intro here...", "SAA", "http://selfmlj.oss-cn-shanghai.aliyuncs.com/tmms/toaster.jpg", "roles introduction here...",1);

insert into GUESTS (guest_name, guest_pic, guest_intro, guest_link,  club_id) values ("guest1", "http://selfmlj.oss-cn-shanghai.aliyuncs.com/tmms/toaster.jpg", "name introduction", " ", 1);

insert into MEMBERS (member_name, member_pic, member_intro, member_link,  club_id) values ("member1", "http://selfmlj.oss-cn-shanghai.aliyuncs.com/tmms/toaster.jpg", "name introduction", " ", 1);

insert into CCPROJECT values ( 1, 1, "CC", "ICE break speech");
insert into CCPROJECT values ( 2, 2, "CC", "get to the point");
insert into CCPROJECT values ( 3, 3, "CC", "get to the point");
insert into CCPROJECT values ( 4, 4, "CC", "get to the point");

insert into CCRECORDS(complete_time,cc_id,member_id) value(now(), 1 ,1 );

insert into CLPROJECT(cl_type,cl_level,cl_name,cc_role) values ( "CL", 1, "priactise listening", "timer");
insert into CLPROJECT(cl_type,cl_level,cl_name,cc_role) values ( "CL", 1, "priactise listening", "ie");

insert into CLRECORDS(complete_time,cl_id,member_id) value(now(), 1 ,1 );

show tables;

