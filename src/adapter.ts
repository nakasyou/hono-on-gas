import type { Hono } from 'hono'

export const serveAppsScript = (app: Hono) => {
  const makeResponse = (req: Request) => {
    const res = app.fetch(req)
    if (res instanceof Promise) {
      return HtmlService.createHtmlOutput(`
        <h1>Not Supported Promise Response</h1>
      `)
    }
    const text = res.body
    
    const mime: string = res.headers.get('Content-Type') ?? ''
    if (mime.startsWith('text/html')) {
      return HtmlService.createHtmlOutput(text)
    }
    if (mime.startsWith('application/json') ) {
      return ContentService.createTextOutput(text).setMimeType(ContentService.MimeType.JSON)
    }
    return ContentService.createTextOutput(text)
  }
  const doGet = (evt: GoogleAppsScript.Events.DoGet) => {
    const url = `http://localhost/${evt.contextPath}?${evt.queryString ?? ''}`

    const req = new Request(url)
    
    return makeResponse(req)
  }
  const doPost = (evt: GoogleAppsScript.Events.DoPost) => {
    const url = `http://localhost/${evt.contextPath}?${evt.queryString ?? ''}`
    const req = new Request(url, {
      body: evt.postData.contents
    })

    return makeResponse(req)
  }
  // @ts-ignore
  globalThis.doGet = doGet
  // @ts-ignore
  globalThis.doPost = doPost
}
