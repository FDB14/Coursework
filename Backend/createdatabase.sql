CREATE TABLE playerstats(id INT NOT NULL,team VARCHAR(20),teamIcon VARCHAR(255),appearences INT,minutes INT NOT NULL,rating FLOAT,goals INT,assists INT,conceded INT,passes INT,tackles INT,duelswon INT,dribbles INT,foulswon INT,fouls INT,yellow INT,yellowred INT,red INT,penwon INT,pencommited INT,penscored INT,penmissed INT);

CREATE TABLE userteam(
  teamid SERIAL PRIMARY KEY,
  userid VARCHAR(255),
  forward1_id INT,
  forward2_id INT,
  forward3_id INT,
  midfield1_id INT,
  midfield2_id INT,
  midfield3_id INT,
  defence1_id INT,
  defence2_id INT,
  defence3_id INT,
  defence4_id INT, 
  goalkeeper_id INT);



ALTER TABLE playersmain
  ADD team VARCHAR(20),
  ADD teamIcon VARCHAR(255),
  ADD appearences INT,
  ADD rating FLOAT,
  ADD goals INT,
  ADD assists INT,
  ADD conceded INT,
  ADD passes INT,
  ADD tackles INT,
  ADD duelswon INT,
  ADD dribbles INT,
  ADD foulswon INT,
  ADD fouls INT,
  ADD yellow INT,
  ADD yellowred INT,
  ADD red INT, 
  ADD penwon INT,
  ADD pencommited INT,
  ADD penscored INT,
  ADD penmissed INT;

