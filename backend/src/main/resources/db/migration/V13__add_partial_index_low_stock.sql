-- V13: Adicionar indice parcial para consulta de estoque baixo
-- Otimiza a query findByUserIdAndQuantidadeLessThanEqual do InsumoRepository

-- O indice ja existente (idx_insumo_user_estoque) cobre user_id + quantidade,
-- mas um indice parcial filtra apenas os insumos com estoque baixo, reduzindo
-- o tamanho do indice e melhorando a performance.

CREATE INDEX idx_insumo_estoque_baixo
    ON insumo(user_id)
    WHERE quantidade <= estoque_minimo;
