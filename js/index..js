function toggleVideo(header) {
  const card = header.closest(".video-card");
  const body = card.querySelector(".video-card-body");
  const chevron = header.querySelector(".video-chevron");
  const isOpen = body.classList.contains("open");

  document.querySelectorAll(".video-card-body.open").forEach((b) => {
    const vid = b.querySelector("video");
    if (vid) vid.pause();
    b.classList.remove("open");
  });
  document
    .querySelectorAll(".video-chevron.open")
    .forEach((c) => c.classList.remove("open"));

  if (!isOpen) {
    body.classList.add("open");
    chevron.classList.add("open");
    setTimeout(
      () => card.scrollIntoView({ behavior: "smooth", block: "start" }),
      100,
    );
  }
}

function toggleLesson(header) {
  const card = header.closest(".lesson-card");
  const body = card.querySelector(".lesson-card-body");
  const chevron = header.querySelector(".lesson-chevron");
  const isOpen = body.classList.contains("open");

  document
    .querySelectorAll(".lesson-card-body.open")
    .forEach((b) => b.classList.remove("open"));
  document
    .querySelectorAll(".lesson-chevron.open")
    .forEach((c) => c.classList.remove("open"));

  if (!isOpen) {
    body.classList.add("open");
    chevron.classList.add("open");
    setTimeout(
      () => card.scrollIntoView({ behavior: "smooth", block: "start" }),
      100,
    );
  }
}

const EMOJIS = [
  "⚛",
  "🔬",
  "🧪",
  "🧬",
  "🌡",
  "💡",
  "🔭",
  "🌊",
  "⚡",
  "🧲",
  "🌿",
  "🦠",
];
const container = document.getElementById("particles");
for (let i = 0; i < 18; i++) {
  const p = document.createElement("div");
  p.className = "particle";
  p.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  p.style.left = Math.random() * 100 + "vw";
  p.style.animationDuration = 18 + Math.random() * 22 + "s";
  p.style.animationDelay = Math.random() * 20 + "s";
  p.style.fontSize = 1.1 + Math.random() * 1.2 + "rem";
  container.appendChild(p);
}

function enterApp(tab) {
  document.getElementById("landing").style.display = "none";
  document.getElementById("app").style.display = "block";
  switchTab(tab);
}

function switchTab(tabId) {
  document
    .querySelectorAll(".tab-panel")
    .forEach((p) => p.classList.remove("active"));
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
  document.querySelector(`[data-tab="${tabId}"]`).classList.add("active");
  if (tabId === "quiz") renderQuizList();
}

