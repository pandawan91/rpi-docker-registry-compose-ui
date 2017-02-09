drop database if exists DockerRegistry;
create database if not exists DockerRegistry;
use DockerRegistry;

create table Actions(
	Id int not null auto_increment,
    Name varchar(255),

    primary key(Id)
);

create table Actors(
	Id int not null auto_increment,
    Name varchar(255),

    primary key(Id)
);

create table Requests(
	Id int not null auto_increment,
    Addr varchar(255),
    Host varchar(255),

    primary key(Id)
);

create table Tags(
	Id int not null auto_increment,
    Name varchar(255),
    
    primary key(Id)
);

create table Repositories(
	Id int not null auto_increment,
    Name varchar(255),
    Description varchar(10000),
    Note varchar(10000),
	TagId int,
    
    primary key(Id),
    foreign key(TagId) references Tags(Id)
);

create table Targets(
	Id int not null auto_increment,
    Size int,
    Digest varchar(255),
    RepositoryId int,
    Url varchar(255),
    TagId int,

    primary key(Id),
    foreign key(TagId) references Tags(Id),
    foreign key(RepositoryId) references Repositories(Id)
);

create table Sources(
	Id int not null auto_increment,
    Addr varchar(255),
    InstanceId varchar(255),

    primary key(Id)
);

create table DockerEvents(
	Id int not null auto_increment,
    Stamp varchar(255),
    ActionId int,
    TargetId int,
    RequestId int,
    ActorId int,
    SourceId int,
    RepositoryId int,

    primary key(Id),
    foreign key(ActionId) references Actions(Id),
    foreign key(TargetId) references Targets(Id),
    foreign key(RequestId) references Requests(Id),
    foreign key(ActorId) references Actors(Id),
    foreign key(SourceId) references Sources(Id),
    foreign key(RepositoryId) references Repositories(Id)
);
