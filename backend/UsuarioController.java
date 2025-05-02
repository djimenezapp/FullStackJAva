// controller/UsuarioController.java
package com.ejemplo.backend.controller;

import com.ejemplo.backend.model.Usuario;
import com.ejemplo.backend.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    private final UsuarioService servicio;

    public UsuarioController(UsuarioService servicio) {
        this.servicio = servicio;
    }

    @GetMapping
    public List<Usuario> listar() {
        return servicio.listar();
    }

    @GetMapping("/{id}")
    public Usuario obtener(@PathVariable Long id) {
        return servicio.obtener(id);
    }

    @PostMapping
    public Usuario guardar(@RequestBody Usuario usuario) {
        return servicio.guardar(usuario);
    }

    @PutMapping("/{id}")
    public Usuario actualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        return servicio.actualizar(id, usuario);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        servicio.eliminar(id);
    }
}