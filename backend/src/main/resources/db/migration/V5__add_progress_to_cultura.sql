-- V5: Adicionar coluna progress à tabela cultura

ALTER TABLE cultura ADD COLUMN progress INTEGER NOT NULL DEFAULT 0;
