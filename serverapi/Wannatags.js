const url = require("url");
const db = require("./TestWannatagsPayload");
const feed = require("./TestWannatagsFeedPayload");
let id = 10000000;

module.exports = function(app) {
  app.get("/wannatags", function(req, res) {
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;
    const compare = query.compare || "older";

    if (compare === "newer") {
      res.json(feed);
      return;
    }

    if (query.postDate === void 0) {
      res.json(db.slice(0, 20));
      return;
    }

    const startDate = parseInt(query.postDate);
    const i = db.findIndex(p => p.postDate === startDate);
    if (i < 0) {
      console.log("[wannatags]find failed");
      res.json([]);
      return;
    }

    const s = i + 1;
    const j = db.slice(s, s + 20);
    console.log(
      `[wannatags]find index: ${i}`,
      `db length: ${j.length}`,
      `db items: ${db.length}`
    );
    res.json(j);
  });

  app.post("/wannatags", function(req, res) {
    db.unshift({
      wannatagId: (id++).toString(),
      title: req.body.title,
      body: req.body.body,
      username: "posted_user_name",
      postDate: new Date().getTime(),
      isOwner: true
    });
    res.sendStatus(200);
  });

  app.delete("/wannatags/:wannatagId", function(req, res) {
    const i = db.findIndex(p => {
      return p.wannatagId == req.params.wannatagId;
    });
    if (i < 0) {
      console.log("[wannatags delete]find failed");
      res.sendStatus(500);
      return;
    }
    db.splice(i, 1);
    console.log(
      `[wannatags]delete item, it has wannatagId: ${req.params.wannatagId}`
    );
    res.sendStatus(200);
  });
};
