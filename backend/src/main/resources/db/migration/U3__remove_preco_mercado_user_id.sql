-- U3: Remover user_id e created_at de preco_mercado

DROP INDEX IF EXISTS idx_preco_mercado_user_id;
ALTER TABLE preco_mercado DROP COLUMN IF EXISTS user_id;
ALTER TABLE preco_mercado DROP COLUMN IF EXISTS created_at;
