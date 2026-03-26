-- V3: Adicionar user_id e created_at na tabela preco_mercado
ALTER TABLE preco_mercado ADD COLUMN user_id BIGINT REFERENCES usuario(id) ON DELETE CASCADE;
ALTER TABLE preco_mercado ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
CREATE INDEX idx_preco_mercado_user_id ON preco_mercado(user_id);
