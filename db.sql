DROP TABLE IF EXISTS guest;

CREATE TABLE IF NOT EXISTS guest (
	id serial PRIMARY KEY,
	email VARCHAR ( 50 ) UNIQUE NOT NULL,
	invites INT NOT NULL,
	rsvp INT,
	song VARCHAR (255),
    updated TIMESTAMP 
);