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
const userTable = ["foo", "bar", "buz", "qux", "hoge"];
const dateSeed = new Date().getTime();

for (let i = 0; i < 100; i++) {
  payload.push({
    wannatagId: randomStr(),
    title: randomStr(),
    body: randomStr(10, 200),
    username: userTable[i % userTable.length],
    postDate: dateSeed + i,
    isOwner: i % userTable.length === 0
  });
}
console.log(payload);
module.exports = payload;
