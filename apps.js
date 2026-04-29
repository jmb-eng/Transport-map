// ===============================
// 🗺️ INITIAL MAP
// ===============================
console.log("APP STARTED");
console.log("MAP CONTAINER:", document.getElementById("map"));

console.log("BASE URL:", window.location.href);

const map = L.map('map').setView([14.59, 121.11], 12.5);

// ===============================
// 🧱 PANES
// ===============================
map.createPane('routesPane');
map.getPane('routesPane').style.zIndex = 400;

map.createPane('railPane');
map.getPane('railPane').style.zIndex = 500;

map.createPane('stationsPane');
map.getPane('stationsPane').style.zIndex = 600;

// ===============================
// BASE MAP
// ===============================


// CARTO (default)
const carto = L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  {
    attribution: '&copy; OpenStreetMap & CartoDB'
  }
);

// ESRI SATELLITE
const esriSat = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  {
    attribution: '&copy; Esri'
  }
);

// GOOGLE HYBRID (FIXED)
const googleHybrid = L.tileLayer(
  'https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
  {
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: '&copy; Google'
  }
);

// add default
carto.addTo(map);



// ===============================
// 🌍 BASEMAPS (SWITCHER)
// ===============================
const baseMaps = {
  "Carto Light": carto,
  "Esri Satellite": esriSat,
  "Google Hybrid": googleHybrid
};

L.control.layers(baseMaps, null, { collapsed: true }).addTo(map);


// ===============================
// SCALE
// ===============================
L.control.scale({
  position: 'bottomleft',
  metric: true,
  imperial: false
}).addTo(map);

// ===============================
// STYLE RULES (Map only)
// ===============================
const styles = {

  "Antipolo–Masinag–Sumulong": { color: "#ffc401", weight: 5, opacity: 1 },
  "Antipolo–Tikling–Ortigas–SM Megamall": { color: "#a80000", weight: 5, opacity: 1 },
  "Marcos Hwy-C5-Araneta Cubao": { color: "#0000ba", weight: 5, opacity: 1 },

  "Bike Route": { color: "#556b2f", weight: 0.8, opacity: 0.6 },
  //"Bus Route": { color: "#9e0081", weight: 1, opacity: 0.6 },

  "Intracity Routes": { color: "#81dd2b", weight: 4, opacity: 0.7 },
  "Jeepney Routes": { color: "#ff4501", weight: 1, opacity: 0.6 },

  "LRT 1 Alignment": { color: "#777777", weight: 0.5, opacity: 1 },
  "LRT 2 Alignment": { color: "#bb01ff", weight: 0.5, opacity: 1 },

  "MMSP Alignment": { color: "#000000", weight: 0.5, opacity: 1, dashArray: "2,6" },

  "MRT 3 Alignment": { color: "#6179b7", weight: 0.5, opacity: 1 },
  "MRT 4 Alignment": { color: "#12b800", weight: 0.5, opacity: 1 },
  "MRT 7 Alignment": { color: "#9a1a00", weight: 0.5, opacity: 1 },

  "PUV Routes": { color: "#d34245", weight: 3, opacity: 0.5 },

  "LRT 1 Stations": { color: "#666666" },
  "LRT 2 Stations": { color: "#560078" },
  "MRT 3 Stations": { color: "#016bff" },
  "MRT 4 Stations": { color: "#00680a" },
  "MRT 7 Stations": { color: "#ff0101" }
};

// ===============================
// 🆕 LEGEND CONFIG (FULL CONTROL HERE)
// ===============================
const legendConfig = [
  { name: "Antipolo–Tikling–Ortigas–SM Megamall", type: "line", color: "#a80000", weight: 5 },
  { name: "Antipolo–Masinag–Sumulong", type: "line", color: "#ffc401", weight: 5 },
  { name: "Marcos Hwy-C5-Araneta Cubao", type: "line", color: "#0000ba", weight: 5 },
  { name: "Intracity Routes", type: "line", color: "#81dd2b", weight: 4 },
  
  { name: "Bike Route", type: "line", color: "#556b2f", weight: 2 },
  //{ name: "Bus Route", type: "line", color: "#9e0081", weight: 2 },
  //bus route data > 25mb, not loaded in github

  { name: "Jeepney Routes", type: "line", color: "#ff4501", weight: 2 },

  { name: "PUV Routes", type: "line", color: "#d34245", weight: 3 },

  { name: "LRT 1 Alignment", type: "line", color: "#777777", weight: 2 },
  { name: "LRT 2 Alignment", type: "line", color: "#bb01ff", weight: 2 },

  { name: "MRT 3 Alignment", type: "line", color: "#6179b7", weight: 2 },
  { name: "MRT 4 Alignment", type: "line", color: "#12b800", weight: 2 },
  { name: "MRT 7 Alignment", type: "line", color: "#9a1a00", weight: 2 },

  { name: "MMSP Alignment", type: "line", color: "#000000", weight: 2, dash: true },

  { name: "LRT 1 Stations", type: "point", color: "#666666", size: 8 },
  { name: "LRT 2 Stations", type: "point", color: "#560078", size: 8 },
  { name: "MRT 3 Stations", type: "point", color: "#016bff", size: 8 },
  { name: "MRT 4 Stations", type: "point", color: "#00680a", size: 8 },
  { name: "MRT 7 Stations", type: "point", color: "#ff0101", size: 8 }
];


