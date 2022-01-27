// ========================================
// BK機能用画面をロード
// ========================================
import Forge from '/src/core/Forge.js'
import CMD from '/src/component/core/CMD.js'
import BAT from '/src/component/logic/BAT.js'

// タイトルを設定
const setTitle = v => document.querySelector('#title').innerHTML = v;

// 進捗バー
let progress = document.querySelector('.progress-bar');

// 1. bkファイルを作成
let bkDir = '';
try {
  CMD.cmdSync(BAT.BK_CREATE_NAME);
} catch (e) {
  // すでに作成されているなどのエラー
} finally {
  bkDir = CMD.cmdSync('type src\\component\\logic\\bat\\name.txt');
}

// 2. bk必要ファイル数を取得
const bkAll = Number(CMD.cmdSync(BAT.BK_CNT_FROM));

// 3. bk実行
CMD.cmdParallel(`${BAT.BK_EXE} ${bkDir}`);

// 4. bk完了ファイル数を再帰取得し進捗率を計算/表示
function calcProgress() {
  let transfared = 0;
  try {
    transfared = Number(CMD.cmdSync(`${BAT.BK_CNT_TO} ${bkDir}`));
  } catch (e) {
    // 0件
  }
  let st = transfared == bkAll ? '完了' : '作成中';
  setTitle(`バックアップ${st}(${transfared}/${bkAll})`);
  let prog = Math.floor(transfared/bkAll*100);
  progress.style.width = `${prog}%`;// 進捗バー更新
  if (prog >= 100) {
    setTimeout(() => {
      viewCompress();
      watchCompress();
    }, 1000);
    return;
  }
  setTimeout(() => calcProgress(), 100);
}
calcProgress();

// 5. bk完了後, 圧縮中画面を表示
function viewCompress() {
  setTitle('圧縮中...');
  document.querySelector('.progress-base').style.display = 'none';
  document.querySelector('.bg').classList.add('compress');
}

// 6. 圧縮処理の進捗を監視
function watchCompress() {
  let result = CMD.cmdSync(`${BAT.BK_WATCH_COMPRESS} ${bkDir}`);
  if (result.match(/notyet/)) {
    setTimeout(() => watchCompress(), 1000);
  }
  if (result.match(/complete/)) {
    // TODO ファイルの有無はバッチでなくてよい？
    let fs = require('fs');
    let testPath = 'C:\\\\Users\\serna37\\Documents\\World\\work\\google検索をうまいことしたい.txt'
    let a = fs.existsSync(testPath); // あるならtrue
    // TODO ここで転送対象のフォルダがあるかを確認したい
    setTitle('転送中...');
    document.querySelector('.bg').classList.remove('compress');
    document.querySelector('.bg').classList.add('transfar')
    watchTransfar();
  }
}

// 7. 圧縮完了後, 転送処理を監視
function watchTransfar() {
  let result = CMD.cmdSync(`${BAT.BK_WATCH_TRANSFAR} ${bkDir}`);
  if (result.match(/notyet/)) {
    setTimeout(() => watchTransfar(), 200);
  }
  if (result.match(/complete/)) {
    setTimeout(() => {
      setTitle('転送完了');
      document.querySelector('.bg').classList.remove('transfar')
      setTimeout(() => {
        // ここなんか変になる
        // 一生ロードしてる...?
        // Forge.seriesLoadWithAnime([{id: 'contents', component: 'home'}]);
        Forge.load('contents', 'home');
      }, 1000);
    }, 1000);
    return;
  }
}
