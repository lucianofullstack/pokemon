const 
favicon = new Buffer.from('AAABAAEAEBAQAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAABfX2YAAAAAAOvr/wANCwsAx8f8AKuovwAAAP8A20QwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREREREREREREVVVERERERERVRERERERERERRBcRERERERFEFxERERERERF3EREREREEQRERERERFEREQREREREUFEFBERERERQ0QREREREREWEREREREREiImZmEREREREmZmZhEREREWZmZmERERERFmZmERERERERERERERHw/wAA4H8AAOA/AADwHwAA8B8AAPAfAADgPwAAwB8AAMAPAADABwAAwAcAAIAHAADADwAA4A8AAPAfAAD4PwAA', 'base64')

module.exports = function(app) {
    app.get("/favicon.ico", function(req, res) {
        res.statusCode = 200
        res.setHeader('Content-Length', favicon.length)
        res.setHeader('Content-Type', 'image/x-icon')
        res.setHeader("Cache-Control", "public, max-age=2592000")
        res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString())
        res.end(favicon)
    })
}