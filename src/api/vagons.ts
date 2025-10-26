export async function fetchVagons() {
  const res = await fetch('https://rwl.artport.pro/commercialAgent/hs/CarrWorkApp/VagonInfo');
  const data = await res.json();
  return data.Vagons;
}

export async function fetchVagonById(id: string) {
  const res = await fetch('https://rwl.artport.pro/commercialAgent/hs/CarrWorkApp/VagonInfo');
  const data = await res.json();
  return data.Vagons.find((v: any) => v.VagonNumber === id);
}
