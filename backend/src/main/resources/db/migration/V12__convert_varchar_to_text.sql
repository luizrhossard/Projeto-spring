-- V12: Converter VARCHAR(255) para TEXT onde nao ha limite de negocio
-- No PostgreSQL, TEXT e VARCHAR(255) tem o mesmo desempenho, mas TEXT e mais flexivel

-- usuario
ALTER TABLE usuario ALTER COLUMN name TYPE TEXT;

-- cultura
ALTER TABLE cultura ALTER COLUMN nome TYPE TEXT;

-- tarefa
ALTER TABLE tarefa ALTER COLUMN titulo TYPE TEXT;

-- preco_mercado
ALTER TABLE preco_mercado ALTER COLUMN produto TYPE TEXT;

-- notificacao
ALTER TABLE notificacao ALTER COLUMN titulo TYPE TEXT;
ALTER TABLE notificacao ALTER COLUMN mensagem TYPE TEXT;

-- insumo
ALTER TABLE insumo ALTER COLUMN nome TYPE TEXT;
ALTER TABLE insumo ALTER COLUMN fornecedor TYPE TEXT;

-- movimento_estoque
ALTER TABLE movimento_estoque ALTER COLUMN motivo TYPE TEXT;
ALTER TABLE movimento_estoque ALTER COLUMN responsavel TYPE TEXT;
