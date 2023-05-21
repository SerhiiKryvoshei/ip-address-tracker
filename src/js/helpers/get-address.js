export async function getAddress(ipAddress = "8.8.8.8") {
	const apiKey = "at_N1IZQ45jieF8HSplfA6bKbCGAXcdb";
	const url = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${apiKey}&ipAddress=${ipAddress}`;
	const response = await fetch(url);

	return await response.json();
}
