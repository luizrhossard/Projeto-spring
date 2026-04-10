-- U1: Remover tabelas iniciais

DROP INDEX IF EXISTS idx_preco_mercado_produto;
DROP INDEX IF EXISTS idx_tarefa_status;
DROP INDEX IF EXISTS idx_tarefa_user_id;
DROP INDEX IF EXISTS idx_tarefa_cultura_id;
DROP INDEX IF EXISTS idx_cultura_user_id;

DROP TABLE IF EXISTS preco_mercado;
DROP TABLE IF EXISTS tarefa;
DROP TABLE IF EXISTS cultura;
DROP TABLE IF EXISTS usuario;
