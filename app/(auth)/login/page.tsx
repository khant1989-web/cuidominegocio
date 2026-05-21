'use client';

import { useActionState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { signIn } from '@/app/actions/auth';

export default function LoginPage() {
  const [state, action, pending] = useActionState(signIn, undefined);

  return (
    <div className="login-wrapper">
      <form action={action} className="login-card">
        <div className="login-badge">SE+</div>
        <div>
          <h1 className="login-title">Cuido Mi Negocio</h1>
          <p className="login-subtitle">Ingresa con tu cuenta institucional</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label htmlFor="email">Correo electrónico</label>
          <InputText
            id="email"
            name="email"
            type="email"
            placeholder="usuario@sedbarranquilla.edu.co"
            style={{ width: '100%' }}
            required
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label htmlFor="password">Contraseña</label>
          <Password
            inputId="password"
            name="password"
            placeholder="••••••••"
            toggleMask
            feedback={false}
            inputStyle={{ width: '100%' }}
            style={{ width: '100%' }}
            required
          />
        </div>

        {state?.error && (
          <div className="login-error">
            <i className="pi pi-exclamation-circle" />
            <span>{state.error}</span>
          </div>
        )}

        <Button
          type="submit"
          label={pending ? 'Ingresando...' : 'Iniciar sesión'}
          icon="pi pi-sign-in"
          style={{ width: '100%' }}
          disabled={pending}
        />
      </form>
    </div>
  );
}
