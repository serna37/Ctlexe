// ========================================
// OPEN機能用画面をロード
// ========================================
import Forge from '/src/core/Forge.js'
// import CMD from '/src/component/logic/CMD.js'
import BAT from '/src/component/logic/BAT.js'

// タイトルを設定
document.querySelector('#title').innerHTML = '開くフォルダを選択';

// OPEN対象のフォルダを, Windowsコマンドで取得
const link_dirs =
 ['a', 'a', 'a', 'a', 'a', 'g'];
// CMD.cmdSync(BAT.LINK_GET_DIR).split(/\n/).filter(v => v);

// 押下時イベントを返却する関数
const func = item => {
  return () => {
    document.querySelector('#title').innerHTML = `${item}配下を全開きします`;
    setTimeout(() => {
      // CMD.cmdParallel(`${BAT.LINK_OPEN} ${item}`);
      Forge.load('contents', 'home', () => {
        document.querySelector('#console').innerHTML = `OPEN[${item}]実行完了`;
      });
    }, 1000);
  };
};

// ボタン作成関数
const addBtn = (item, i, f) => {
  let div_child = document.createElement('div');
  let div_parent = document.createElement('div');
  div_child.id = `select_${i}`;
  div_child.className = 'btn';
  div_child.innerHTML = item;
  div_child.onclick = f(item);
  div_parent.className = 'btn-box';
  div_parent.appendChild(div_child);
  document.querySelector('.contents-open').appendChild(div_parent);
};

// フォルダ数分だけボタンを表示
link_dirs.forEach((item, i) => addBtn(item, i, func));

// ダミーdivと戻るボタン追加
// ダミーの数は, 5以上の場合「4-(フォルダ数 % 5)個」
// 2以上5未満の場合「n-1個」「1なら1個」
let dummyLen = link_dirs.length >= 5
  ? 4 - Math.floor(link_dirs.length % 5)
  : link_dirs.length == 1
    ? 1 : link_dirs.length - 1;
for (let i = 0; i < dummyLen; i++) {
  document.querySelector('.contents-open')
    .appendChild(document.createElement('div'));
}
addBtn('戻る', 'contents-open-back-btn', (item) => {
  return () => Forge.load('contents', 'home');
});

// Gridレイアウトのカラム数を動的に(最大5で改行)
document.querySelector('.contents-open').setAttribute('style',
  `grid-template-columns: repeat(${link_dirs.length > 5 ? 5 : link_dirs.length}, 1fr)`);
