import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { PoPageLogin } from '@po-ui/ng-templates';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  logo = 'src/app/login/swl_logo.png';

  constructor(
    // private authService: AuthService,
    private router: Router,
    private notificationService: PoNotificationService,
  ) {}

  async onSubmit(formData: PoPageLogin) {
    console.log(formData);
    // const loginAttempt = await this.authService.login(formData.login, formData.password);

    // if (!loginAttempt ) return this.messageError();

    this.router.navigate(['home']);
  }

  messageError() {
    return this.notificationService.error('Usuário inválido.');
  }
}
