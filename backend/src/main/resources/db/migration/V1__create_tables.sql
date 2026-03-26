-- V1: Criação das tabelas do sistema agrícola

-- Tabela de usuários
CREATE TABLE usuario (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de culturas
CREATE TABLE cultura (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    area DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PLANTADO',
    data_plantio DATE NOT NULL,
    previsao_colheita DATE,
    user_id BIGINT NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de tarefas
CREATE TABLE tarefa (
    id BIGSERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    prioridade VARCHAR(20) NOT NULL DEFAULT 'MEDIA',
    status VARCHAR(20) NOT NULL DEFAULT 'PENDENTE',
    data_vencimento DATE NOT NULL,
    cultura_id BIGINT REFERENCES cultura(id) ON DELETE SET NULL,
    user_id BIGINT NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de preços de mercado
CREATE TABLE preco_mercado (
    id BIGSERIAL PRIMARY KEY,
    produto VARCHAR(255) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    unidade VARCHAR(50) NOT NULL DEFAULT 'sc',
    variacao DECIMAL(5,2),
    data_atualizacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Índices para performance
CREATE INDEX idx_cultura_user_id ON cultura(user_id);
CREATE INDEX idx_tarefa_cultura_id ON tarefa(cultura_id);
CREATE INDEX idx_tarefa_user_id ON tarefa(user_id);
CREATE INDEX idx_tarefa_status ON tarefa(status);
CREATE INDEX idx_preco_mercado_produto ON preco_mercado(produto);