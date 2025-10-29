import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton
  ]
})
export class LoginPage {
  email = '';
  password = '';
  loading = false;
  isRegistering = false;

  constructor(private auth: AuthService, private router: Router) {}

  async onLogin() {
    if (!this.email || !this.password) {
      alert('Por favor ingrese email y contraseña');
      return;
    }

    this.loading = true;
    try {
      await this.auth.login(this.email, this.password);
      this.router.navigate(['/home']);
    } catch (e: any) {
      alert('Error al iniciar sesión: ' + e.message);
    } finally {
      this.loading = false;
    }
  }

  async onRegister() {
    if (!this.email || !this.password) {
      alert('Por favor ingrese email y contraseña');
      return;
    }

    this.loading = true;
    try {
      await this.auth.register(this.email, this.password);
      alert('Usuario registrado exitosamente');
      this.router.navigate(['/home']);
    } catch (e: any) {
      alert('Error al registrar: ' + e.message);
    } finally {
      this.loading = false;
    }
  }

  toggleRegister() {
    this.isRegistering = !this.isRegistering;
  }
}