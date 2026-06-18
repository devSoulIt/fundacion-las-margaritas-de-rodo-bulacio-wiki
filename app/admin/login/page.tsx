'use client'

import { useActionState } from 'react'
import { signIn } from '@/app/actions/auth'

export default function LoginPage() {
  const [state, action, pending] = useActionState(signIn, null)

  return (
    <div
      className="admin-root"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          background: 'var(--a-surface)',
          border: '1px solid var(--a-border)',
          padding: '2.5rem',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '1px',
            background: 'var(--a-accent)',
            marginBottom: '1.5rem',
          }}
        />
        <p
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: '1.5rem',
            fontStyle: 'italic',
            fontWeight: 300,
            color: 'var(--a-accent)',
            marginBottom: '0.25rem',
          }}
        >
          Las Margaritas
        </p>
        <p
          style={{
            fontSize: '0.68rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--a-text-muted)',
            marginBottom: '2rem',
          }}
        >
          Acceso administrativo
        </p>

        <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label htmlFor="email" className="admin-label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="admin-input"
            />
          </div>

          <div>
            <label htmlFor="password" className="admin-label">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="admin-input"
            />
          </div>

          {state?.error && (
            <p
              style={{
                fontSize: '0.8rem',
                color: 'var(--a-danger)',
                padding: '8px 12px',
                background: 'rgba(192,80,58,0.1)',
                border: '1px solid rgba(192,80,58,0.3)',
              }}
            >
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="admin-btn"
            style={{ justifyContent: 'center', marginTop: '0.25rem' }}
          >
            {pending ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
