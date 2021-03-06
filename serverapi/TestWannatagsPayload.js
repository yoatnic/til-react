function randomStr(s = 10, e = 10) {
  const range = Math.floor(Math.random() * (e + 1 - s)) + s;
  const table = "qwertyuiasdfghjkzxcvbnm\n ";
  const str = [];
  for (let i = 0; i < range; i++) {
    str.push(table[Math.floor(Math.random() * table.length)]);
  }
  return str.join("");
}

const pyaload = [];
const userTable = ["foo", "bar", "buz", "qux", "hoge"];
const dateSeed = new Date().getTime();

for (let i = 0; i < 100; i++) {
  pyaload.push({
    wannatagId: i.toString(),
    title: randomStr(),
    body: randomStr(1, 300),
    username: userTable[i % userTable.length],
    postDate: dateSeed - i * 10000,
    isOwner: i % userTable.length === 0
  });
}

module.exports = pyaload;
