// src/app/components/usuarios/usuarios.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService, Usuario } from '../../services/usuario.service';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioForm: FormGroup;
  editandoId: number | null = null;
  columnas: string[] = ['nombre', 'email', 'acciones'];

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.listar().subscribe(data => this.usuarios = data);
  }

  guardar(): void {
    const usuario = this.usuarioForm.value;
    if (this.editandoId) {
      this.usuarioService.actualizar(this.editandoId, usuario).subscribe(() => {
        this.cargarUsuarios();
        this.cancelar();
      });
    } else {
      this.usuarioService.guardar(usuario).subscribe(() => {
        this.cargarUsuarios();
        this.usuarioForm.reset();
      });
    }
  }

  editar(usuario: Usuario): void {
    this.editandoId = usuario.id!;
    this.usuarioForm.patchValue(usuario);
  }

  eliminar(id: number | undefined): void {
    if (id) {
      this.usuarioService.eliminar(id).subscribe(() => this.cargarUsuarios());
    }
  }

  cancelar(): void {
    this.editandoId = null;
    this.usuarioForm.reset();
  }
}