// キャラごとの語尾リスト。送信時にこの中からランダムで1人＆1つの語尾が選ばれる
const characters = [
  { name: "ネコ",   gobi: ["にゃー", "にゃ？", "みゃ〜"] },
  { name: "イヌ",   gobi: ["わん！", "わんわん", "くぅ〜ん"] },
  { name: "サムライ", gobi: ["でござる", "なり", "候（そうろう）"] },
  { name: "薩摩隼人", gobi: ["ごわす", "でごわんど", "じゃっど"] },
  { name: "面白い人", gobi: ["…なんつって", "知らんけど", "（ドヤ顔）"] },
];

const messagesEl = document.getElementById("messages");
const textEl = document.getElementById("text");

document.getElementById("send").onclick = send;
textEl.addEventListener("keydown", e => { if (e.key === "Enter") send(); });

// リセットボタン：表示エリアを空にして履歴を消す
document.getElementById("reset").onclick = () => {
  messagesEl.innerHTML = "";
};

function send() {
  const text = textEl.value.trim();
  if (!text) return;

  // ランダムでキャラを1人選ぶ
  const chara = characters[Math.floor(Math.random() * characters.length)];
  // そのキャラの語尾の中からランダムで1つ選ぶ
  const gobi = chara.gobi[Math.floor(Math.random() * chara.gobi.length)];

  // 吹き出しを作って表示する（入力文 + 語尾）
  const div = document.createElement("div");
  div.className = "bubble";
  div.innerHTML = `<span class="name">${chara.name}</span>${escape(text)}${gobi}`;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;

  textEl.value = "";
}

// 入力文字をそのままHTMLにしないための簡単な無害化
function escape(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}