const DEFAULT_QUIZZES = [
  {
    id: "quiz1",
    title: "Weathering and Erosion",
    code: "WEATHER2026",
    status: "locked",
    questions: [
      {
        q: "Which process breaks rocks into smaller fragments at a specific location?",
        o: ["Deposition", "Weathering", "Erosion", "Transportation"],
        a: 1,
      },
      {
        q: "Which agent of erosion moves sand and fine particles?",
        o: ["Water", "Wind", "Ice", "Gravity"],
        a: 1,
      },
      {
        q: "Which type of weathering occurs when rocks undergo chemical alterations due to contact with water, oxygen, and acids?",
        o: [
          "Mechanical (Physical) Weathering",
          "Biological Weathering",
          "Chemical Weathering",
          "Organic Weathering",
        ],
        a: 2,
      },
      {
        q: "What process moves weathered materials from one site to another?",
        o: ["Weathering", "Deposition", "Erosion", "Fragmentation"],
        a: 2,
      },
      {
        q: "Which process causes materials to settle in a new location after being transported?",
        o: ["Weathering", "Erosion", "Deposition", "Expansion"],
        a: 2,
      },
      {
        q: "Which of the following is an example of biological weathering?",
        o: [
          "Ice wedging",
          "Tree roots invading cracks",
          "Pressure release",
          "Temperature changes",
        ],
        a: 1,
      },
      {
        q: "What do weathering and erosion create that scientists observe in the present day?",
        o: ["Volcanoes", "Soil and various landforms", "Clouds", "Lightning"],
        a: 1,
      },
      {
        q: "Which agent of erosion includes rivers, rainfall, and ocean waves?",
        o: ["Wind", "Water", "Ice", "Gravity"],
        a: 1,
      },
      {
        q: "Which process breaks rocks into smaller pieces without changing their chemical composition?",
        o: [
          "Chemical Weathering",
          "Biological Weathering",
          "Mechanical (Physical) Weathering",
          "Organic Weathering",
        ],
        a: 2,
      },
      {
        q: "Which activity by living organisms can cause biological weathering?",
        o: [
          "River flow",
          "Burrowing by animals",
          "Ocean waves",
          "Glacial movement",
        ],
        a: 1,
      },
      {
        q: "Which process is responsible for transporting broken rock materials?",
        o: ["Weathering", "Erosion", "Deposition", "Oxidation"],
        a: 1,
      },
      {
        q: "What is an example of chemical weathering mentioned in the lesson?",
        o: [
          "Ice wedging",
          "Pressure release",
          "Acid rain reacting with limestone",
          "Burrowing animals",
        ],
        a: 2,
      },
      {
        q: "Which agent of erosion involves glaciers that scrape and carry rocks?",
        o: ["Ice", "Wind", "Water", "Gravity"],
        a: 0,
      },
      {
        q: "Which of the following is an example of deposition?",
        o: ["Sand dunes", "Pressure release", "Oxidation", "Ice wedging"],
        a: 0,
      },
      {
        q: "What natural process involves rocks dividing into smaller fragments?",
        o: ["Weathering", "Deposition", "Condensation", "Evaporation"],
        a: 0,
      },
      {
        q: "Which agent of erosion can cause landslides and rockfalls?",
        o: ["Water", "Wind", "Gravity", "Ice"],
        a: 2,
      },
      {
        q: "What type of weathering can occur through temperature changes, ice wedging, and pressure release?",
        o: [
          "Chemical Weathering",
          "Biological Weathering",
          "Mechanical (Physical) Weathering",
          "Organic Weathering",
        ],
        a: 2,
      },
      {
        q: "Which process happens after erosion moves materials and they settle in a new place?",
        o: ["Weathering", "Deposition", "Oxidation", "Fragmentation"],
        a: 1,
      },
      {
        q: "Which living activity can cause disruption that leads to weathering?",
        o: ["Microorganisms", "Ocean waves", "Rainfall", "Wind movement"],
        a: 0,
      },
      {
        q: "Which process causes rock to disintegrate while another transports the broken material?",
        o: [
          "Weathering and erosion",
          "Erosion and deposition",
          "Deposition and weathering",
          "Gravity and wind",
        ],
        a: 0,
      },
      {
        q: "Which of the following is listed as an example of deposition landforms?",
        o: [
          "Sand dunes",
          "Ice wedging",
          "Pressure release",
          "Burrowing animals",
        ],
        a: 0,
      },
      {
        q: "What natural processes work together to transform the Earth's surface?",
        o: [
          "Condensation, evaporation, and precipitation",
          "Weathering, erosion, and deposition",
          "Melting, freezing, and heating",
          "Pressure, heat, and cooling",
        ],
        a: 1,
      },
      {
        q: "Over what kind of time period do weathering and erosion operate to modify natural features?",
        o: [
          "Short periods",
          "Extended periods",
          "Instant changes",
          "One season",
        ],
        a: 1,
      },
    ],
  },
  {
    id: "quiz2",
    title: "Cell Structures and Functions",
    code: "CELL2026",
    status: "locked",
    questions: [
      {
        q: "Which principle of the Cell Theory states that new cells come from existing cells?",
        o: [
          "The cell serves as the fundamental component that establishes both structure and function",
          "All living things are made of cells",
          "All cells originate from cells that already exist",
          "Cells perform essential life processes",
        ],
        a: 2,
      },
      {
        q: "Which organelle is known as the cell's main energy generation center?",
        o: ["Ribosomes", "Mitochondria", "Golgi Apparatus", "Lysosomes"],
        a: 1,
      },
      {
        q: "Which type of cell lacks a developed nucleus?",
        o: [
          "Eukaryotic Cells",
          "Plant Cells",
          "Animal Cells",
          "Prokaryotic Cells",
        ],
        a: 3,
      },
      {
        q: "Which part of the cell is described as a jelly-like material that maintains organelles in their locations?",
        o: ["Cytoplasm", "Cell membrane", "Nucleus", "Vacuole"],
        a: 0,
      },
      {
        q: "Which organelle modifies, packages, and distributes proteins?",
        o: ["Lysosome", "Golgi Apparatus", "Ribosome", "Mitochondria"],
        a: 1,
      },
      {
        q: "Which organelle contains digestive enzymes that break down waste materials and old organelles?",
        o: ["Vacuole", "Lysosome", "Ribosome", "Chloroplast"],
        a: 1,
      },
      {
        q: "Which structure controls which substances can enter or exit the cell?",
        o: ["Cytoplasm", "Cell membrane", "Cell wall", "Nucleus"],
        a: 1,
      },
      {
        q: "Which organelle is the site of photosynthesis?",
        o: ["Mitochondria", "Chloroplast", "Ribosome", "Lysosome"],
        a: 1,
      },
      {
        q: "Which cell type contains membrane-enclosed organelles and a complete nucleus structure?",
        o: [
          "Prokaryotic Cells",
          "Bacterial Cells",
          "Eukaryotic Cells",
          "Unicellular Cells",
        ],
        a: 2,
      },
      {
        q: "Which structure provides support and protection and forms a rigid outer layer in plant cells?",
        o: ["Cell membrane", "Cell wall", "Cytoplasm", "Golgi Apparatus"],
        a: 1,
      },
      {
        q: "Which structure stores DNA that contains genetic material?",
        o: ["Ribosome", "Nucleus", "Cytoplasm", "Mitochondria"],
        a: 1,
      },
      {
        q: "Which organelle helps in protein production and transport and has ribosomes attached?",
        o: [
          "Smooth Endoplasmic Reticulum",
          "Rough Endoplasmic Reticulum",
          "Golgi Apparatus",
          "Lysosome",
        ],
        a: 1,
      },
      {
        q: "Which organelle produces lipids and detoxifies chemicals?",
        o: ["Rough ER", "Ribosome", "Smooth ER", "Mitochondria"],
        a: 2,
      },
      {
        q: "Which organelle functions as the machinery that creates proteins?",
        o: ["Ribosomes", "Lysosomes", "Vacuoles", "Chloroplasts"],
        a: 0,
      },
      {
        q: "Which structure is described as the main control center for cellular activities and reproduction?",
        o: ["Nucleus", "Cytoplasm", "Cell membrane", "Ribosome"],
        a: 0,
      },
      {
        q: "Which of the following is an example of a multicellular organism mentioned in the lesson?",
        o: ["Bacteria", "Humans", "Microorganisms", "Ribosomes"],
        a: 1,
      },
      {
        q: "Which type of organism exists as a unicellular life form according to the lesson?",
        o: ["Humans", "Plants", "Animals", "Bacteria"],
        a: 3,
      },
      {
        q: "Which function of cells involves creating proteins for the body?",
        o: [
          "Waste removal",
          "Energy production",
          "Protein synthesis",
          "Response to stimuli",
        ],
        a: 2,
      },
      {
        q: "Which type of vacuole is commonly found in plant cells?",
        o: [
          "Small vacuole",
          "Multiple vacuoles",
          "Large central vacuole",
          "Temporary vacuole",
        ],
        a: 2,
      },
      {
        q: "Which type of cell typically has a more rectangular shape?",
        o: ["Animal Cell", "Plant Cell", "Prokaryotic Cell", "Bacterial Cell"],
        a: 1,
      },
      {
        q: "Which specialized cell transmits signals in multicellular organisms?",
        o: ["Muscle cells", "Nerve cells", "Red blood cells", "Plant cells"],
        a: 1,
      },
      {
        q: "Which specialized cell is responsible for movement?",
        o: ["Nerve cells", "Muscle cells", "Red blood cells", "Ribosomes"],
        a: 1,
      },
      {
        q: "What do cells form in order to build the body's structures?",
        o: [
          "Clouds and gases",
          "Tissues, organs, and organ systems",
          "Minerals and rocks",
          "Oxygen and carbon dioxide",
        ],
        a: 1,
      },
      {
        q: "What does understanding cell structure help explain?",
        o: [
          "How rocks form",
          "How weather occurs",
          "How diseases occur and how the body functions at the microscopic level",
          "How planets move",
        ],
        a: 2,
      },
      {
        q: "Which statement is part of the Cell Theory?",
        o: [
          "Cells produce oxygen",
          "Cells are only found in animals",
          "All living things are made of cells",
          "Cells only exist in plants",
        ],
        a: 2,
      },
      {
        q: "Which structure stores water, nutrients, and waste materials?",
        o: ["Vacuole", "Lysosome", "Ribosome", "Nucleus"],
        a: 0,
      },
    ],
  },
  {
    id: "quiz3",
    title: "Rocks and the Rock Cycle",
    code: "ROCKS2026",
    status: "locked",
    questions: [
      {
        q: "What are rocks mainly composed of?",
        o: [
          "One or multiple minerals",
          "Only sand particles",
          "Pure metals",
          "Organic materials",
        ],
        a: 0,
      },
      {
        q: "Which rock type forms when magma or lava cools and solidifies?",
        o: [
          "Sedimentary rock",
          "Metamorphic rock",
          "Igneous rock",
          "Fossil rock",
        ],
        a: 2,
      },
      {
        q: "Which rock type forms from sediments such as sand, mud, and shells that are compressed and naturally bound over time?",
        o: [
          "Igneous rock",
          "Sedimentary rock",
          "Metamorphic rock",
          "Magmatic rock",
        ],
        a: 1,
      },
      {
        q: "Which rock type forms when existing rocks are transformed by extreme heat and high pressure?",
        o: [
          "Sedimentary rock",
          "Igneous rock",
          "Metamorphic rock",
          "Intrusive rock",
        ],
        a: 2,
      },
      {
        q: "Which of the following is an example of an igneous rock?",
        o: ["Sandstone", "Granite", "Marble", "Shale"],
        a: 1,
      },
      {
        q: "What process transforms magma into igneous rock?",
        o: [
          "Weathering and erosion",
          "Compaction and cementation",
          "Cooling and solidification",
          "Heat and pressure",
        ],
        a: 2,
      },
      {
        q: "Which type of igneous rock forms inside the Earth when magma cools slowly?",
        o: [
          "Extrusive igneous",
          "Sedimentary igneous",
          "Intrusive igneous",
          "Surface igneous",
        ],
        a: 2,
      },
      {
        q: "Which type of igneous rock forms on the Earth's surface when lava cools rapidly?",
        o: [
          "Intrusive igneous",
          "Extrusive igneous",
          "Metamorphic igneous",
          "Layered igneous",
        ],
        a: 1,
      },
      {
        q: "Which rock feature refers to the distinct layers commonly found in sedimentary formations?",
        o: ["Fossils", "Crystals", "Strata", "Magma"],
        a: 2,
      },
      {
        q: "What may be discovered within geological strata according to the lesson?",
        o: ["Lava", "Fossils", "Metals", "Water"],
        a: 1,
      },
      {
        q: "Which of the following is an example of a sedimentary rock?",
        o: ["Basalt", "Granite", "Sandstone", "Marble"],
        a: 2,
      },
      {
        q: "Which metamorphic rock forms from limestone?",
        o: ["Quartzite", "Marble", "Slate", "Basalt"],
        a: 1,
      },
      {
        q: "Which metamorphic rock forms from shale?",
        o: ["Marble", "Quartzite", "Slate", "Granite"],
        a: 2,
      },
      {
        q: "Which metamorphic rock forms from sandstone?",
        o: ["Quartzite", "Marble", "Basalt", "Shale"],
        a: 0,
      },
      {
        q: "What process breaks rocks into sediments in the rock cycle?",
        o: [
          "Melting",
          "Heat and pressure",
          "Weathering and erosion",
          "Cooling and solidification",
        ],
        a: 2,
      },
      {
        q: "What process creates sedimentary rock from sediments?",
        o: [
          "Cooling and solidification",
          "Compaction and cementation",
          "Melting",
          "Weathering",
        ],
        a: 1,
      },
      {
        q: "Which process transforms sedimentary or igneous rocks into metamorphic rocks?",
        o: [
          "Heat and pressure",
          "Cooling and solidification",
          "Compaction and cementation",
          "Weathering",
        ],
        a: 0,
      },
      {
        q: "What can happen to any type of rock during the melting process?",
        o: [
          "It turns into sand",
          "It turns into magma",
          "It turns into sediment",
          "It becomes fossils",
        ],
        a: 1,
      },
      {
        q: "What is the rock cycle?",
        o: [
          "A short process that creates rocks instantly",
          "A perpetual system where rocks transform into different types over time",
          "A process where rocks only break into smaller pieces",
          "A system that only forms igneous rocks",
        ],
        a: 1,
      },
      {
        q: "What does the Earth's crust mainly consist of according to the lesson?",
        o: [
          "Three primary rock classifications",
          "Only sedimentary rocks",
          "Only igneous rocks",
          "Only metamorphic rocks",
        ],
        a: 0,
      },
      {
        q: "Which process in the rock cycle converts rocks into sediment particles?",
        o: [
          "Compaction and cementation",
          "Cooling and solidification",
          "Weathering and erosion",
          "Heat and pressure",
        ],
        a: 2,
      },
      {
        q: "According to the simple rock cycle flow, what forms after sediments experience compaction?",
        o: ["Igneous rock", "Sedimentary rock", "Metamorphic rock", "Magma"],
        a: 1,
      },
      {
        q: "What happens to metamorphic rock in the simple rock cycle flow?",
        o: [
          "It cools into igneous rock",
          "It melts to produce magma",
          "It forms sediments directly",
          "It turns into fossils",
        ],
        a: 1,
      },
      {
        q: "Which rock type commonly has durable characteristics and a crystalline structure?",
        o: [
          "Sedimentary rock",
          "Metamorphic rock",
          "Igneous rock",
          "Fossil rock",
        ],
        a: 2,
      },
      {
        q: "Approximately how long do rock transformation processes usually take?",
        o: [
          "Minutes to hours",
          "Days to months",
          "Thousands to millions of years",
          "One year",
        ],
        a: 2,
      },
    ],
  },
  {
    id: "quiz4",
    title: "Earth's Layers",
    code: "EARTH2026",
    status: "locked",
    questions: [
      {
        q: "Which method do scientists mainly use to study Earth's internal layers?",
        o: [
          "Satellite images",
          "Seismic waves from earthquakes",
          "Ocean currents",
          "Weather patterns",
        ],
        a: 1,
      },
      {
        q: "Which layer of the Earth is the thickest?",
        o: ["Crust", "Mantle", "Outer core", "Inner core"],
        a: 1,
      },
      {
        q: "Which layer is the outermost and thinnest layer of Earth?",
        o: ["Mantle", "Crust", "Outer core", "Inner core"],
        a: 1,
      },
      {
        q: "Which layer is completely liquid?",
        o: ["Crust", "Mantle", "Outer core", "Inner core"],
        a: 2,
      },
      {
        q: "What causes tectonic plates to move according to the lesson?",
        o: [
          "Ocean tides",
          "Convection currents in the mantle",
          "Earth's magnetic field",
          "Seismic waves",
        ],
        a: 1,
      },
      {
        q: "Which layer surrounds the inner core?",
        o: ["Crust", "Mantle", "Outer core", "Lithosphere"],
        a: 2,
      },
      {
        q: "What is the main composition of the outer core?",
        o: [
          "Liquid iron and nickel",
          "Silicate rocks",
          "Solid granite",
          "Carbon compounds",
        ],
        a: 0,
      },
      {
        q: "Which layer is the deepest and hottest layer of Earth?",
        o: ["Crust", "Mantle", "Outer core", "Inner core"],
        a: 3,
      },
      {
        q: "What creates Earth's magnetic field?",
        o: [
          "Rotation of the Earth",
          "Movement of liquid metal in the outer core",
          "Convection currents in the mantle",
          "Pressure in the crust",
        ],
        a: 1,
      },
      {
        q: "What is the approximate thickness of the crust under continents?",
        o: ["About 5 km", "About 70 km", "About 2,900 km", "About 6,000 km"],
        a: 1,
      },
      {
        q: "What type of crust is thinner but denser?",
        o: [
          "Continental crust",
          "Oceanic crust",
          "Mantle crust",
          "Inner crust",
        ],
        a: 1,
      },
      {
        q: "Which layer lies directly beneath the crust?",
        o: ["Outer core", "Mantle", "Inner core", "Lithosphere"],
        a: 1,
      },
      {
        q: "What is the main composition of the mantle?",
        o: [
          "Liquid metals",
          "Silicate rocks rich in iron and magnesium",
          "Pure iron",
          "Carbon and hydrogen",
        ],
        a: 1,
      },
      {
        q: "What allows parts of the mantle to behave like a slowly flowing material?",
        o: [
          "Ocean pressure",
          "Extreme heat",
          "Magnetic forces",
          "Earth's rotation",
        ],
        a: 1,
      },
      {
        q: "What is the temperature range near the outer core?",
        o: [
          "500°C to 1,000°C",
          "2,000°C to 3,000°C",
          "4,000°C to 5,000°C",
          "5,000°C to 6,000°C",
        ],
        a: 2,
      },
      {
        q: "Why does the inner core remain solid despite very high temperatures?",
        o: [
          "Lack of minerals",
          "Extremely high pressure",
          "Presence of water",
          "Low temperature",
        ],
        a: 1,
      },
      {
        q: "What is the approximate depth range of the outer core?",
        o: [
          "5 km to 70 km",
          "500 km to 2,000 km",
          "2,900 km to 5,150 km",
          "5,150 km to 6,371 km",
        ],
        a: 2,
      },
      {
        q: "Which layer contains tectonic plates that move slowly?",
        o: ["Crust", "Mantle", "Outer core", "Inner core"],
        a: 0,
      },
      {
        q: "Which scientific method involves analyzing how waves change speed or direction?",
        o: [
          "Studying volcanic ash",
          "Analyzing seismic waves",
          "Measuring ocean tides",
          "Observing weather systems",
        ],
        a: 1,
      },
      {
        q: "What materials are mainly found in the inner core?",
        o: [
          "Solid iron and nickel",
          "Silicate rocks",
          "Liquid magma",
          "Sand and minerals",
        ],
        a: 0,
      },
      {
        q: "What type of rocks can provide clues about materials from deep inside Earth?",
        o: [
          "Sedimentary rocks",
          "Volcanic rocks",
          "Metamorphic rocks",
          "Fossil rocks",
        ],
        a: 1,
      },
      {
        q: "What is the approximate depth of the center of the Earth?",
        o: ["2,900 km", "4,000 km", "5,150 km", "6,371 km"],
        a: 3,
      },
      {
        q: "What helps scientists simulate Earth's interior?",
        o: [
          "Computer models and laboratory experiments",
          "Ocean exploration",
          "Satellite photographs",
          "Weather balloons",
        ],
        a: 0,
      },
      {
        q: "Which layer has temperatures that may reach about 5,000°C to 6,000°C?",
        o: ["Mantle", "Crust", "Inner core", "Outer core"],
        a: 2,
      },
      {
        q: "Which Earth processes are explained by understanding Earth's layers?",
        o: [
          "Weather and climate",
          "Earthquakes, volcanoes, and plate tectonics",
          "Ocean tides and waves",
          "Cloud formation",
        ],
        a: 1,
      },
    ],
  },
];

