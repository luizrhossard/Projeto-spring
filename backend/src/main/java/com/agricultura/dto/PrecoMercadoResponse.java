package com.agricultura.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrecoMercadoResponse {
    private Long id;
    private String produto;
    private BigDecimal preco;
    private String unidade;
    private BigDecimal variacao;
    private LocalDateTime dataAtualizacao;
    private Long userId;
}