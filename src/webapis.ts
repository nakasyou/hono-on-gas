// @ts-nocheck JS がいいけど implements 使いたい

globalThis.Headers = class extends Map {}
globalThis.Request = class implements Request {
  constructor(info: string | Request | URL, init?: RequestInit) {
    const url = (() => {
      if (typeof info === 'string') {
        return info
      }
      if (info instanceof URL) {
        return info.href
      }
      if (info instanceof Response) {
        return info.url
      }
    })()
    this.url = url
    this.method = init?.method ?? 'GET'
  }
}

globalThis.Response = class Response {
  constructor(body?: string, init?: ResponseInit) {
    this.body = body

    this.headers = new Headers()
    if (init?.headers) {
      if (init.headers instanceof Headers) {
        this.headers = init
      } else {
        for (const [k, v] of Object.entries(init.headers)) {
          this.headers.set(k, v)
        }
      }
    }
    this.status = init?.status ?? 200
    this.statusText = init?.statusText ?? 'success'
  }
}
