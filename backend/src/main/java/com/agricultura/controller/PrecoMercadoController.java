package com.agricultura.controller;

import com.agricultura.dto.*;
import com.agricultura.service.PrecoMercadoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/precos")
@RequiredArgsConstructor
public class PrecoMercadoController {

    private final PrecoMercadoService precoMercadoService;

    @GetMapping
    public ResponseEntity<List<PrecoMercadoResponse>> findAll() {
        return ResponseEntity.ok(precoMercadoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PrecoMercadoResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(precoMercadoService.findById(id));
    }

    @PostMapping
    public ResponseEntity<PrecoMercadoResponse> create(@Valid @RequestBody PrecoMercadoRequest request) {
        return ResponseEntity.ok(precoMercadoService.create(request));
    }
}