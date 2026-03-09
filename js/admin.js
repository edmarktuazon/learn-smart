const ADMIN_USER = "admin";
const ADMIN_PASS = "learnsmart2026";

function doLogin() {
  const u = document.getElementById("login-user").value.trim();
  const p = document.getElementById("login-pass").value.trim();
  if (u === ADMIN_USER && p === ADMIN_PASS) {
    document.getElementById("login-gate").style.display = "none";
    document.getElementById("admin-app").style.display = "block";
    renderAll();
  } else {
    document.getElementById("login-err").style.display = "block";
  }
}

document.addEventListener("keydown", (e) => {
  if (
    e.key === "Enter" &&
    document.getElementById("login-gate").style.display !== "none"
  )
    doLogin();
});

function doLogout() {
  document.getElementById("admin-app").style.display = "none";
  document.getElementById("login-gate").style.display = "flex";
  document.getElementById("login-pass").value = "";
  document.getElementById("login-err").style.display = "none";
}

const QUIZZES_META = [
  {
    id: "quiz1",
    title: "Weathering and Erosion",
    defaultCode: "WEATHER2026",
    questions: 23,
  },
  {
    id: "quiz2",
    title: "Cell Structures and Functions",
    defaultCode: "CELL2026",
    questions: 26,
  },
  {
    id: "quiz3",
    title: "Rocks and the Rock Cycle",
    defaultCode: "ROCKS2026",
    questions: 25,
  },
  {
    id: "quiz4",
    title: "Earth's Layers",
    defaultCode: "EARTH2026",
    questions: 25,
  },
];

function getQuizState(id) {
  const raw = localStorage.getItem("ls_quiz_" + id);
  if (raw) return JSON.parse(raw);
  const meta = QUIZZES_META.find((q) => q.id === id);
  return {
    id,
    status: "locked",
    code: meta.defaultCode,
    paused: false,
    currentQuestion: 0,
  };
}

function saveQuizState(id, patch) {
  const current = getQuizState(id);
  // Only store status, code, paused, currentQuestion — NEVER questions
  const updated = {
    id,
    status: patch.status !== undefined ? patch.status : current.status,
    code: patch.code !== undefined ? patch.code : current.code,
    paused: patch.paused !== undefined ? patch.paused : current.paused || false,
    currentQuestion:
      patch.currentQuestion !== undefined
        ? patch.currentQuestion
        : current.currentQuestion || 0,
  };
  localStorage.setItem("ls_quiz_" + id, JSON.stringify(updated));
}

function renderAll() {
  renderStats();
  renderQuizControls();
  renderLeaderboards();
  renderDiscussion();
}

function renderStats() {
  let openCount = 0;
  let playerCount = 0;
  QUIZZES_META.forEach((m) => {
    const s = getQuizState(m.id);
    if (s.status === "open") openCount++;
    const lb = JSON.parse(localStorage.getItem("ls_lb_" + m.id)) || [];
    playerCount += lb.length;
  });
  const posts = JSON.parse(localStorage.getItem("ls_posts")) || [];
  document.getElementById("stat-open").textContent = openCount;
  document.getElementById("stat-posts").textContent = posts.length;
  document.getElementById("stat-players").textContent = playerCount;
}

function renderQuizControls() {
  const wrap = document.getElementById("quiz-controls");
  wrap.innerHTML = "";
  QUIZZES_META.forEach((meta) => {
    const state = getQuizState(meta.id);
    const isOpen = state.status === "open";
    const isPaused = state.paused || false;

    const card = document.createElement("div");
    card.className = "quiz-card";
    card.id = "qcard-" + meta.id;
    card.innerHTML = `
      <div class="quiz-card-header">
        <div>
          <div class="quiz-card-title">${meta.title}</div>
          <div class="quiz-card-sub">${meta.questions} questions</div>
        </div>
        <span class="status-pill ${isOpen ? (isPaused ? "pill-paused" : "pill-open") : "pill-locked"}">
          ${isOpen ? (isPaused ? "⏸ PAUSED" : "🟢 OPEN") : "🔒 LOCKED"}
        </span>
      </div>
      <div class="quiz-card-body">
        <div class="field-group">
          <label>QUIZ CODE (students enter this)</label>
          <input type="text" id="code-${meta.id}" value="${state.code}" placeholder="e.g. ATOM2026" />
        </div>
        <div class="quiz-card-actions">
          ${
            isOpen
              ? `<button class="btn btn-red btn-sm" onclick="lockQuiz('${meta.id}')">🔒 Lock Quiz</button>`
              : `<button class="btn btn-green btn-sm" onclick="openQuiz('${meta.id}')">🟢 Open Quiz</button>`
          }
          ${
            isOpen
              ? isPaused
                ? `<button class="btn btn-green btn-sm" onclick="resumeQuiz('${meta.id}')">▶ Resume Quiz</button>`
                : `<button class="btn btn-yellow btn-sm" onclick="pauseQuiz('${meta.id}')">⏸ Pause Quiz</button>`
              : ""
          }
          <button class="btn btn-outline btn-sm" onclick="saveCode('${meta.id}')">💾 Save Code</button>
          <button class="btn btn-outline btn-sm" onclick="clearLB('${meta.id}')">🗑 Clear LB</button>
        </div>
      </div>
    `;
    wrap.appendChild(card);
  });
}

