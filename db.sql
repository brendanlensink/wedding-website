DROP TABLE IF EXISTS guest;

CREATE TABLE IF NOT EXISTS guest (
	id serial PRIMARY KEY,
	name VARCHAR ( 255 ),
	email VARCHAR ( 50 ) UNIQUE NOT NULL,
	invites INT NOT NULL,
	rsvp INT,
	song VARCHAR (255),
	dietary VARCHAR (255),
    updated TIMESTAMP 
);