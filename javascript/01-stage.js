/* Encounter Coffee Beans — ヒーローの拡縮制御（読み込み前に即実行） */
/* ── ステージを画面幅に合わせて縮小（読み込み前に即実行） ── */
function fitStage(){
  const stage = document.getElementById("stage");
  if (!stage) return;

  const BASE_W = 530, BASE_H = 480;
  const PC_MIN    = 900;   // ここ以上をPC扱い（03-menu.css のサイドバー表示と同じ基準）
  const SIDEBAR   = 240;   // 左サイドバーの幅
  const PC_MARGIN = 100;   // PC時に左右へ確保する余白
  const MAX_SCALE = 1.8;   // 拡大しすぎないための上限

  const vw = document.documentElement.clientWidth;   // スクロールバーを除いた幅
  const isPC = vw >= PC_MIN;
  const avail = vw - (isPC ? SIDEBAR : 0);

  let s;
  if (isPC){
    s = (avail - PC_MARGIN * 2) / BASE_W;            // 左右100pxを残した幅に合わせる
    s = Math.min(MAX_SCALE, Math.max(0.8, s));       // 上限・下限でクランプ
  } else {
    const pad = Math.max(16, avail * 0.04) + 16;
    s = Math.min(1, (avail - pad) / BASE_W);         // スマホは縮小のみ
  }

  stage.style.transform = "scale(" + s + ")";
  stage.parentElement.style.height = (BASE_H * s) + "px";
}

fitStage();
window.addEventListener("resize", fitStage);
window.addEventListener("orientationchange", fitStage);

