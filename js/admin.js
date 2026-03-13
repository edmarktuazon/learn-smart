const SUPABASE_URL = "https://sdyncmylgvmcsqpqnsjt.supabase.co";
const SUPABASE_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkeW5jbXlsZ3ZtY3NxcHFuc2p0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzNzcxMTQsImV4cCI6MjA4ODk1MzExNH0.E7KG1mJftBI_zqHPkxr8oWGk-eVGYAJml-DF9zXBf9w";

const ADMIN_USER = "admin";
const ADMIN_PASS = "learnsmart2026";

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

let _supabase = null;
const getSupabase = () => {
  if (!_supabase && window.supabase?.createClient)
    _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
  return _supabase;
};

const syncToSupabase = (state) => {
  const sb = getSupabase();
  if (!sb) return;
  sb.from("quiz_state")
    .upsert(
      {
        quiz_id: state.id,
        status: state.status,
        code: state.code,
        paused: state.paused || false,
        current_question: state.currentQuestion || 0,
        timer_start: state.timerStart || null,
      },
      { onConflict: "quiz_id" },
    )
    .then(({ error }) => {
      if (error) console.warn("Supabase sync error:", error.message);
    });
};

const getQuizState = (id) => {
  const raw = localStorage.getItem(`ls_quiz_${id}`);
  if (raw) return JSON.parse(raw);
  const meta = QUIZZES_META.find((q) => q.id === id);
  return {
    id,
    status: "locked",
    code: meta.defaultCode,
    paused: false,
    currentQuestion: 0,
  };
};

const saveQuizState = (id, patch) => {
  const current = getQuizState(id);
  const updated = {
    id,
    status: patch.status !== undefined ? patch.status : current.status,
    code: patch.code !== undefined ? patch.code : current.code,
    paused: patch.paused !== undefined ? patch.paused : current.paused || false,
    currentQuestion:
      patch.currentQuestion !== undefined
        ? patch.currentQuestion
        : current.currentQuestion || 0,
    timerStart:
      patch.timerStart !== undefined
        ? patch.timerStart
        : current.timerStart || null,
  };
  localStorage.setItem(`ls_quiz_${id}`, JSON.stringify(updated));
  syncToSupabase(updated);
};

const syncFromSupabase = async () => {
  const sb = getSupabase();
  if (!sb) {
    ["quiz1", "quiz2", "quiz3", "quiz4"].forEach((id) =>
      localStorage.removeItem(`ls_quiz_${id}`),
    );
    return;
  }
  const { data } = await sb
    .from("quiz_state")
    .select("quiz_id,status,code,paused,current_question");
  if (!data) return;
  data.forEach((row) => {
    localStorage.setItem(
      `ls_quiz_${row.quiz_id}`,
      JSON.stringify({
        id: row.quiz_id,
        status: row.status,
        code: row.code,
        paused: row.paused,
        currentQuestion: row.current_question || 0,
      }),
    );
  });
};

const doLogin = () => {
  const u = document.getElementById("login-user").value.trim();
  const p = document.getElementById("login-pass").value.trim();
  if (u === ADMIN_USER && p === ADMIN_PASS) {
    document.getElementById("login-gate").style.display = "none";
    document.getElementById("admin-app").style.display = "block";
    syncFromSupabase().then(() => {
      renderAll();
      startRealtimeSubscription();
    });
  } else {
    document.getElementById("login-err").style.display = "block";
  }
};

document.addEventListener("keydown", (e) => {
  if (
    e.key === "Enter" &&
    document.getElementById("login-gate").style.display !== "none"
  )
    doLogin();
});

const doLogout = () => {
  document.getElementById("admin-app").style.display = "none";
  document.getElementById("login-gate").style.display = "flex";
  document.getElementById("login-pass").value = "";
  document.getElementById("login-err").style.display = "none";
};

const renderAll = () => {
  renderStats();
  renderQuizControls();
  renderLeaderboards();
  renderDiscussion();
};

