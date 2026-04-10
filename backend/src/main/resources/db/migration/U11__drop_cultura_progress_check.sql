-- U11: Remover CHECK constraint de progress na cultura

ALTER TABLE cultura DROP CONSTRAINT IF EXISTS chk_cultura_progress;
