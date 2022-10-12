import doc from "./docs.json" assert { type: "json" };
let all = [];
let final = [];
const getStats = () => {
  doc.map((item) => {
    all.push(item.place.name);
  });
  let unique = [];
  unique = [...new Set(all)];
  unique.map((element, i) => {
    final.push([]);
  });

  unique.map((term, i) => {
    doc.filter((element) => {
      if (element.place.name === term) {
        final[i].push(element);
      }
    });
    console.log({
      term: term,
      value: final[i].length,
    });
  });

  console.log(final);
};
getStats();

var map = L.map("map").setView([51.505, 0], 2.5);

var tiles = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
  {
    maxZoom: 13,
    attribution:
      "Tiles &copy; Esri &mdash; Source: USGS, Esri, TANA, DeLorme, and NPS",
  }
).addTo(map);

const legend = L.control({ position: "topright" });
legend.onAdd = function (map) {
  let div = L.DomUtil.create("div", "title-box");
  div.innerHTML = "<p>This map displays the </p>";
  return div;
};
legend.addTo(map);

const markerIcon = L.icon({
  iconUrl:
    "https://cdn.iconscout.com/icon/premium/png-256-thumb/open-book-1631477-1381009.png",
  iconSize: [25, 25],
});

const viennaIcon = L.icon({
  iconUrl: "star/2x/outline_star_outline_black_24dp.png",
  iconSize: [25, 25],
});

const vienna = L.marker([48.20849, 16.37208], { icon: viennaIcon }).addTo(map);
vienna.bindPopup(
  "<img src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Josef_Chavanne_Portrait.jpg' width='300px' />"
);

let biographies = [];

doc.map((item, i) => {
  let pin = L.marker([item.place.lat, item.place.long], {
    icon: markerIcon,
  }).addTo(map);
  pin.bindPopup(
    "<div class='text-content'><center><p>" +
      item.category.name +
      "</p><b>" +
      "<h3>" +
      item.place.name +
      ", " +
      item.place.domain +
      "</h3><p>" +
      item.creator.firstName +
      " " +
      item.creator.lastName +
      "</b> <i>" +
      item.title +
      "</i> (" +
      item.createdAt +
      ")</p><p>No. " +
      item.itemNum +
      " on page " +
      item.page +
      `.</p><br><p><a href='https://archive.org/details/dieliteraturber00karpgoog/page/n${
        item.page + 22
      }/mode/2up?view=theater' target='_blank'>` +
      "<button class='button'>" +
      "Source" +
      "</button></a></p></center > ",
    { className: "box" }
  );
  biographies.push(pin);
});

const bioLayer = L.layerGroup(biographies);

const overlayMaps = {
  Vienna: vienna,
  Biographies: bioLayer,
};
L.control.layers(null, overlayMaps).addTo(map);
