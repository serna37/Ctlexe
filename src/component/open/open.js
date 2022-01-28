// ========================================
// OPEN機能用画面をロード
// ========================================
import Forge from '../../core/Forge.js'
import CMD from '../../core/CMD.js'
import Fsys from '../../core/Fsys.js'

// exeファイルのあるディレクトリを取得
const chdir = CMD.cmdSync('chdir').replace(/\r\n/g, '');

// config.json
const cfDict = JSON.parse(
  Fsys.read(`${chdir}\\src\\config.json`)
  .replace(/\r\n/g, ''));

// タイトルを設定
document.querySelector('#title').innerHTML =
  `${cfDict['link']}を表示しています。\
  <br>一括で開くフォルダを選択してください。`;

// OPEN対象のフォルダを, configから取得
const link_dirs = Fsys.dirList(cfDict['link']);
if (!link_dirs) {
  // パスが存在しなかった場合
  Forge.load('contents', 'setting', () => {
    document.querySelector('#title').innerHTML = 'linkフォルダが存在しませんでした';
  });
}

// 押下時イベントを返却する関数
const openFunc = item => {
  return () => {
    document.querySelector('#title').innerHTML = `${item}配下を全開きします`;
    setTimeout(() => {
      // 選択されたフォルダ配下1階層のファイルを全て、並列で開く
      let flist = Fsys.fList(`${cfDict['link']}\\${item}`);
      if (flist) {
        flist.forEach(f => CMD.cmdParallel(`start "" "${cfDict['link']}\\${item}\\${f}"`));
      } else {
        document.querySelector('#title').innerHTML = 'ファイルがありません。';
      }
      Forge.load('contents', 'home', () => {
        document.querySelector('#console').innerHTML = `OPEN[${item}]実行完了`;
      });
    }, 500);
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
link_dirs.forEach((item, i) => addBtn(item, i, openFunc));

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
