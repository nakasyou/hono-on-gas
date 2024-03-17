import { html } from 'hono/html'
import { serveAppsScript } from '../src'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.html(html`
    <!doctype HTML>
    <html>
      <head>
        <meta charset="utf-8" />
      </head>
      <body>
        <h1>Hello, ${c.req.query('name')}</h1>
      </body>
    </html>
  `)
})

serveAppsScript(app)