function getQuizzes() {
  const all = [];
  DEFAULT_QUIZZES.forEach((dq) => {
    const stored = localStorage.getItem("ls_quiz_" + dq.id);
    if (stored) {
      const parsed = JSON.parse(stored);
      all.push({
        ...dq,
        status: parsed.status || dq.status,
        code: parsed.code || dq.code,
        paused: parsed.paused || false,
        currentQuestion: parsed.currentQuestion || 0,
      });
    } else {
      all.push(dq);
    }
  });
  return all;
}

let activeQuizData = null;
let currentQ = 0;
let score = 0;
let playerName = "Anonymous";

function renderQuizList() {
  const quizzes = getQuizzes();
  const list = document.getElementById("quiz-list");
  list.innerHTML = "";
  quizzes.forEach((quiz) => {
    const item = document.createElement("div");
    item.className = "quiz-item";
    const isOpen = quiz.status === "open";
    item.innerHTML = `
      <div class="quiz-item-info">
        <h4>${quiz.title}</h4>
        <p>${isOpen ? "🟢 Quiz is open — enter code to begin" : "🔒 Waiting for teacher to open this quiz"}</p>
      </div>
      <span class="quiz-badge ${isOpen ? "badge-open" : "badge-locked"}">${isOpen ? "OPEN" : "LOCKED"}</span>
    `;
    if (isOpen) {
      item.style.cursor = "pointer";
      item.addEventListener("click", () => selectQuiz(quiz));
    } else {
      item.style.cursor = "default";
      item.style.opacity = "0.6";
    }
    list.appendChild(item);
  });
}

