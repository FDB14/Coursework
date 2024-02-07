CREATE TABLE IF NOT EXISTS public.playersmain
(
    id integer NOT NULL,
    playername character varying(255) COLLATE pg_catalog."default",
    playerlast character varying(255) COLLATE pg_catalog."default",
    age integer,
    nationality character varying(255) COLLATE pg_catalog."default",
    height character varying(255) COLLATE pg_catalog."default",
    team character varying(20) COLLATE pg_catalog."default",
    teamicon character varying(255) COLLATE pg_catalog."default",
    appearances integer,
    rating double precision,
    goals integer,
    assists integer,
    conceded integer,
    passes integer,
    tackles integer,
    duelswon integer,
    dribbles integer,
    foulswon integer,
    fouls integer,
    yellow integer,
    yellowred integer,
    red integer,
    penwon integer,
    pencommited integer,
    penscored integer,
    penmissed integer,
    minutes integer,
    "position" character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT playersmain_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.playersmain
    OWNER to admin;