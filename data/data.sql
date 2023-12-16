
DROP TABLE IF EXISTS "user", "language", "user_language" CASCADE;
-- Creating the Products table
CREATE TABLE "user" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "mail" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "statut" VARCHAR(255) NOT NULL DEFAULT 'user'
);

CREATE TABLE "language" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "lang_name" VARCHAR(255) NOT NULL
);

-- Inserting entries
INSERT INTO "user" (name, mail, password, statut) VALUES 
    ('William', 'vandal.william@gmail.com', '$2a$12$gnWuX0U/Aje0L4gfvuY/HObuCcYrcL68gAAuHZ1LFVH1P4PPAWtjO', 'admin');

INSERT INTO "language" (lang_name) VALUES 
    ('ajax'),
    ('apache'),
    ('asp'),
    ('css'),
    ('dart'),
    ('flash'),
    ('javascript'),
    ('nodejs'),
    ('php'),
    ('ruby'),
    ('typescript'),
    ('web-semantique'),
    ('webmarketing'),
    ('xhtml');


CREATE TABLE "user_language" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "lang_id" INTEGER NOT NULL REFERENCES "language"("id") ON DELETE CASCADE
);

INSERT INTO "user_language" (user_id, lang_id) VALUES 
    (1, 11),
    (1, 7),
    (1, 8),
    (1, 4);