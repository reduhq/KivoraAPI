import { injectable } from 'inversify';
import { transporter } from '../utils/Nodemailer';
import { IEmailService } from '../Interfaces/IEmailService';

@injectable()
export class EmailService implements IEmailService {
  async sendConfirmationEmail(user: {
    email: string;
    name: string;
    token: string;
  }): Promise<void> {
    await transporter.sendMail({
      from: `"Kivora" <no-reply@kivora.com>`,
      to: user.email,
      subject: 'Kivora - Confirma tu cuenta',
      text: 'Kivora - Confirma tu cuenta',
      html: `<p>Hola: ${user.name}, has creado tu cuenta en Kivora, ya casi está todo listo, solo debes confirmar tu cuenta.</p>
             <p>Visita el siguiente enlace:</p>
             <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
             <p>Ingresa el código: <b>${user.token}</b></p>
             <p>Este token expira en 10 minutos.</p>`
    });
  }

  async sendPasswordResetToken(user: {
    email: string;
    name: string;
    token: string;
  }): Promise<void> {
    await transporter.sendMail({
      from: `"Kivora" <no-reply@kivora.com>`,
      to: user.email,
      subject: 'Kivora - Reestablece tu password',
      text: 'Kivora - Reestablece tu password',
      html: `<p>Hola: ${user.name}, has solicitado reestablecer tu password.</p>
             <p>Visita el siguiente enlace:</p>
             <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer Password</a>
             <p>Ingresa el código: <b>${user.token}</b></p>
             <p>Este token expira en 10 minutos.</p>`
    });
  }
}
