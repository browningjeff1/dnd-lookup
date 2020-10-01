export default async function fetchStartingEquipment(url) {
  const result = await fetch('https://www.dnd5eapi.co' + url)
  const data = await result.json();
  return data;
}