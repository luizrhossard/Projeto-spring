-- U7: Remover FK e indices adicionados na V7

DROP INDEX IF EXISTS idx_tarefa_vencimento_status;
DROP INDEX IF EXISTS idx_notificacao_nao_lidas;

ALTER TABLE notificacao DROP CONSTRAINT IF EXISTS fk_notificacao_usuario;
