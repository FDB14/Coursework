-- Table: public.userteam

-- DROP TABLE IF EXISTS public.userteam;

CREATE TABLE IF NOT EXISTS public.userteam
(
    player_id integer NOT NULL,
    user_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT userteam_pkey PRIMARY KEY (player_id, user_id),
    CONSTRAINT fk_userteam_playersmain FOREIGN KEY (player_id)
        REFERENCES public.playersmain (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
    CONSTRAINT fk_userteam_useraccount FOREIGN KEY (user_id)
        REFERENCES public.useraccount (auth0_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.userteam
    OWNER to admin;

