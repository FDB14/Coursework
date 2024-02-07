-- Table: public.useraccount

-- DROP TABLE IF EXISTS public.useraccount;

CREATE TABLE IF NOT EXISTS public.useraccount
(
    userid integer NOT NULL DEFAULT nextval('useraccount_userid_seq'::regclass),
    auth0_id character varying(255) COLLATE pg_catalog."default",
    userscore integer,
    user_credit integer DEFAULT 770,
    user_name character varying(255) COLLATE pg_catalog."default",
    has_submitted boolean DEFAULT false,
    time_submitted bigint,
    CONSTRAINT useraccount_pkey PRIMARY KEY (userid),
    CONSTRAINT useraccount_auth0_id_key UNIQUE (auth0_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.useraccount
    OWNER to admin;