// ===============================
// GLOBAL STREET VIEW FUNCTION (ONLY ONE ENTRY POINT)
// ===============================
function openStreetView(lat, lng) {

  if (!lat || !lng) return;

  const url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}`;

  console.log("Opening StreetView:", url);

  window.open(url, "_blank");
}

// ===============================
// DIAMOND MARKER
// ===============================
function diamondMarker(latlng, color) {
  return L.marker(latlng, {
    pane: "stationsPane",
    icon: L.divIcon({
      className: '',
      html: `<div style="width:6px;height:6px;background:${color};transform:rotate(45deg);border:1px solid white;"></div>`
    })
  });
}


// ===============================
// LAYER CONFIG
// ===============================
const layerConfig = [
  { name: "Antipolo–Masinag–Sumulong", type: "line", url: "data/Routes/Antipolo-Masinag-Sumulong.geojson", default: true },
  { name: "Antipolo–Tikling–Ortigas–SM Megamall", type: "line", url: "data/Routes/Antipolo-Tikling-Ortigas-SmMegamall.geojson", default: true },
  { name: "Marcos Hwy-C5-Araneta Cubao", type: "line", url: "data/Routes/MarcosHwy-C5-AranetaCubao.geojson", default: true },

  { name: "Bike Route", type: "line", url: "data/Routes/Bicycle_Route.geojson" },
  //{ name: "Bus Route", type: "line", url: "data/Routes/Bus_Route.geojson" },

  { name: "Intracity Routes", type: "line", url: "data/Routes/Intracity_Routes.geojson", default: true },
  { name: "Jeepney Routes", type: "line", url: "data/Routes/Jeepney_Routes.geojson" },
  { name: "PUV Routes", type: "line", url: "data/Routes/PUV_Routes.geojson" },

  { name: "LRT 1 Alignment", type: "line", url: "data/Rail/LRT1_Alignment.geojson" },
  { name: "LRT 1 Stations", type: "point", url: "data/Rail/LRT1_Stations.geojson" },

  { name: "LRT 2 Alignment", type: "line", url: "data/Rail/LRT2_Alignment.geojson" },
  { name: "LRT 2 Stations", type: "point", url: "data/Rail/LRT2_Stations.geojson" },

  { name: "MRT 3 Alignment", type: "line", url: "data/Rail/MRT3_Alignment.geojson" },
  { name: "MRT 3 Stations", type: "point", url: "data/Rail/MRT3_Stations.geojson" },

  { name: "MRT 4 Alignment", type: "line", url: "data/Rail/MRT4_Alignment.geojson" },
  { name: "MRT 4 Stations", type: "point", url: "data/Rail/MRT4_Stations.geojson" },

  { name: "MRT 7 Alignment", type: "line", url: "data/Rail/MRT7_Alignment.geojson" },
  { name: "MRT 7 Stations", type: "point", url: "data/Rail/MRT7_Stations.geojson" },

  { name: "MMSP Alignment", type: "line", url: "data/Rail/MMSP_Alignment.geojson" }
];

// ===============================
// SAFE GEOJSON
// ===============================
function safeGeoJSON(cfg, data) {
  try {
    if (cfg.type === "line") {
      return L.geoJSON(data, {
        pane: "routesPane",
        style: () => styles[cfg.name] || { color: "#000" }
      });
    }

    if (cfg.type === "point") {
      return L.geoJSON(data, {
        pane: "stationsPane",
        pointToLayer: (f, latlng) =>
          diamondMarker(latlng, styles[cfg.name]?.color || "#000")
      });
    }

  } catch (e) {
    console.error("GeoJSON error:", cfg.name, e);
  }
}

// ===============================
// LOAD LAYERS (FIXED + SAFE)
// ===============================
const overlays = {};
let layersControl;

function loadLayer(cfg) {
  return fetch(cfg.url)
    .then(res => {
      if (!res.ok) throw new Error("Failed: " + cfg.url);
      return res.json();
    })
    .then(data => {
      const layer = safeGeoJSON(cfg, data);
      if (!layer) return null;

      overlays[cfg.name] = layer;

      if (cfg.default) layer.addTo(map);

      return layer;
    })
    .catch(err => {
      console.warn("Missing layer:", cfg.url);
      return null;
    });
}

// run all safely
Promise.all(layerConfig.map(loadLayer))
  .then(() => {
    console.log("All layers processed");

    // ONLY create control AFTER overlays exist
    layersControl = L.control.layers(null, overlays).addTo(map);

    console.log("Layer control ready");
  });

// ===============================
// ✔ / ✖ CONTROLS (FIXED)
// ===============================
const toggleControl = L.control({ position: "topright" });

toggleControl.onAdd = function () {
  const div = L.DomUtil.create("div");

  div.innerHTML = `
    <div style="background:white;padding:6px;border-radius:6px;">
      <button id="checkAllBtn">✔ All</button>
      <button id="uncheckAllBtn">✖ None</button>
    </div>
  `;

  L.DomEvent.disableClickPropagation(div);
  return div;
};

toggleControl.addTo(map);

document.addEventListener("click", function (e) {
  if (!overlays) return;

  if (e.target?.id === "checkAllBtn") {
    Object.values(overlays).forEach(layer => {
      if (layer && !map.hasLayer(layer)) map.addLayer(layer);
    });
  }

  if (e.target?.id === "uncheckAllBtn") {
    Object.values(overlays).forEach(layer => {
      if (layer && map.hasLayer(layer)) map.removeLayer(layer);
    });
  }
});

  // ===============================
  // NORTH ARROW
  // ===============================
 const north = L.control({ position: "topleft" });

  north.onAdd = function () {
  const div = L.DomUtil.create("div");

  div.innerHTML = `
    <div style="
      display:flex;
      flex-direction:column;
      align-items:center;
      background:rgba(255,255,255,0.9);
      padding:8px;
      border-radius:8px;
      box-shadow:0 2px 8px rgba(0,0,0,0.25);
    ">
      
      <!-- Arrow -->
      <div style="
        width:0;
        height:0;
        border-left:10px solid transparent;
        border-right:10px solid transparent;
        border-bottom:26px solid black;
        margin-bottom:6px;
      "></div>

      <!-- N label -->
      <div style="
        font-size:14px;
        font-weight:bold;
        color:black;
        letter-spacing:1px;
      ">
        N
      </div>

    </div>
  `;

  return div;
};

north.addTo(map);

  // ===============================
  // LEGEND (FIXED + TWO COLUMNS + OPACITY CONTROL)
  // ===============================
    const legend = L.control({ position: "bottomright" });

  legend.onAdd = function () {
    const div = L.DomUtil.create("div");

    let html = `
      <div style="
        background: rgba(255,255,255,0.8);
        padding: 10px;
        border-radius: 8px;
        width: 260px;
      ">
      <div style="display:flex;flex-wrap:wrap;">
    `;

    legendConfig.forEach(item => {

      let symbol = "";

      if (item.type === "line") {
        // dashed line (MMSP)
         if (item.dash) {
         symbol = `<i style="
          width:20px;
          height:0;
          border-top:${item.weight}px dashed ${item.color};
          display:inline-block;
          margin-right:5px;
        "></i>`;
      }

      // solid line
      else {
        symbol = `<i style="
        width:20px;
        height:${item.weight}px;
        background:${item.color};
        display:inline-block;
        margin-right:5px;
      "></i>`;
      }
}

      if (item.type === "point") {
        symbol = `<i style="
          background:${item.color};
          width:${item.size}px;
          height:${item.size}px;
          display:inline-block;
          transform: rotate(45deg);
          margin-right:5px;
        "></i>`;
      }

      html += `
        <div style="width:33.33%;margin-bottom:5px;font-size:12px;">
          ${symbol} ${item.name}
        </div>
      `;
    });

    html += `</div></div>`;
    div.innerHTML = html;
    return div;
  };

  legend.addTo(map);

// ===============================
// MAP CLICK (STREET VIEW)
// ===============================
map.on('click', e => {
  openStreetView(e.latlng.lat, e.latlng.lng);
});
