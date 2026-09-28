declare const __BUILD_ID__: string

/**
 * Phones and in-app browsers often reopen a saved copy of the page. On load,
 * ask the server which version is current (bypassing every cache) and, if
 * this copy is older, reload once to get the new one.
 */
export function ensureLatest() {
  if (import.meta.env.DEV || typeof fetch === 'undefined') return
  const KEY = 'invite-reloaded-for'
  fetch(`${import.meta.env.BASE_URL}version.json?t=${Date.now()}`, { cache: 'no-store' })
    .then((r) => (r.ok ? r.json() : null))
    .then((v: { id?: string } | null) => {
      if (!v?.id || v.id === __BUILD_ID__) return
      let already: string | null = null
      try { already = sessionStorage.getItem(KEY) } catch { /* private mode */ }
      if (already === v.id) return            // never loop
      try { sessionStorage.setItem(KEY, v.id) } catch { /* ignore */ }
      const u = new URL(location.href)
      u.searchParams.set('v', v.id)
      location.replace(u.toString())
    })
    .catch(() => {})
}
