-- U6: Remover tabela de notificacao

DROP INDEX IF EXISTS idx_notificacao_data_criacao;
DROP INDEX IF EXISTS idx_notificacao_usuario_lida;
DROP TABLE IF EXISTS notificacao;
