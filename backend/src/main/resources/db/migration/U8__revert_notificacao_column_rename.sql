-- U8: Reverter renomeacao de usuario_id para user_id na notificacao

-- Renomear coluna de volta
ALTER TABLE notificacao RENAME COLUMN user_id TO usuario_id;

-- Recriar indice antigo
DROP INDEX IF EXISTS idx_notificacao_usuario_lida;
CREATE INDEX idx_notificacao_usuario_lida ON notificacao(usuario_id, lida);

DROP INDEX IF EXISTS idx_notificacao_nao_lidas;
CREATE INDEX idx_notificacao_nao_lidas ON notificacao(usuario_id) WHERE lida = FALSE;
