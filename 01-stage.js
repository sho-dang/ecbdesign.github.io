/* Encounter Coffee Beans — ヒーローの拡縮制御（読み込み前に即実行） */
/* ── ステージを画面幅に合わせて縮小（読み込み前に即実行） ── */
function fitStage(){
  const stage = document.getElementById("stage");
  if (!stage) return;
  const vw = document.documentElement.clientWidth;   // スクロールバーを除いた幅
  const sidebar = vw >= 900 ? 240 : 0;               // PCは左サイドバー分を除く
  const avail = vw - sidebar;
  const pad = Math.max(16, avail * 0.04) + 16;
  const s = Math.min(1, (avail - pad) / 530);
  stage.style.transform = "scale(" + s + ")";
  stage.parentElement.style.height = (480 * s) + "px";
}
fitStage();
window.addEventListener("resize", fitStage);
window.addEventListener("orientationchange", fitStage);

