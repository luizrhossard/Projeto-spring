-- U9: Remover CHECK constraints

ALTER TABLE notificacao DROP CONSTRAINT IF EXISTS chk_notificacao_tipo;
ALTER TABLE movimento_estoque DROP CONSTRAINT IF EXISTS chk_movimento_estoque_tipo;
ALTER TABLE tarefa DROP CONSTRAINT IF EXISTS chk_tarefa_status;
ALTER TABLE tarefa DROP CONSTRAINT IF EXISTS chk_tarefa_prioridade;
ALTER TABLE cultura DROP CONSTRAINT IF EXISTS chk_cultura_status;
