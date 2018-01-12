const db = require("./TestWannatagsPayload");
let id = 10000000;

module.exports = function(app) {
  app.get("/wannatags/:date", function(req, res) {
    const startDate = parseInt(req.params.date);
    if (startDate === 0) {
      res.json(db.slice(0, 20));
    } else {
      const i = db.findIndex(p => p.postDate === startDate);
      if (i < 0) {
        console.log("[wannatags]find failed");
        res.json([]);
      } else {
        const s = i + 1;
        const j = db.slice(s, s + 20);
        console.log(
          `[wannatags]find index: ${i}`,
          `db length: ${j.length}`,
          `db items: ${db.length}`
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

  app.delete("/wannatags/:date", function(req, res) {
    const targetDate = parseInt(req.params.date);
    const i = db.findIndex(p => p.postDate === targetDate);
    if (i < 0) {
      console.log("[wannatags]find failed");
      res.sendStatus(500);
      return;
    }
    db.splice(i, 1);
    console.log(`[wannatags]delete item, it has date: ${req.params.date}`);
    res.sendStatus(200);
  });
};
