package com.ejemplo.backend.service;

import com.ejemplo.backend.model.Usuario;
import com.ejemplo.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {
    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public List<Usuario> listar() {
        return repository.findAll();
    }

    public Usuario guardar(Usuario usuario) {
        return repository.save(usuario);
    }

    public Usuario actualizar(Long id, Usuario nuevoUsuario) {
        return repository.findById(id).map(u -> {
            u.setNombre(nuevoUsuario.getNombre());
            u.setEmail(nuevoUsuario.getEmail());
            return repository.save(u);
        }).orElse(null);
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }

    public Usuario obtener(Long id) {
        return repository.findById(id).orElse(null);
    }
}