const renderStats = async () => {
  let openCount = 0;
  QUIZZES_META.forEach((m) => {
    if (getQuizState(m.id).status === "open") openCount++;
  });
  document.getElementById("stat-open").textContent = openCount;

  const sb2 = getSupabase();
  if (sb2) {
    const { count: postCount } = await sb2
      .from("discussion_posts")
      .select("*", { count: "exact", head: true });
    document.getElementById("stat-posts").textContent = postCount || 0;
  } else {
    document.getElementById("stat-posts").textContent = 0;
  }

  const sb = getSupabase();
  if (sb) {
    const { count } = await sb
      .from("leaderboard")
      .select("*", { count: "exact", head: true });
    document.getElementById("stat-players").textContent = count || 0;
  } else {
    const total = QUIZZES_META.reduce((acc, m) => {
      return (
        acc + (JSON.parse(localStorage.getItem(`ls_lb_${m.id}`)) || []).length
      );
    }, 0);
    document.getElementById("stat-players").textContent = total;
  }
};

const renderQuizControls = () => {
  const wrap = document.getElementById("quiz-controls");
  wrap.innerHTML = "";
  QUIZZES_META.forEach((meta) => {
    const state = getQuizState(meta.id);
    const isOpen = state.status === "open";
    const isPaused = state.paused || false;

    const card = document.createElement("div");
    card.className = "quiz-card";
    card.id = `qcard-${meta.id}`;
    card.innerHTML = `
      <div class="quiz-card-header">
        <div>
          <div class="quiz-card-title">${meta.title}</div>
          <div class="quiz-card-sub">${meta.questions} questions</div>
        </div>
        <span class="status-pill ${isOpen ? (isPaused ? "pill-paused" : "pill-open") : "pill-locked"}">
          ${isOpen ? (isPaused ? "PAUSED" : "OPEN") : "LOCKED"}
        </span>
      </div>
      <div class="quiz-card-body">
        <div class="field-group">
          <label>QUIZ CODE (students enter this)</label>
          <input type="text" id="code-${meta.id}" value="${state.code}" placeholder="e.g. WEATHER2026" />
        </div>
        <div class="quiz-card-actions">
          ${
            isOpen
              ? `<button class="btn btn-red btn-sm"    onclick="lockQuiz('${meta.id}')">Lock Quiz</button>`
              : `<button class="btn btn-green btn-sm"  onclick="openQuiz('${meta.id}')">Open Quiz</button>`
          }
          ${
            isOpen
              ? isPaused
                ? `<button class="btn btn-green btn-sm"  onclick="resumeQuiz('${meta.id}')">Resume Quiz</button>`
                : `<button class="btn btn-yellow btn-sm" onclick="pauseQuiz('${meta.id}')">Pause Quiz</button>`
              : ""
          }
          <button class="btn btn-outline btn-sm" onclick="saveCode('${meta.id}')">Save Code</button>
          <button class="btn btn-outline btn-sm" onclick="clearLB('${meta.id}')">Clear LB</button>
        </div>
      </div>
    `;
    wrap.appendChild(card);
  });
};

const openQuiz = (id) => {
  const code = document.getElementById(`code-${id}`).value.trim().toUpperCase();
  if (!code) {
    toast("Please enter a code first.");
    return;
  }
  saveQuizState(id, {
    status: "open",
    code,
    paused: false,
    currentQuestion: 0,
    timerStart: new Date().toISOString(),
  });
  toast("Quiz opened. Students can now enter the code.");
  renderAll();
};

const lockQuiz = (id) => {
  const state = getQuizState(id);
  const msg =
    state.status === "open"
      ? "Students may still be taking this quiz.\n\nLocking will end the session for everyone.\n\nContinue?"
      : "Lock this quiz?";
  if (!confirm(msg)) return;
  saveQuizState(id, { status: "locked", paused: false, currentQuestion: 0 });
  toast("Quiz locked.");
  renderAll();
};

const pauseQuiz = (id) => {
  saveQuizState(id, { paused: true });
  toast("Quiz paused.");
  renderAll();
};

const resumeQuiz = (id) => {
  saveQuizState(id, { paused: false, timerStart: new Date().toISOString() });
  toast("Quiz resumed.");
  renderAll();
};

const saveCode = (id) => {
  const code = document.getElementById(`code-${id}`).value.trim().toUpperCase();
  if (!code) {
    toast("Code cannot be empty.");
    return;
  }
  saveQuizState(id, { code });
  toast(`Code saved: ${code}`);
};

