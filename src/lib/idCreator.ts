export default function createId() {
  let idMax = parseInt(window.localStorage.getItem('_id_max') || '0') || 0;
  idMax++;
  window.localStorage.setItem('_id_max', idMax.toString());
  return idMax;
}