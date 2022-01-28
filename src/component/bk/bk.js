// ========================================
// BK機能用画面をロード
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
const setTitle = v => document.querySelector('#title').innerHTML = v;

// 進捗バー
let progress = document.querySelector('.progress-bar');

// 作業フォルダをハンドリング
function handl() {
  if (!Fsys.existance(cfDict['bkto'])
  || !Fsys.existance(cfDict['bkfrom'])) {
    Forge.load('contents', 'home', () => {
      document.querySelector('#console').innerHTML = 'BKフォルダが存在しません, 設定画面から設定してください。';
    });
    return false;
  }
  return true;
}

let bktoDirName = null;
let bkFileAllNo = null;

// 実行関数
function exeBk() {
  let now = new Date();
  let yyyy = now.getFullYear();
  let mm = now.getMonth() >= 9 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`;
  let dd = now.getDate();
  // 新規ヘッダ or 今日と同日でない場合
  let dirname = `${cfDict['bkheader']}_${yyyy}_${mm}_${dd}_ver1`;
  let flist = Fsys.fList(cfDict['bkto']);
  let dirList = Fsys.dirList(cfDict['bkto']);
  if (flist || dirList) {
    // ファイル名も考慮
    // 同ヘッダファイルについて
    let sameHeadFile = flist
    ? flist.concat(dirList).filter(v => v)
      .filter(v => v.startsWith(cfDict['bkheader'])).sort()
    : dirList.concat(flist).filter(v => v)
      .filter(v => v.startsWith(cfDict['bkheader'])).sort();
    if (sameHeadFile.length != 0) {
      // 最新バージョンを取得
      let el = /(.+)_(.+)_(.+)_(.+)_ver(.+)/.exec(sameHeadFile.slice(-1)[0]);
      // 今日と同日なら, バージョンを+1
      if (el[2] == yyyy && el[3] == mm && el[4] == dd) {
        // ファイルの場合拡張子を削除
        let ver = el[5].split('.')[0];
        dirname = `${cfDict['bkheader']}_${yyyy}_${mm}_${dd}_ver${Number(ver) + 1}`;
      }
    }
  }
  bktoDirName = `${cfDict['bkto']}\\${dirname}`
  new Promise(resolve => {
    // フォルダ作成
    Fsys.mkdir(bktoDirName);
    resolve();
  })
  .then(() => {
    // 並列でコピー、進捗を監視して圧縮/転送
    Fsys.robocopy(cfDict['bkfrom'], bktoDirName);
    calcProgress(Fsys.count(cfDict['bkfrom']));
  });
}

// 進捗監視, 圧縮, 転送
function calcProgress(bkAll) {
  if (!bkAll) {
    calcProgress(Fsys.count(cfDict['bkfrom']));
    return;
  }
  let transfared = 0;
  try {
    transfared = Number(Fsys.count(bktoDirName));
  } catch(e) {
    // 0件
  }
  setTitle(`コピー中(${transfared}/${bkAll})`);
  progress.style.width = `${Math.floor(transfared/bkAll*100)}%`;// 進捗バー更新
  if (transfared >= bkAll) {
    // コピー完了
    new Promise(resolve => {
      progress.style.width = `100%`;
      setTitle(`コピー完了`);
      setTimeout(() => resolve(), 300);
    })
    // 圧縮画面表示
    .then(() => new Promise(resolve => {
      setTitle('圧縮中...');
      document.querySelector('.progress-base').style.display = 'none';
      document.querySelector('.bg').classList.add('compress');
      setTimeout(() => resolve(), 2000);
    }))
    // 圧縮/コピーフォルダ削除
    .then(() => new Promise(resolve => {
      Fsys.compress(bktoDirName);
      Fsys.delCmd(bktoDirName);
      setTitle('圧縮完了');
      resolve();
    }))
    // 転送しない場合は終了
    .then(() => new Promise(resolve => {
      if (!Fsys.existance(cfDict['sendto'])) {
        setTimeout(() => {
          Forge.load('contents', 'home');
        }, 1000);
        return;
      }
      resolve();
    }))
    // 転送画面表示
    .then(() => new Promise(resolve => {
      setTitle('転送中...');
      document.querySelector('.bg').classList.remove('compress');
      document.querySelector('.bg').classList.add('transfar');
      setTimeout(() => resolve(), 1000);
    }))
    // 転送
    .then(() => new Promise(resolve => {
      Fsys.cpSync(`${bktoDirName}.zip`, cfDict['sendto']);
      setTitle('転送完了');
      setTimeout(() => {
        document.querySelector('.bg').classList.remove('transfar')
        Forge.load('contents', 'home');
        resolve();
      }, 1000);
    }));
    return;
  }
  // コピーが完了するまで再帰
  setTimeout(() => calcProgress(bkAll), 100);
}

// ハンドリングして実行
if (handl()) {
  exeBk();
}
