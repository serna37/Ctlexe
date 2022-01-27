// ========================================
// 起動バッチパス
// ========================================

const bat = filename => `src\\component\\logic\\bat\\${filename}.bat`;

const BAT = {
  BK_CNT_FROM: bat('bk_cnt_from'),
  BK_CNT_TO: bat('bk_cnt_to'),
  BK_CREATE_NAME: bat('bk_create_name'),
  BK_EXE: bat('bk_exe'),
  BK_WATCH_COMPRESS: bat('bk_watch_compress'),
  BK_WATCH_TRANSFAR: bat('bk_watch_transfar'),
  ENV: bat('env'),
  LINK_EXPLORER: bat('link_explorer'),
  LINK_GET_DIR: bat('link_get_dir'),
  LINK_OPEN: bat('link_open'),
  WIN_ACT: bat('win_act'),
};
export default BAT;