const clearLB = async (id) => {
  if (!confirm("Clear the leaderboard for this quiz?")) return;
  localStorage.removeItem(`ls_lb_${id}`);
  const sb = getSupabase();
  if (sb) {
    const { error } = await sb.from("leaderboard").delete().eq("quiz_id", id);
    if (error) console.warn("Clear LB error:", error.message);
  }
  toast("Leaderboard cleared.");
  renderLeaderboards();
  renderStats();
};

const renderLeaderboards = async () => {
  const wrap = document.getElementById("leaderboards");
  wrap.innerHTML =
    "<p style='color:var(--muted);font-size:0.85rem;padding:8px 0'>Loading...</p>";

  const sb = getSupabase();
  let sbData = null;
  if (sb) {
    const { data } = await sb
      .from("leaderboard")
      .select("quiz_id,player_name,score,total,pct")
      .order("score", { ascending: false });
    sbData = data;
  }

  wrap.innerHTML = "";
  QUIZZES_META.forEach((meta) => {
    let lb = [];
    if (sbData) {
      const seen = new Set();
      for (const r of sbData.filter((r) => r.quiz_id === meta.id)) {
        if (!seen.has(r.player_name)) {
          seen.add(r.player_name);
          lb.push({ name: r.player_name, score: r.score, pct: r.pct });
        }
        if (lb.length >= 3) break;
      }
    } else {
      lb = JSON.parse(localStorage.getItem(`ls_lb_${meta.id}`)) || [];
    }

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
              <span class="lb-rank">${["", "", ""][i] || `${i + 1}.`}</span>
              <span class="lb-name">${e.name}</span>
              <span class="lb-score">${e.score}/${meta.questions} (${e.pct}%)</span>
            </div>`,
                )
                .join("")
        }
      </div>
    `;
    wrap.appendChild(sec);
  });
};

const renderDiscussion = async () => {
  const wrap = document.getElementById("discussion-mod");
  wrap.innerHTML =
    "<p style='color:var(--muted);font-size:0.85rem;padding:8px 0'>Loading...</p>";
  const sb = getSupabase();
  if (!sb) {
    wrap.innerHTML =
      '<p style="color:var(--muted);font-size:0.9rem;padding:16px 0">No connection.</p>';
    return;
  }
  const { data } = await sb
    .from("discussion_posts")
    .select("id,message,created_at")
    .order("created_at", { ascending: false });
  if (!data || !data.length) {
    wrap.innerHTML =
      '<p style="color:var(--muted);font-size:0.9rem;padding:16px 0">No posts yet.</p>';
    return;
  }
  wrap.innerHTML = data
    .map(
      (p) => `
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:18px 22px;margin-bottom:14px;backdrop-filter:blur(10px);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <span style="color:var(--blue-light);font-weight:600;font-size:0.9rem">Anonymous</span>
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="color:var(--muted);font-size:0.82rem">${new Date(p.created_at).toLocaleString("en-PH")}</span>
          <button class="btn btn-red btn-sm" onclick="deletePost(${p.id})">Delete</button>
        </div>
      </div>
      <p style="font-size:0.95rem;line-height:1.6">${p.message}</p>
    </div>
  `,
    )
    .join("");
};

const deletePost = async (id) => {
  if (!confirm("Delete this post?")) return;
  const sb = getSupabase();
  if (sb) {
    const { error } = await sb.from("discussion_posts").delete().eq("id", id);
    if (error) {
      console.warn("Delete post error:", error.message);
      return;
    }
  }
  toast("Post deleted.");
  renderDiscussion();
  renderStats();
};

const toast = (msg) => {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2800);
};

let _realtimeChannel = null;

const startRealtimeSubscription = () => {
  const sb = getSupabase();
  if (!sb) return;

  // Clean up existing channel if any
  if (_realtimeChannel) sb.removeChannel(_realtimeChannel);

  _realtimeChannel = sb
    .channel("admin-live")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "discussion_posts" },
      () => {
        renderDiscussion();
        renderStats();
      },
    )
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "leaderboard" },
      () => {
        renderLeaderboards();
        renderStats();
      },
    )
    .subscribe();
};

setInterval(() => {
  if (document.getElementById("admin-app").style.display !== "none")
    renderStats();
}, 15000);
