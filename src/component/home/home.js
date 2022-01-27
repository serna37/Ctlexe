// ========================================
// ホーム画面をロード
// ========================================
import Forge from '/src/core/Forge.js'
// import CMD from '/src/component/logic/CMD.js'
import BAT from '/src/component/logic/BAT.js'

// タイトルを設定
// let icon = document.createElement('img');
// icon.className = 'icon';
// icon.src = '/src/component/img/icon.jpg';
document.querySelector('#title').innerHTML = ''; // 初期化
// document.querySelector('#title').appendChild(icon);
document.querySelector('#title')
  .appendChild(document.createTextNode('Ctl.exe'));

// コンテンツ部
// コンソール部分に出力 (改行コードを考慮)
const sysout = v => document.querySelector('#console').innerHTML
  = v.replace(/\n/g, '<br>');

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
  detail: 'Ctl.exeシステムを終了します',
  func: () => {
    sysout('終了中...');
    setTimeout(() => window.close(), 500);
  }
};

const OPEN = {
  idx: 2,
  name: 'OPEN',
  detail: 'linkフォルダ「C\\\\Users\\ユーザ名\\Documents\\World\\link\\」の\
  <br>配下のフォルダを選択します\
  <br>選択したフォルダの配下1階層を、全て開きます',
  func: () => {
    Forge.load('contents', 'open');
  }
};

const LINK = {
  idx: 3,
  name: 'LINK',
  detail: 'linkフォルダ「C\\\\Users\\ユーザ名\\Documents\\World\\link\\」を\
  <br>エクスプローラで開きます\
  <br>OPENボタンの読込み対象となるファイルを編集できます',
  func: () => {
    // CMD.cmdParallel(BAT.LINK_EXPLORER);
  }
};

const BK = {
  idx: 4,
  name: 'BK',
  detail: 'Worldフォルダ「C\\\\Users\\ユーザ名\\Documents\\World」を\
  <br>Giftフォルダ「C\\\\Users\\ユーザ名\\Documents\\Gift」\
  <br>にバックアップします',
  func: () => {
    document.querySelector('#title').innerHTML = '準備中...';
    sysout('準備中...')
    // Forge.load('contents', 'bk');
  }
};

const TODO = {
  idx: 5,
  name: 'TODO',
  detail: '機能未作成です',
  func: () => {
    // sysout('NO FUNCTION');

// open
// フォルダ一覧(ファイル除く)を取得
// let path = "対象フォルダまでのパス";
// File.dirList(path)

// 配下ファイルを開く というか実行
// let path = "対象フォルダまでのパス";
// File.fList(path).forEach(f => CMD.cmdParallel(`start "${path}\\${f}"`));

// エクスプローラで開く
// let path = パスを取得;
// CMD.cmdParallel(`start "${path}"`);

// bk ===================================================
// // フォルダ配下の、ファイル名一覧を取得 (新規bkファイル名を作る)
// let path = bkおいとくパスを取得;
// let bkHeader = バックアップファイル名ヘッダーを取得;
// let target = バックアップ対象のファイルたちのパス;
// let outerDrive = 外部保存するパス;
//
// File.dirList(path)
// .forEach(V => File.delete(`${path}\\${v}`));// 作成途中フォルダ名→削除
// let flist = File.fList(path).filter(v => v.startsWith(bkHeader));
//
// let now = new Date();
// let yyyy = now.getFullYear();
// let mm = now.getMonth() >= 9 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`;
// let dd = now.getDate();
//
// // 新規ヘッダ or 今日ど同日でない場合
// let dirname = `${bkHeader}_${yyyy}_${mm}_${dd}_ver1`;
//
// // 同一ヘッダの場合
// if (flist) {
//   // 既存の最新バージョンを取得
//   let lastZip = flist[flist.length - 1];
//   let el = /(.+)_(.+)_(.+)_(.+)_ver(.+)\.zip/.exec(lastZip);// 作成済みの最新zipフォルダ
//   // 今日と同日?
//   if (el[2] == yyyy && el[3] == mm && el[4] == dd) {
//     dirname = `${bkHeader}_${yyyy}_${mm}_${dd}_ver${Number(el[5]) + 1}`;
//   }
// }
//
// // フォルダを作成
// File.mkdir(`${path}\\${dirname}`);
// // コピー開始(非同期)
// File.copyParallel(target, `${path}\\${dirname}`);
//
// // ファイル数をカウント
// File.count(target)
// File.count(`${path}\\${dirname}`) // ここ再帰
//
// // 圧縮アニメ
// // 圧縮(同期)
// // TODO
// // 圧縮後にフォルダ削除
// File.delete(`${path}\\${dirname}`)
//
// // フォルダ存在確認
// if (File.existance(outerDrive)) {
//   // あるなら転送
//   File.copy(`${path}\\${dirname}.zip`, outerDrive);
// }

// ===================================================終了

// setting jsonでやろう
// ファイルの値取得
// ファイルに書き込み(全上書き)


  }
};

[EXIT, OPEN, LINK, BK, TODO].forEach(v => registBtn(v));

// CMD.cmdParallel(BAT.ENV, sysout, sysout);
// CMD.cmdParallel(BAT.WIN_ACT);



// コナミコマンド
let conami = 0;
document.onkeydown = e => {
  let keyName = e.key;
  if (conami == 0) {
    if (keyName == 'ArrowUp') {
      conami = 1;
      setTimeout(() => {
        conami = 0;
      },3000);
      return;
    }
  } else if (conami == 1) {
    if (keyName == 'ArrowDown') {
      conami = 2;
      return;
    }
  } else if (conami == 2) {
    if (keyName == 'ArrowUp') {
      conami = 3;
      return;
    }
  } else if (conami == 3) {
    if (keyName == 'ArrowDown') {
      conami = 4;
      return;
    }
  } else if (conami == 4) {
    if (keyName == 'ArrowLeft') {
      conami = 5;
      return;
    }
  } else if (conami == 5) {
    if (keyName == 'ArrowRight') {
      conami = 6;
      return;
    }
  } else if (conami == 6) {
    if (keyName == 'ArrowLeft') {
      conami = 7;
      return;
    }
  } else if (conami == 7) {
    if (keyName == 'ArrowRight') {
      conami = 8;
      return;
    }
  } else if (conami == 8) {
    if (keyName == 'b') {
      conami = 9;
      return;
    }
  } else if (conami == 9) {
    if (keyName == 'a') {
      window.location.reload();
    }
  }
};
