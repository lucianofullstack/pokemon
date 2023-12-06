module.exports = function(env) {
    const
    len = (str) => { return [...str].length },
    ansi = (value = 0) => { return `\x1b[${value}m` },
    titleName=env.npm_package_name,
    titleVer=env.npm_package_version,
    name=env.COMPUTERNAME,
    port=env.PORT,
    os=env.OS,
    cores=env.NUMBER_OF_PROCESSORS,
    db=env.DB_NAME,
    since = new Date(env.SINCE).toUTCString()
    let 
    line = len(titleName + titleVer),
    titleAnd = (line % 2) ? "v." : "v"
    line = "=".repeat(Math.round((40 - line) / 2)),
  title = `\n\n   \
  ${ansi(38) + ansi(2)}${line}${ansi(0) + ansi(3) + ansi(92)} \
  ${titleName} ${titleAnd}${titleVer} ${ansi(0) + ansi(23) + ansi(38) + ansi(2)}${line}${ansi(0)}\n\n   \
  [ ${ansi(92) + name + ansi()} ] is listening on port ${ansi(92) + port + ansi()}\n\n   \
  OS: ${ansi(92) + os + ansi()} - Cores: ${ansi(92) + cores + ansi()} - DB: ${ansi(92) + db + ansi()} \n\n   \
  Running Since: ${ansi(92) + since + ansi()}\n\n   \
  ${ansi(38) + ansi(2) + "=".repeat(44) + ansi() + ansi(23) + ansi(3)}\n\n\nEvents:${ansi()}\n`
      console.clear()
      console.log(title)  
}