function selectQuiz(quiz) {
  activeQuizData = quiz;
  document.getElementById("quiz-select").style.display = "none";
  document.getElementById("selected-quiz-title").textContent = quiz.title;
  document.getElementById("quiz-code-screen").style.display = "block";
}

function backToSelect() {
  document.getElementById("quiz-code-screen").style.display = "none";
  document.getElementById("quiz-select").style.display = "block";
  document.getElementById("quiz-code").value = "";
}

function checkCode() {
  const entered = document
    .getElementById("quiz-code")
    .value.trim()
    .toUpperCase();
  if (entered === activeQuizData.code.toUpperCase()) {
    document.getElementById("quiz-code-screen").style.display = "none";
    document.getElementById("quiz-username-screen").style.display = "block";
  } else {
    alert("❌ Wrong code. Ask your teacher for the correct quiz code.");
  }
}

// ── Timer ──────────────────────────────────────────
const TIMER_SECONDS = 15;
const CIRCUMFERENCE = 113.1;
let timerInterval = null;

function startTimer() {
  clearInterval(timerInterval);
  let timeLeft = TIMER_SECONDS;
  updateTimerUI(timeLeft);
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerUI(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timeExpired();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

// ── Pause polling ──────────────────────────────────
let pausePollInterval = null;
let isPaused = false;

function setOverlay(show) {
  const overlay = document.getElementById("pause-overlay");
  if (!overlay) return;
  overlay.style.display = show ? "flex" : "none";
}

function applyPauseState(paused) {
  const shouldPause = paused === true;
  if (shouldPause && !isPaused) {
    isPaused = true;
    stopTimer();
    setOverlay(true);
  } else if (!shouldPause && isPaused) {
    isPaused = false;
    setOverlay(false);
    startTimer(); // fresh 15s on resume
  }
}

function startPollPause() {
  clearInterval(pausePollInterval);
  isPaused = false;
  setOverlay(false);

  // Immediate check — don't wait 2 seconds
  const storedInit = localStorage.getItem("ls_quiz_" + activeQuizData.id);
  if (storedInit) {
    const parsedInit = JSON.parse(storedInit);
    if (parsedInit.paused === true) {
      isPaused = true;
      stopTimer();
      setOverlay(true);
    }
  }

  pausePollInterval = setInterval(() => {
    const stored = localStorage.getItem("ls_quiz_" + activeQuizData.id);
    if (!stored) return;
    const parsed = JSON.parse(stored);
    applyPauseState(parsed.paused === true);
  }, 2000);
}

function stopPollPause() {
  clearInterval(pausePollInterval);
  isPaused = false;
  setOverlay(false);
}
// ──────────────────────────────────────────────────

function updateTimerUI(t) {
  const arc = document.getElementById("timer-arc");
  const num = document.getElementById("timer-num");
  if (!arc || !num) return;
  arc.style.strokeDashoffset = CIRCUMFERENCE * (1 - t / TIMER_SECONDS);
  num.textContent = t;
  const warn = t <= 8 && t > 4;
  const danger = t <= 4;
  arc.classList.toggle("warn", warn);
  arc.classList.toggle("danger", danger);
  num.classList.toggle("warn", warn);
  num.classList.toggle("danger", danger);
}

function timeExpired() {
  const opts = document.getElementById("options");
  if (!opts) return;
  [...opts.children].forEach((b) => {
    b.disabled = true;
  });
  const q = activeQuizData.questions[currentQ];
  if (opts.children[q.a]) opts.children[q.a].classList.add("correct");
  setTimeout(() => {
    currentQ++;
    loadQuestion();
  }, 1000);
}
// ──────────────────────────────────────────────────

function beginQuiz() {
  playerName =
    document.getElementById("username-input").value.trim() || "Anonymous";
  document.getElementById("quiz-username-screen").style.display = "none";
  document.getElementById("quiz-main-screen").style.display = "block";
  // Sync to class's current question (late joiner support)
  const stored = localStorage.getItem("ls_quiz_" + activeQuizData.id);
  const classQ = stored ? JSON.parse(stored).currentQuestion || 0 : 0;
  currentQ = classQ;
  score = 0;
  setOverlay(false); // always start with overlay hidden
  loadQuestion();
  startPollPause();
}

function loadQuestion() {
  const questions = activeQuizData.questions;
  if (currentQ >= questions.length) {
    showResults();
    return;
  }
  const q = questions[currentQ];
  document.getElementById("question-text").textContent = q.q;
  document.getElementById("progress-text").textContent =
    `Question ${currentQ + 1} of ${questions.length}`;
  document.getElementById("progress-fill").style.width =
    `${((currentQ + 1) / questions.length) * 100}%`;
  document.getElementById("score-display").textContent = `Score: ${score}`;

  // Broadcast current question number so late joiners can sync
  const storedQ = localStorage.getItem("ls_quiz_" + activeQuizData.id);
  if (storedQ) {
    const parsedQ = JSON.parse(storedQ);
    parsedQ.currentQuestion = currentQ;
    localStorage.setItem(
      "ls_quiz_" + activeQuizData.id,
      JSON.stringify(parsedQ),
    );
  }

  const opts = document.getElementById("options");
  opts.innerHTML = "";
  q.o.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "opt-btn";
    btn.textContent = opt;
    btn.onclick = () => {
      stopTimer();
      [...opts.children].forEach((b) => {
        b.disabled = true;
      });
      if (i === q.a) {
        btn.classList.add("correct");
        score++;
      } else {
        btn.classList.add("wrong");
        opts.children[q.a].classList.add("correct");
      }
      setTimeout(() => {
        currentQ++;
        loadQuestion();
      }, 900);
    };
    opts.appendChild(btn);
  });

  startTimer();
}

