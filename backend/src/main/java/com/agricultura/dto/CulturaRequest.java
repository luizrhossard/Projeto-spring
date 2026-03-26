package com.agricultura.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class CulturaRequest {
    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    @NotNull(message = "Área é obrigatória")
    @Positive(message = "Área deve ser positiva")
    private BigDecimal area;

    private String status;
    private LocalDate dataPlantio;
    private LocalDate previsaoColheita;
    private String icone;
    private Integer progress;
}