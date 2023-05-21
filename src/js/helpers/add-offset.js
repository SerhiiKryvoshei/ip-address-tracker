export function addOffset(map) {
	// отступ по Y
	const offsetY = map.getSize().y * 0.15;

	map.panBy([0, -offsetY]);
}
