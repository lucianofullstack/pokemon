const
{ Router } = require('express'),
router = Router()
router.get('/', async (req, res) => {
  let 
  since = new Date(process.env.SINCE).getTime(),
   now  = new Date().getTime(),
   diff = (now - since) / 1000
  return res.status(200).send({
    days:           ~~(diff / 86400),
    hours:   String(~~(diff % 86400 / 3600)).padStart(2, '0'),
    minutes: String(~~(diff % 3600 / 60)).padStart(2, '0'),
    seconds: String(~~(diff % 60)).padStart(2, '0'),
    since: since,
      now: now,
  })
})
module.exports = router
