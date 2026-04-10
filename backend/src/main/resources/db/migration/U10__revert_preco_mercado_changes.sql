-- U10: Reverter constraints e coluna de preco_mercado

ALTER TABLE preco_mercado ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE preco_mercado DROP COLUMN IF EXISTS data_atualizacao;