function showResults() {
  stopTimer();
  stopPollPause();
  document.getElementById("quiz-main-screen").style.display = "none";
  document.getElementById("quiz-results-screen").style.display = "block";

  const total = activeQuizData.questions.length;
  const pct = Math.round((score / total) * 100);
  document.getElementById("final-score").textContent = score;
  document.getElementById("final-total").textContent = total;
  document.getElementById("result-pct").textContent = `${pct}% correct`;

  let emoji = "📚",
    msg = "Don't worry — practice makes perfect!";
  if (pct >= 90) {
    emoji = "🏆";
    msg = "Excellent! You're a science star!";
  } else if (pct >= 70) {
    emoji = "🌟";
    msg = "Very good! You're doing great.";
  } else if (pct >= 50) {
    emoji = "👍";
    msg = "Not bad! Review a bit more.";
  }
  document.getElementById("result-emoji").textContent = emoji;
  document.getElementById("result-msg").textContent = msg;

  const lbKey = "ls_lb_" + activeQuizData.id;
  let lb = JSON.parse(localStorage.getItem(lbKey)) || [];
  lb.push({ name: playerName, score, pct });
  lb.sort((a, b) => b.score - a.score);
  lb = lb.slice(0, 3);
  localStorage.setItem(lbKey, JSON.stringify(lb));

  const ul = document.getElementById("leaderboard");
  ul.innerHTML = lb
    .map(
      (e, i) => `
    <li class="lb-item">
      <span class="lb-rank">${["🥇", "🥈", "🥉"][i]}</span>
      <span class="lb-name">${e.name}</span>
      <span class="lb-score">${e.score}/${total} (${e.pct}%)</span>
    </li>
  `,
    )
    .join("");
}

