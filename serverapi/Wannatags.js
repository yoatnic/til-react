const payload = require("./TestWannatagsPayload");
const db = payload;
let id = 10000000;

module.exports = function(app) {
  app.get("/wannatags/:date", function(req, res) {
    const startDate = parseInt(req.params.date);
    if (startDate === 0) {
      res.json(payload.slice(0, 20));
    } else {
      const i = payload.findIndex(p => p.postDate === startDate);
      if (i < 0) {
        console.log("[wannatags]find failed");
        res.json([]);
      } else {
        const s = i + 1;
        const j = payload.slice(s, s + 20);
        console.log(
          `[wannatags]find index: ${i}`,
          `payload length: ${j.length}`,
          `db items: ${payload.length}`
        );
        res.json(j);
      }
    }
  });

  app.post("/wannatags", function(req, res) {
    db.unshift({
      wannatagId: (id++).toString(),
      title: req.body.title,
      body: req.body.body,
      username: req.body.username,
      postDate: new Date().getTime(),
      isOwner: true
    });
    res.sendStatus(200);
  });
};
