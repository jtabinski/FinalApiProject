const TRANSIT_URL = " https://api.winnipegtransit.com/v3/trip-planner.json?";
const MAX_RESULTS = "&limit=10";
const BOUNDING_BOX = "&bbox=-97.325875,49.766204,-96.953987,49.99275";
const TRANSIT_API_KEY = "BW4rOzRErQbKDPpVzhq6";
const MAPBOX_API_KEY = "pk.eyJ1IjoianRhYmluc2tpIiwiYSI6ImNrcDVrbzRvMjBiZHIyb3AyM3NiZGw1am4ifQ.digShKRT7xLV-Va_Uwwn0g";
const MAPBOX_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const destinationsList = document.getElementsByClassName("destinations")[0];
const originsList = document.getElementsByClassName("origins")[0];
const renderHtmlList = function (t, e) {
  e = e.features || e;
  let i,
    n;
  t.innerHTML = "";
  for (n of e) 
    i = n.place_name.split(", "),
    t.insertAdjacentHTML("beforeend", `<li data-long="${
      n.center[0]
    }" data-lat="${
      n.center[1]
    }"><div class="name">${
      i[0]
    }</div><div>${
      i[1]
    }</div></li>`)
  
};
const eFunct = function (e, i) {
  if ("UL" !== e.target.tagName) {
    let t = e.target.closest("li");
    for (let n of i.children) 
      n.classList.remove("selected");
    
    t.classList.add("selected")
  }
};
const segment = function (e, i) {
  let n;
  n = void 0 === e.times || void 0 === e.times.durations || void 0 === e.times.durations.total ? "" : ` for ${
    e.times.durations.total
  } minutes `;
  let o;
  switch (o = void 0 === e.to || void 0 === e.to.stop || void 0 === e.to.stop.key ? "your destination" : `Stop #${
    e.to.stop.key
  }`, e.type) {
    case "walk": i.insertAdjacentHTML("beforeend", `<li><i class="fas fa-walking" aria-hidden="true"></i>Walk ${n}to ${o}`);
      break;
    case "transfer":
      let t;
      t = void 0 === e.from || void 0 === e.from.stop || void 0 === e.from.stop.key ? "your origin" : `Stop #${
        e.from.stop.key
      }`,
      i.insertAdjacentHTML("beforeend", `<li><i class="fas fa-ticket-alt" aria-hidden="true"></i>Transfer from ${t} to ${o}`);
      break;
    case "ride":
      void 0 === e.letiant || void 0 === e.letiant.name ? busNumber = "" : (busNumber =
        `the ${ e.letiant.name
      }`, o = ""),
      i.insertAdjacentHTML("beforeend", `<li><i class="fas fa-bus" aria-hidden="true"></i>Ride ${busNumber}${n}`)
  }
};
const display = function (t) {
  const e = document.querySelector(".my-trip");
  e.innerHTML = "",
  void 0 === t.plans || 0 === t.plans.length ? e.insertAdjacentHTML("beforeend", "<li>No trips available</li>") : e.insertAdjacentHTML("beforeend", `<li>Recommended Route (Duration: ${
    t.plans[0].times.durations.total
  } min.)</li>`);
  for (let [i, n] of t.plans.entries()) {
    0 !== i && e.insertAdjacentHTML("beforeend", `<li>Alternate Route ${i} (Duration: ${
      n.times.durations.total
    } min.)</li>`);
    for (let o of n.segments) 
      segment(o, e)
    
  }
};
const getCoordinates = function () {
  const t = document.querySelector(".origins .selected")
  const e = document.querySelector(".destinations .selected");
  return {
    origin: {
      longitude: t.getAttribute("data-long"),
      latitude: t.getAttribute("data-lat")
    },
    destination: {
      longitude: e.getAttribute("data-long"),
      latitude: e.getAttribute("data-lat")
    }
  }
};
const transitAsk = async function (t) {
  t = `${TRANSIT_URL}origin=geo/${
    t.origin.latitude
  },${
    t.origin.longitude
  }&api-key=${TRANSIT_API_KEY}&destination=geo/${
    t.destination.latitude
  },${
    t.destination.longitude
  }`;

  const e = await fetch(t);
  return await e.json()
};

const mapboxAsk = async function (t) {
  t = `${MAPBOX_URL}${t}.json?access_token=${MAPBOX_API_KEY}${MAX_RESULTS}${BOUNDING_BOX}`;
  const e = await fetch(t);
  return await e.json()
};

originsList.addEventListener("click", function (t) {
  eFunct(t, originsList)
}),

destinationsList.addEventListener("click", function (t) {
  eFunct(t, destinationsList)
}),


document.querySelector(".plan-trip").addEventListener("click", function () {
  let t = transitAsk(getCoordinates());
  t.then(t => {
    display(t)
  })
}),


document.querySelector(".origin-form").addEventListener("submit", function (t) {
  t.preventDefault();
  const e = mapboxAsk(t.target[0].value);
  e.then(t => {
    renderHtmlList(originsList, t)
  })
}),

document.querySelector(".destination-form").addEventListener("submit", function (t) {
  t.preventDefault();
  const e = mapboxAsk(t.target[0].value);
  e.then(t => {
    renderHtmlList(destinationsList, t)
  })
});

