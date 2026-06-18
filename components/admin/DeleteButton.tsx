'use client'

import { useTransition } from 'react'

interface Props {
  action: () => Promise<void>
  confirm?: string
  label?: string
}

export default function DeleteButton({
  action,
  confirm: confirmMsg = '¿Eliminar este elemento?',
  label = 'Eliminar',
}: Props) {
  const [pending, startTransition] = useTransition()

  function handleClick() {
    if (!window.confirm(confirmMsg)) return
    startTransition(() => action())
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="admin-btn-danger"
    >
      {pending ? '…' : label}
    </button>
  )
}
