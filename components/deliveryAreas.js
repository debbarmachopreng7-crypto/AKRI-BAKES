export const deliveryAreas = [
  { name: "Duncan Bosti", charge: 150 },
  { name: "Notun Bosti", charge: 150 },
  { name: "Church Road", charge: 130 },
  { name: "City Tower", charge: 130 },
  { name: "Aokhasiram", charge: 180 },
  { name: "Indisen", charge: 180 },
  { name: "Thahekhu", charge: 200 },
  { name: "Eden Hospital Area", charge: 180 },
  { name: "Burma Camp", charge: 130 },
  { name: "Khermahal", charge: 130 },
  { name: "Marwadi Patty", charge: 150 },
  { name: "Half Nagarjan", charge: 120 },
  { name: "Full Nagarjan", charge: 150 },
  { name: "Thilixu", charge: 150 },
  { name: "Purana Bazar", charge: 100 },
  { name: "Super Market / Bank Colony", charge: 100 },
  { name: "Walford", charge: 120 },
  { name: "Padampukuri", charge: 130 },
  { name: "Purana Bazar B", charge: 150 },
  { name: "2½ Mile", charge: 130 },
  { name: "3rd Mile", charge: 140 },
  { name: "4th Mile", charge: 160 },
  { name: "Naga United (Hope Academy Area)", charge: 200 },
  { name: "5th Mile", charge: 160 },
  { name: "7th Mile", charge: 200 },
  { name: "Chumukedima", charge: 250 },
  { name: "Patkai Christian College Area", charge: 280 },
];

export function getDeliveryCharge(areaName) {
  const area = deliveryAreas.find((item) => item.name === areaName);
  return area ? area.charge : 0;
}