function openQuiz(id) {
  const code = document
    .getElementById("code-" + id)
    .value.trim()
    .toUpperCase();
  if (!code) {
    toast("⚠️ Please enter a code first.");
    return;
  }
  saveQuizState(id, {
    status: "open",
    code,
    paused: false,
    currentQuestion: 0,
  });
  toast("✅ Quiz opened! Students can now enter the code.");
  renderAll();
}

function lockQuiz(id) {
  saveQuizState(id, { status: "locked", paused: false, currentQuestion: 0 });
  toast("🔒 Quiz locked.");
  renderAll();
}

function pauseQuiz(id) {
  saveQuizState(id, { paused: true });
  toast("⏸ Quiz paused — students will see a pause overlay.");
  renderAll();
}

function resumeQuiz(id) {
  saveQuizState(id, { paused: false });
  toast("▶ Quiz resumed — students can continue.");
  renderAll();
}

function saveCode(id) {
  const code = document
    .getElementById("code-" + id)
    .value.trim()
    .toUpperCase();
  if (!code) {
    toast("⚠️ Code cannot be empty.");
    return;
  }
  saveQuizState(id, { code });
  toast("💾 Code saved: " + code);
}

function clearLB(id) {
  if (!confirm("Clear the leaderboard for this quiz?")) return;
  localStorage.removeItem("ls_lb_" + id);
  toast("🗑 Leaderboard cleared.");
  renderLeaderboards();
  renderStats();
}

function renderLeaderboards() {
  const wrap = document.getElementById("leaderboards");
  wrap.innerHTML = "";
  QUIZZES_META.forEach((meta) => {
    const lb = JSON.parse(localStorage.getItem("ls_lb_" + meta.id)) || [];
    const sec = document.createElement("div");
    sec.style.marginBottom = "28px";
    sec.innerHTML = `
      <p style="font-size:0.95rem;font-weight:600;margin-bottom:12px;color:var(--text)">${meta.title}</p>
      <div class="lb-preview">
        ${
          lb.length === 0
            ? '<div class="lb-empty">No entries yet.</div>'
            : lb
                .map(
                  (e, i) => `
            <div class="lb-row">
              <span class="lb-rank">${["🥇", "🥈", "🥉"][i] || i + 1 + "."}</span>
              <span class="lb-name">${e.name}</span>
              <span class="lb-score">${e.score}/${meta.questions} (${e.pct}%)</span>
            </div>
          `,
                )
                .join("")
        }
      </div>
    `;
    wrap.appendChild(sec);
  });
}

function renderDiscussion() {
  const posts = JSON.parse(localStorage.getItem("ls_posts")) || [];
  const wrap = document.getElementById("discussion-mod");
  if (!posts.length) {
    wrap.innerHTML =
      '<p style="color:var(--muted);font-size:0.9rem;padding:16px 0">No posts yet.</p>';
    return;
  }
  wrap.innerHTML = posts
    .map(
      (p, i) => `
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:18px 22px;margin-bottom:14px;backdrop-filter:blur(10px);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <span style="color:var(--blue-light);font-weight:600;font-size:0.9rem">Anonymous</span>
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="color:var(--muted);font-size:0.82rem">${new Date(p.time).toLocaleString("en-PH")}</span>
          <button class="btn btn-red btn-sm" onclick="deletePost(${i})">🗑 Delete</button>
        </div>
      </div>
      <p style="font-size:0.95rem;line-height:1.6">${p.message}</p>
    </div>
  `,
    )
    .join("");
}

function deletePost(i) {
  if (!confirm("Delete this post?")) return;
  let posts = JSON.parse(localStorage.getItem("ls_posts")) || [];
  posts.splice(i, 1);
  localStorage.setItem("ls_posts", JSON.stringify(posts));
  toast("🗑 Post deleted.");
  renderAll();
}

function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2800);
}

setInterval(() => {
  if (document.getElementById("admin-app").style.display !== "none")
    renderStats();
}, 15000);
