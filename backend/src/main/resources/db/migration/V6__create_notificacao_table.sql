-- Create notificacao table
CREATE TABLE IF NOT EXISTS notificacao (
    id BIGSERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    mensagem VARCHAR(500),
    tipo VARCHAR(50) NOT NULL DEFAULT 'INFO',
    usuario_id BIGINT NOT NULL,
    lida BOOLEAN NOT NULL DEFAULT FALSE,
    data_criacao TIMESTAMP NOT NULL
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_notificacao_usuario_lida ON notificacao(usuario_id, lida);
CREATE INDEX IF NOT EXISTS idx_notificacao_data_criacao ON notificacao(data_criacao DESC);
