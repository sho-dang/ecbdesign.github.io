/* Encounter Coffee Beans — 本のめくり制御・サイドメニュー開閉 */
window.addEventListener("load", function(){
  fitStage();

  /* ── 本のメニュー初期化 ── */
  const hint = document.querySelector(".hint");
  if (typeof St === "undefined"){
    hint.textContent = "⚠ ライブラリの読み込みに失敗しました。接続を確認して再読み込みしてください。";
  } else {
    try{
      const pageFlip = new St.PageFlip(document.getElementById("book"), {
        width: 340,
        height: 460,
        size: "fixed",
        showCover: true,
        maxShadowOpacity: .4,
        mobileScrollSupport: false,
        showPageCorners: false,     /* ホバーでの角めくり・影を無効化 */
        flippingTime: 800
      });
      pageFlip.loadFromHTML(document.querySelectorAll(".page"));
      document.getElementById("total").textContent = pageFlip.getPageCount();
      pageFlip.on("flip", e => {
        document.getElementById("current").textContent = e.data + 1;
        updateNav(e.data);
      });
      /* 連打ガード：めくりアニメーション中は次の命令を受け付けない
         （アニメ中の割り込みが表示崩れ＝ズーム状態の原因になるため） */
      let flipLock = false;
      let lockTimer = null;
      function acquireLock(){
        if (flipLock) return false;
        flipLock = true;
        clearTimeout(lockTimer);
        lockTimer = setTimeout(() => { flipLock = false; }, 1000); // 保険の自動解除
        return true;
      }
      pageFlip.on("changeState", (e) => {
        if (e.data === "read"){            // アニメ完了＝待機状態に戻ったら解除
          flipLock = false;
          clearTimeout(lockTimer);
        }
      });
      function goPrev(){
        if (!acquireLock()) return;
        try{ pageFlip.flipPrev(); }
        catch(e){ try{ pageFlip.turnToPrevPage(); }catch(e2){} }
      }
      function goNext(){
        if (!acquireLock()) return;
        try{ pageFlip.flipNext(); }
        catch(e){ try{ pageFlip.turnToNextPage(); }catch(e2){} }
      }
      const prevBtn = document.getElementById("prev");
      const nextBtn = document.getElementById("next");
      const tapPrevBtn = document.getElementById("tapPrev");
      const tapNextBtn = document.getElementById("tapNext");
      prevBtn.addEventListener("click", goPrev);
      nextBtn.addEventListener("click", goNext);
      tapPrevBtn.addEventListener("click", goPrev);
      tapNextBtn.addEventListener("click", goNext);

      /* 始端・終端では該当ボタンを無効化 */
      function updateNav(idx){
        const last = pageFlip.getPageCount() - 1;
        const atStart = idx <= 0;
        const atEnd   = idx >= last;
        prevBtn.disabled = atStart; tapPrevBtn.disabled = atStart;
        nextBtn.disabled = atEnd;   tapNextBtn.disabled = atEnd;
      }
      updateNav(0);

      /* ピンチズーム等で表示倍率が変わった際、本の内部座標を再計算
         （これをしないとズーム後のめくり動作が崩れる） */
      function refreshBook(){
        try{
          updateNav(pageFlip.getCurrentPageIndex());
        }catch(e){ /* 未対応環境では何もしない */ }
      }
      let zoomTimer = null;
      function scheduleRefresh(){
        clearTimeout(zoomTimer);
        zoomTimer = setTimeout(refreshBook, 250);   // 操作が落ち着いてから実行
      }
      if (window.visualViewport){
        window.visualViewport.addEventListener("resize", scheduleRefresh);
        window.visualViewport.addEventListener("scroll", scheduleRefresh);
      }
      window.addEventListener("resize", scheduleRefresh);
      window.addEventListener("orientationchange", scheduleRefresh);

      /* 目次リンク：指定ページへめくって移動（連打ガード共用） */
      document.querySelectorAll(".toc-link").forEach(a => {
        a.addEventListener("click", (ev) => {
          ev.preventDefault();
          const n = parseInt(a.dataset.page, 10);
          if (!acquireLock()) return;
          try{ pageFlip.flip(n); }
          catch(e){ try{ pageFlip.turnToPage(n); }catch(e2){} }
        });
      });
    }catch(err){
      hint.textContent = "⚠ 初期化エラー: " + err.message;
      console.error(err);
    }
  }

  /* ── サイドメニュー開閉 ── */
  const toggle  = document.getElementById("menuToggle");
  const menu    = document.getElementById("sideMenu");
  const overlay = document.getElementById("overlay");
  const mtLabel = toggle.querySelector(".mt-label");
  function setMenu(open){
    menu.classList.toggle("open", open);
    overlay.classList.toggle("show", open);
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    mtLabel.textContent = open ? "CLOSE" : "MENU";
  }
  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  overlay.addEventListener("click", () => setMenu(false));
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
});