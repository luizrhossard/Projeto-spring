-- U2: Remover tabelas de insumo e movimento_estoque

DROP INDEX IF EXISTS idx_movimento_estoque_user_id;
DROP INDEX IF EXISTS idx_movimento_estoque_insumo_id;
DROP INDEX IF EXISTS idx_insumo_user_estoque;
DROP INDEX IF EXISTS idx_insumo_user_id;

DROP TABLE IF EXISTS movimento_estoque;
DROP TABLE IF EXISTS insumo;
