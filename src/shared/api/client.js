const DEFAULT_TIMEOUT_MS = 10000

export async function request(path, options = {}) {
  const base = 'https://jsonplaceholder.typicode.com'
  const url = path.startsWith('http') ? path : `${base}${path}`
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), options.timeout ?? DEFAULT_TIMEOUT_MS)

  try {
    const res = await fetch(url, {
      ...options,
      signal: options.signal ?? controller.signal,
    })
    clearTimeout(timeoutId)
    if (!res.ok) {
      const err = new Error(`HTTP ${res.status}: ${res.statusText}`)
      err.status = res.status
      err.response = res
      throw err
    }
    return res
  } catch (err) {
    clearTimeout(timeoutId)
    throw err
  }
}

export async function getJSON(path, options = {}) {
  const res = await request(path, { ...options, method: 'GET' })
  return res.json()
}
