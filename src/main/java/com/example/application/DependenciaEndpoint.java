package com.example.application;

import java.util.List;

import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

@Endpoint
@AnonymousAllowed
public class DependenciaEndpoint {
    private DependenciaRepository repository;

    public DependenciaEndpoint(DependenciaRepository repository) {
        this.repository = repository;
    }

    public @Nonnull List<@Nonnull Dependencia> findAll() {
        return repository.findAll();
    }

    public Dependencia save(Dependencia dependencia) {
        return repository.save(dependencia);
    }

    public Integer delete(Dependencia dependencia) {
        repository.delete(dependencia);
        return dependencia.getId();
    }
}