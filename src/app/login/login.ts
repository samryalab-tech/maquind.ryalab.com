import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Asegúrate de tener HttpClientModule
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule
     // Agrégalo aquí para que funcione el http.post
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  // VARIABLES PARA EL OJO (Esto te faltaba)
  passwordHidden: boolean = true;

  // ESTADOS DE LA PETICIÓN
  loading = false;
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  // FUNCIÓN PARA EL OJO (Esto también te faltaba)
  togglePasswordVisibility(): void {
    this.passwordHidden = !this.passwordHidden;
  }

  login(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    // Ajusté el selector de password porque si el ojo está activo, el type cambia a "text"
    const email = (form.querySelector('input[type="email"]') as HTMLInputElement)?.value;
    const password = (form.querySelector('.password-input-group input') as HTMLInputElement)?.value;

    if (!email || !password) {
      this.error = 'Completa todos los campos';
      return;
    }

    this.loading = true;
    this.error = '';

    this.http.post<any>('https://apis.ryalab.com/erp/login', {
      email,
      password
    }).subscribe({
      next: (res) => {
      console.log('RESPUESTA API:', res);  // 👈 AGREGA ESTO

      this.loading = false;

      if (res.success) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));

        console.log('LOGIN EXITOSO, redirigiendo...'); // 👈 DEBUG

        this.router.navigate(['/dashboard']);
      } else {
        console.log('LOGIN FALLÓ'); // 👈 DEBUG
        this.error = 'Credenciales incorrectas';
      }
    },
      error: (err) => {
        this.loading = false;
        console.error(err);
        this.error = 'Error de conexión con el servidor';
      }
    });
  }
}