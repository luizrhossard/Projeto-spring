-- U5: Remover coluna progress da cultura

ALTER TABLE cultura DROP COLUMN IF EXISTS progress;
