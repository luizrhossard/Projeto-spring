package com.agricultura.repository;

import com.agricultura.domain.Notificacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotificacaoRepository extends JpaRepository<Notificacao, Long> {
    
    List<Notificacao> findByUsuarioIdOrderByDataCriacaoDesc(Long usuarioId);
    
    List<Notificacao> findByUsuarioIdAndLidaFalseOrderByDataCriacaoDesc(Long usuarioId);
    
    Long countByUsuarioIdAndLidaFalse(Long usuarioId);
}
