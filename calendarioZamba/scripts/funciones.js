const diasMin = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

window.asignarTituloDias = function () {
  // si la pantalla es chica, acorta el nombre de los días
  for (let i = 0; i < 7; i++) {
    let texto = dias[i];
    let lista = document.getElementsByClassName(texto + "-titulo");
    if (window.innerWidth < 768) {
      texto = diasMin[i];
    }
    for (let j = 0; j < lista.length; j++) {
      lista[j].innerHTML = texto;
    }
  }
};

window.normalizarTexto = function (str) {
    
  const lowerCaseStr = str.toLowerCase();
  const accentRemovedStr = lowerCaseStr.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return accentRemovedStr;
};