function resetQuiz() {
  stopTimer();
  stopPollPause();
  document.getElementById("quiz-results-screen").style.display = "none";
  document.getElementById("quiz-code").value = "";
  document.getElementById("username-input").value = "";
  document.getElementById("quiz-select").style.display = "block";
  renderQuizList();
}

let posts = JSON.parse(localStorage.getItem("ls_posts")) || [];

function renderPosts() {
  const el = document.getElementById("posts-list");
  if (!posts.length) {
    el.innerHTML =
      '<p style="color:var(--muted);text-align:center;padding:20px">No posts yet. Be the first to share!</p>';
    return;
  }
  el.innerHTML = posts
    .map(
      (p, i) => `
    <div class="post">
      <div class="post-head">
        <span class="post-anon">Anonymous</span>
        <span>${new Date(p.time).toLocaleString("en-PH")}</span>
      </div>
      <p>${p.message}</p>
      <div style="text-align:right;margin-top:8px">
        <button class="del-btn" onclick="deletePost(${i})">🗑 Delete</button>
      </div>
    </div>
  `,
    )
    .join("");
}

function addPost() {
  const msg = document.getElementById("post-msg").value.trim();
  if (!msg) {
    alert("Please write something first!");
    return;
  }
  posts.unshift({ message: msg, time: Date.now() });
  localStorage.setItem("ls_posts", JSON.stringify(posts));
  document.getElementById("post-msg").value = "";
  renderPosts();
}

function deletePost(i) {
  if (!confirm("Delete this post?")) return;
  posts.splice(i, 1);
  localStorage.setItem("ls_posts", JSON.stringify(posts));
  renderPosts();
}

renderPosts();

setInterval(() => {
  const quizPanel = document.getElementById("quiz");
  if (quizPanel && quizPanel.classList.contains("active")) {
    const selectScreen = document.getElementById("quiz-select");
    if (selectScreen && selectScreen.style.display !== "none") {
      renderQuizList();
    }
  }
}, 10000);
