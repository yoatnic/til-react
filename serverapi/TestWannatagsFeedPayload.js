function randomStr(s = 10, e = 10) {
  const range = Math.floor(Math.random() * (e + 1 - s)) + s;
  const table = "qwertyuiasdfghjkzxcvbnm\n ";
  const str = [];
  for (let i = 0; i < range; i++) {
    str.push(table[Math.floor(Math.random() * table.length)]);
  }
  return str.join("");
}

const payload = [];
const userTable = ["bar", "buz", "qux", "hoge"];
const dateSeed = new Date().getTime();
for (let i = 0; i < 13; i++) {
  payload.push({
    wannatagId: (i + 1000).toString(),
    title: randomStr(),
    body: randomStr(10, 200),
    username: userTable[i % (userTable.length - 1) + 1],
    postDate: dateSeed + 1000000 - i * 1000,
    isOwner: false
  });
}

module.exports = payload;
