// ========================================
// 設定画面をロード
// ========================================
import Forge from '../../core/Forge.js'
import CMD from '../../core/CMD.js'
import Fsys from '../../core/Fsys.js'

// exeファイルのあるディレクトリを取得
const chdir = CMD.cmdSync('chdir').replace(/\r\n/g, '');

// config.json
let cfDict = JSON.parse(
  Fsys.read(`${chdir}\\src\\config.json`)
  .replace(/\r\n/g, ''));

// タイトルを設定
document.querySelector('#title').innerHTML = '設定画面';
document.querySelectorAll('.btn').forEach(v => {
  v.style.top = "200px"; // ボタンを下揃え
});

//初期値を表示
const nowLink = cfDict['link'];
const nowBkform = cfDict['bkfrom'];
const nowBkto = cfDict['bkto'];
const nowBkheader = cfDict['bkheader'];
const nowSendto = cfDict['sendto'];
document.querySelector('#set-link').value = Fsys.existance(nowLink) ? nowLink : '削除されました';
document.querySelector('#set-bkfrom').value = Fsys.existance(nowBkform) ? nowBkform : '削除されました';
document.querySelector('#set-bkto').value = Fsys.existance(nowBkto) ? nowBkto : '削除されました';
document.querySelector('#set-bkheader').value = nowBkheader;
document.querySelector('#set-sendto').value = Fsys.existance(nowSendto) ? nowSendto : '削除されました';

// 更新ボタン
// 更新ボタンにセット関数(前後差分見たい)
document.querySelector('#setting-upd').onclick = () => {
  let inputLink = document.querySelector('#set-link').value;
  let inputBkform = document.querySelector('#set-bkfrom').value;
  let inputBkto = document.querySelector('#set-bkto').value;
  let inputBkheader = document.querySelector('#set-bkheader').value;
  let inputSendto = document.querySelector('#set-sendto').value;
  let updFlg = false;
  let eMsg = [];
  // bk先がbk元にある場合はエラー
  if (inputBkto.startsWith(inputBkform)) {
    document.querySelector('#title').innerHTML = 'BK先をBK元の中にはできません。';
    return;
  }
  if (nowLink != inputLink) {
    if (!Fsys.existance(inputLink)) {
      if (!Fsys.mkdir(inputLink)) {
        eMsg.push('linkフォルダ');
      } else {
        cfDict['link'] = inputLink;
        updFlg = true;
      }
    } else {
      cfDict['link'] = inputLink;
      updFlg = true;
    }
  }
  if (nowBkform != inputBkform) {
    if (!Fsys.existance(inputBkform)) {
      if (!Fsys.mkdir(inputBkform)) {
        eMsg.push('bkするフォルダ');
      } else {
        cfDict['bkfrom'] = inputBkform;
        updFlg = true;
      }
    } else {
      cfDict['bkfrom'] = inputBkform;
      updFlg = true;
    }
  }
  if (nowBkto != inputBkto) {
    if (!Fsys.existance(inputBkto)) {
      if (!Fsys.mkdir(inputBkto)) {
        eMsg.push('bk先フォルダ');
      } else {
        cfDict['bkto'] = inputBkto;
        updFlg = true;
      }
    } else {
      cfDict['bkto'] = inputBkto;
      updFlg = true;
    }
  }
  if (nowBkheader != inputBkheader) {
    cfDict['bkheader'] = inputBkheader;
    updFlg = true;
  }
  if (nowSendto != inputSendto) {
    if (!Fsys.existance(inputSendto)) {
      if (!Fsys.mkdir(inputSendto)) {
        eMsg.push('転送先フォルダ');
      } else {
        cfDict['sendto'] = inputSendto;
        updFlg = true;
      }
    } else {
      cfDict['sendto'] = inputSendto;
      updFlg = true;
    }
  }
  if (eMsg.length != 0) {
    document.querySelector('#title').innerHTML = `${eMsg.join(',')}作成に失敗しました。`
    return;
  }
  if (updFlg) {
    Fsys.write(`${chdir}\\src\\config.json`, JSON.stringify(cfDict));
  }
  Forge.load('contents', 'home', () => {
    document.querySelector('#console').innerHTML = '設定完了';
  });
};

// キャンセルボタン
document.querySelector('#setting-back').onclick = () => {
  document.querySelectorAll('.btn').forEach(v => {
    v.style.top = "0";
  });
  Forge.load('contents', 'home');
};
