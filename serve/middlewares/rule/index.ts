import Path from 'path'
import fs from 'fs'

interface IOpts {
  app: any
  rules: object[]
}
interface IContent {
  [prop: string]: any,
}

export default (opts: IOpts) => {
  const { app, rules = [] } = opts

  if (!app) throw new Error('the app params is necessary!')

  app.router = {}
  const appKeys = Object.keys(app)
  rules.forEach((item: any) => {
    const { path, name } = item
    if (appKeys.includes(name)) throw new Error(`the name of ${name} already exists!`)

    const content: IContent = {}
    fs.readdirSync(path).forEach(filename => {
      const extname = Path.extname(filename)
      if (extname === '.ts' || extname === '.js') {
        const name = Path.basename(filename, extname)
        content[name] = require(Path.join(path, filename))
        content[name].filename = name
      }
    })
    app[name] = content
  })
}
