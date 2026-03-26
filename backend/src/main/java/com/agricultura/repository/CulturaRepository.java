package com.agricultura.repository;

import com.agricultura.domain.Cultura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CulturaRepository extends JpaRepository<Cultura, Long> {
    List<Cultura> findByUserId(Long userId);
}