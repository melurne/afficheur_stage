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
INSERT INTO grr__entry VALUES(0, 1, 2, UNIX_TIMESTAMP('2021-06-10 17:30:00'), UNIX_TIMESTAMP('2021-06-10 20:00:00'), "Direction des finances : commission");
INSERT INTO grr__entry VALUES(0, 1, 1, UNIX_TIMESTAMP('2021-06-11 06:00:00'), UNIX_TIMESTAMP('2021-06-11 07:30:00'), "Cabinet : réunion interne");
INSERT INTO grr__entry VALUES(0, 1, 1, UNIX_TIMESTAMP('2021-06-11 09:00:00'), UNIX_TIMESTAMP('2021-06-11 10:00:00'), "cadre de vie : réunion Place de la Victoire");
INSERT INTO grr__entry VALUES(0, 1, 1, UNIX_TIMESTAMP('2021-06-11 12:00:00'), UNIX_TIMESTAMP('2021-06-11 14:30:00'), "direction transition écologique : Réunion DGS-");
INSERT INTO grr__entry VALUES(0, 1, 1, UNIX_TIMESTAMP('2021-06-11 16:00:00'), UNIX_TIMESTAMP('2021-06-11 18:00:00'), "direction de la jeunesse : réunion conseil des jeunes");
INSERT INTO grr__entry VALUES(0, 1, 2, UNIX_TIMESTAMP('2021-06-11 16:00:00'), UNIX_TIMESTAMP('2021-06-11 18:00:00'), "direction de la jeunesse : réunion conseil des jeunes");
INSERT INTO grr__entry VALUES(0, 1, 1, UNIX_TIMESTAMP('2021-06-18 15:00:00'), UNIX_TIMESTAMP('2021-06-18 20:00:00'), "installation BV");
INSERT INTO grr__entry VALUES(0, 1, 2, UNIX_TIMESTAMP('2021-06-18 15:00:00'), UNIX_TIMESTAMP('2021-06-18 20:00:00'), "installation BV");
