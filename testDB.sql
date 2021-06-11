DROP TABLE IF EXISTS grr__entry;

CREATE TABLE grr__entry (
  moderate INT,
  courrier INT,
  room_id INT,
  start_time INT,
  end_time INT,
  name VARCHAR(255)
);

INSERT INTO grr__entry VALUES(0, 1, 1, UNIX_TIMESTAMP('2021-06-10 13:30:00'), UNIX_TIMESTAMP('2021-06-10 15:00:00'), "Direction de la communication : réunion de service");
INSERT INTO grr__entry VALUES(0, 1, 2, UNIX_TIMESTAMP('2021-06-10 15:00:00'), UNIX_TIMESTAMP('2021-06-10 16:00:00'), "SG centre de Vaccination VISIO");
