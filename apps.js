// ===============================
// 🗺️ INITIAL MAP
// ===============================
console.log("APP STARTED");
console.log("MAP CONTAINER:", document.getElementById("map"));
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
// BASE MAPS
// ===============================
const carto = L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  { attribution: '&copy; OpenStreetMap & CartoDB' }
);

const esriSat = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  { attribution: '&copy; Esri' }
);

const googleHybrid = L.tileLayer(
  'https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
  {
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: '&copy; Google'
  }
);

carto.addTo(map);

// ===============================
// BASEMAP SWITCHER
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
// STYLE RULES
// ===============================
const styles = {
  "Antipolo–Masinag–Sumulong": { color: "#ffc401", weight: 5, opacity: 1 },
  "Antipolo–Tikling–Ortigas–SM Megamall": { color: "#a80000", weight: 5, opacity: 1 },
  "Marcos Hwy-C5-Araneta Cubao": { color: "#0000ba", weight: 5, opacity: 1 },

  "Bike Route": { color: "#556b2f", weight: 0.8, opacity: 0.6 },
  "Bus Route": { color: "#9e0081", weight: 1, opacity: 0.6 },
  "Intracity Routes": { color: "#81dd2b", weight: 4, opacity: 0.7 },
  "Jeepney Routes": { color: "#ff4501", weight: 1, opacity: 0.6 },
  "PUV Routes": { color: "#d34245", weight: 3, opacity: 0.5 },

  "LRT 1 Alignment": { color: "#777777", weight: 0.5, opacity: 1 },
  "LRT 2 Alignment": { color: "#bb01ff", weight: 0.5, opacity: 1 },
  "MMSP Alignment": { color: "#000000", weight: 0.5, opacity: 1, dashArray: "2,6" },
  "MRT 3 Alignment": { color: "#6179b7", weight: 0.5, opacity: 1 },
  "MRT 4 Alignment": { color: "#12b800", weight: 0.5, opacity: 1 },
  "MRT 7 Alignment": { color: "#9a1a00", weight: 0.5, opacity: 1 },

  "LRT 1 Stations": { color: "#666666", size: 8 },
  "LRT 2 Stations": { color: "#560078", size: 8 },
  "MRT 3 Stations": { color: "#016bff", size: 8 },
  "MRT 4 Stations": { color: "#00680a", size: 8 },
  "MRT 7 Stations": { color: "#ff0101", size: 8 }
};

// ===============================
// LEGEND CONFIG
// ===============================
const legendConfig = [
  { name: "Antipolo–Tikling–Ortigas–SM Megamall", type: "line", color: "#a80000", weight: 5 },
  { name: "Antipolo–Masinag–Sumulong", type: "line", color: "#ffc401", weight: 5 },
  { name: "Marcos Hwy-C5-Araneta Cubao", type: "line", color: "#0000ba", weight: 5 },
  { name: "Intracity Routes", type: "line", color: "#81dd2b", weight: 4 },
  { name: "Bike Route", type: "line", color: "#556b2f", weight: 2 },
  { name: "Bus Route", type: "line", color: "#9e0081", weight: 2 },
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
// STREET VIEW FUNCTION
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
  { name: "Bus Route", type: "line", url: "data/Routes/Bus_Route.geojson" },
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
// SAFE LOAD LAYERS (DEBUG VERSION)
// ===============================
const overlays = {};

function safeGeoJSON(cfg, data) {
  try {
    let layer;

    if (cfg.type === "line") {
      layer = L.geoJSON(data, {
        pane: "routesPane",
        style: () => styles[cfg.name] || { color: "#000", weight: 2 }
      });
    }

    if (cfg.type === "point") {
      layer = L.geoJSON(data, {
        pane: "stationsPane",
        pointToLayer: (f, latlng) =>
          diamondMarker(latlng, styles[cfg.name]?.color || "#000")
      });
    }

    return layer;
  } catch (e) {
    console.error("GeoJSON render error:", cfg.name, e);
    return null;
  }
}

Promise.all(
  layerConfig.map(cfg =>
    fetch(cfg.url)
      .then(res => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(data => {
        const layer = safeGeoJSON(cfg, data);

        if (!layer) {
          console.warn("Layer skipped:", cfg.name);
          return;
        }

        overlays[cfg.name] = layer;

        if (cfg.default) {
          layer.addTo(map);
          console.log("Loaded:", cfg.name);
        }
      })
      .catch(err => {
        console.error("❌ Failed loading:", cfg.name, cfg.url, err);
      })
  )
).then(() => {

  console.log("All layer attempts finished");

  const baseOverlays = {};

  Object.keys(overlays).forEach(name => {
    baseOverlays[name] = overlays[name];
  });

  L.control.layers(null, baseOverlays, { collapsed: true }).addTo(map);

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
        <div style="
          width:0;
          height:0;
          border-left:10px solid transparent;
          border-right:10px solid transparent;
          border-bottom:26px solid black;
          margin-bottom:6px;
        "></div>
        <div style="
          font-size:14px;
          font-weight:bold;
          color:black;
          letter-spacing:1px;
        ">N</div>
      </div>
    `;

    return div;
  };

  north.addTo(map);

  // ===============================
  // LEGEND
  // ===============================
  const legend = L.control({ position: "bottomright" });

  legend.onAdd = function () {
    const div = L.DomUtil.create("div");

    let html = `
      <div style="background: rgba(255,255,255,0.8); padding: 10px; border-radius: 8px; width: 260px;">
        <div style="display:flex;flex-wrap:wrap;">
    `;

    legendConfig.forEach(item => {
      let symbol = "";

      if (item.type === "line") {
        if (item.dash) {
          symbol = `<i style="width:20px;border-top:${item.weight}px dashed ${item.color};display:inline-block;margin-right:5px;"></i>`;
        } else {
          symbol = `<i style="width:20px;height:${item.weight}px;background:${item.color};display:inline-block;margin-right:5px;"></i>`;
        }
      }

      if (item.type === "point") {
        symbol = `<i style="background:${item.color};width:${item.size}px;height:${item.size}px;display:inline-block;transform:rotate(45deg);margin-right:5px;"></i>`;
      }

      html += `
        <div style="width:50%;margin-bottom:5px;font-size:12px;">
          ${symbol} ${item.name}
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    div.innerHTML = html;
    return div;
  };

  legend.addTo(map);
});

// ===============================
// MAP CLICK → STREET VIEW
// ===============================
map.on('click', e => {
  openStreetView(e.latlng.lat, e.latlng.lng);
});
