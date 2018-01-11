const payload = require("./TestWannatagsFeedPayload");
module.exports = function(app) {
  app.get("/wannatagsFeed/:date", function(req, res) {
    const terminateDate = parseInt(req.params.date);
    const wannatags = payload.filter(wannatag => {
      return wannatag.postDate > terminateDate;
    });
    if (wannatags.length < 0) {
      console.log("[wannatags feed]no feed");
      res.json([]);
    } else {
      console.log(`[wannatags feed]find length: ${wannatags.length}`);
      res.json(wannatags);
    }
  });
};
