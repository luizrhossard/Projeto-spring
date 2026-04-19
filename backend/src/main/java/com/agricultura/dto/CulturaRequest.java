package com.agricultura.dto;

import com.agricultura.domain.StatusCultura;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.Data;

@Data
public class CulturaRequest {
    @NotBlank(message = "O nome da cultura é obrigatório")
    private String nome;

    @NotNull(message = "A área é obrigatória") private Double area;

    private StatusCultura status;

    private LocalDate dataPlantio;

    private LocalDate previsaoColheita;
    private String icone;
    private Integer progress;
}
