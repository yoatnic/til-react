const payload = require("./TestWannatagsPayload");

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
};