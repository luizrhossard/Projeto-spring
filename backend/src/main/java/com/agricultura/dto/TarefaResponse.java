package com.agricultura.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TarefaResponse {
    private Long id;
    private String titulo;
    private String descricao;
    private String prioridade;
    private String status;
    private LocalDate dataVencimento;
    private Long culturaId;
    private String culturaNome;
    private Long userId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}