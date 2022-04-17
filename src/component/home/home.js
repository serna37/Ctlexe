// ========================================
// ホーム画面をロード
// ========================================
import Forge from '../../core/Forge.js'
import CMD from '../../core/CMD.js'
import Fsys from '../../core/Fsys.js'

// exeファイルのあるディレクトリを取得
const chdir = CMD.cmdSync('chdir').replace(/\r\n/g, '');

// package.json
const packDict = JSON.parse(
  Fsys.read(`${chdir}\\package.json`)
  .replace(/\r\n/g, ''));

// config.json
const cfDict = JSON.parse(
  Fsys.read(`${chdir}\\src\\config.json`)
  .replace(/\r\n/g, ''));

// タイトルを設定
document.querySelector('#title').innerHTML = ''; // 初期化
document.querySelector('#title')
  .appendChild(document.createTextNode(packDict['name']));

// コンテンツ部
// コンソール部分に出力 (改行コードを考慮)
const sysout = v => document.querySelector('#console').innerHTML
  = v.replace(/\r\n/g, '<br>');

// ボタンに機能登録
const registBtn = def => {
  let obj = document.querySelector(`#btn${def.idx}`);
  obj.innerHTML = def.name;
  obj.onclick = def.func;
  obj.onmouseover = () =>
  document.querySelector('#console').innerHTML = def.detail;
};

const EXIT = {
  idx: 1,
  name: 'EXIT',
  detail: `${packDict['name']}システムを終了します`,
  func: () => {
    sysout('終了中...');
    setTimeout(() => window.close(), 500);
  }
};

const linkf = cfDict['link'];
const elinkf = Fsys.existance(linkf);
const OPEN = {
  idx: 2,
  name: 'OPEN',
  detail: elinkf
  ? `linkフォルダ「${linkf}」の\
  <br>配下のフォルダを選択します\
  <br>選択したフォルダの配下1階層を、全て開きます`
  : 'linkフォルダが未設定です。設定画面から設定してください(押下で設定画面を開きます)',
  func: () => {
    if (elinkf) {
      Forge.load('contents', 'open');
    } else {
      Forge.load('contents', 'setting');
    }
  }
};

const LINK = {
  idx: 3,
  name: 'LINK',
  detail: elinkf
  ? `linkフォルダ「${linkf}」を\
  <br>エクスプローラで開きます\
  <br>OPENボタンの読込み対象となるファイルを編集できます`
  : 'linkフォルダが未設定です。設定画面から設定してください(押下で設定画面を開きます)',
  func: () => {
    if (elinkf) {
      CMD.cmdParallel(`start ${cfDict['link']}`);
    } else {
      Forge.load('contents', 'setting');
    }
  }
};

const bkf = cfDict['bkfrom'];
const bkt = cfDict['bkto'];
const bkst = cfDict['sendto'];
const ebkf = Fsys.existance(bkf);
const ebkt = Fsys.existance(bkt);
const ebkst = Fsys.existance(bkst);
let bkDetail = '';
if (ebkf && ebkt && ebkst) {
  bkDetail = `BK対象フォルダ「${bkf}」を\
      <br>BK先フォルダ「${bkt}」にコピー&圧縮します\
      <br>転送先フォルダ「${bkst}」にバックアップします。\
      <br>コピー→圧縮→転送`;
} else if (ebkf && ebkt) {
  bkDetail = `BK対象フォルダ「${bkf}」を\
      <br>BK先フォルダ「${bkt}」にコピー&圧縮します\
      <br>[INFO] 転送先フォルダが未設定です。設定画面から登録できます。\
      <br>コピー→圧縮`;
} else {
  bkDetail = 'BKフォルダが未設定です。設定画面から設定してください(押下で設定画面を開きます)';
}
const BK = {
  idx: 4,
  name: 'BK',
  detail: bkDetail,
  func: () => {
    if (!ebkf || !ebkt) {
      Forge.load('contents', 'setting');
    } else {
      document.querySelector('#title').innerHTML = 'バックアップ準備中...';
      // sysout('準備中...')
      Forge.load('contents', 'bk');
    }
  }
};

const SETTING = {
  idx: 5,
  name: '設定',
  detail: '操作対象のフォルダを設定します。',
  func: () => {
    Forge.load('contents', 'setting');
  }
};

[EXIT, OPEN, LINK, BK, SETTING].forEach(v => registBtn(v));

// コナミコマンド
let order = 0;
const command = ['ArrowUp', 'ArrowDown', 'ArrowUp', 'ArrowDown'
, 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
document.onkeydown = e => {
  if (order == 0) {
    // 初回キー押下から3秒間, 入力を受け付ける
    setTimeout(() => order = 0, 3000);
  }
  order = e.key == command[order]
    ? (order + 1) | 0
    : 0;
  // 成功時
  if (order == command.length) {
    console.log('おけ')
    order = 0;
  }
};
