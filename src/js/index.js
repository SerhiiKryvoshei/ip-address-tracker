import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconSVG from "../images/icon-location.svg";
import { addTileLayer, addOffset, getAddress, validateIP } from "./helpers";

// #region Globals

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector(".search-bar__btn");

const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timezoneInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");

const mapArea = document.querySelector(".map");
const map = L.map(mapArea).setView([50.17348, 30.18158], 15); // #endregion Globals
const locationIcon = L.icon({
	iconUrl: iconSVG,
	// shadowUrl: "leaf-shadow.png",

	iconSize: [30, 40], // size of the icon
	// shadowSize: [50, 64], // size of the shadow
	// iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
	// shadowAnchor: [4, 62], // the same for the shadow
	// popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

// #endregion Globals

// #region Attach Events

document.addEventListener("DOMContentLoaded", () =>
	getAddress("8.8.8.8").then(setInfo)
);
ipInput.addEventListener("keydown", handleInput);
btn.addEventListener("click", handleGetData);

// #endregion Attach Events

// #region Event logic

function handleInput(e) {
	if (e.key === "Enter") {
		handleGetData();
	}
}

function handleGetData() {
	if (validateIP(ipInput.value)) {
		getAddress(ipInput.value).then((data) => setInfo(data));
	}
}

// #endregion Event logic

// #region Basic logic

function setInfo(mapData) {
	const { country, region, city, lat, lng, timezone } = mapData.location;

	ipInfo.innerText = mapData.ip;
	locationInfo.innerText = `country: ${country} region: ${region}`;
	timezoneInfo.innerText = `${timezone}`;
	ispInfo.innerText = `${mapData.isp}`;

	map.setView([lat, lng], 14);
	L.marker([lat, lng], { icon: locationIcon })
		.addTo(map)
		.bindPopup(`<b>city</b><br />${city}`)
		.openPopup();

	if (matchMedia("(max-with: 1024px)").matches) {
		addOffset(map);
	}
}

// #endregion Basic logic

addTileLayer(map);
