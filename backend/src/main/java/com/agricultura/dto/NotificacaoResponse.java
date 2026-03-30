package com.agricultura.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificacaoResponse {
    private Long id;
    private String titulo;
    private String mensagem;
    private String tipo;
    private Boolean lida;
    private LocalDateTime dataCriacao;
}
