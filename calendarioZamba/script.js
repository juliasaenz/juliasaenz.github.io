function reescalar() {
  escalarEventos();
  asignarTituloDias();
}

function crearAnio(anyo) {
  let divAnio = document.getElementById("anio");
  divAnio.innerHTML = anyo;
}

function changeView(vista) {
  if (vista == "semana") {
    $(".dia-mes").addClass("vista-semana");
    $(".semana-titulo").addClass("vista-semana");
    $("#verComoMes").removeClass("view-selected");
    $("#verComoSemana").addClass("view-selected");
  } else { /* default to mes */
    $(".dia-mes").removeClass("vista-semana");
    $(".semana-titulo").removeClass("vista-semana");
    $("#verComoSemana").removeClass("view-selected");
    $("#verComoMes").addClass("view-selected");    
  }
  escalarEventos();

}

$("#mesAnterior").click(function() {
  fechaSeleccionada = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() -1 , 1);
  window.location = "agenda.html?a="+fechaSeleccionada.getFullYear()+"&m="+(fechaSeleccionada.getMonth()+1)+"&v="+(vista=="mes"?"m":"s");;
  //crearMes(fechaSeleccionada);  
  //crearEventos(fechaSeleccionada);
});

$("#mesSiguiente").click(function() {
  fechaSeleccionada = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth() + 1, 1);
  window.location = "agenda.html?a="+fechaSeleccionada.getFullYear()+"&m="+(fechaSeleccionada.getMonth()+1)+"&v="+(vista=="mes"?"m":"s");
  //crearMes(fechaSeleccionada);
  //crearEventos(fechaSeleccionada);
});

$("#verComoMes").click(function() {
  vista = "mes";
  changeView(vista);
});
$("#verComoSemana").click(function() {
  vista = "semana";
  changeView(vista);
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};



/* -------------------------------------------------------------- */
var yr = (new Date()).getFullYear();
var mt = (new Date()).getMonth()+1;
//var param = getParameters();

var param_a = getUrlParameter('a');
var param_m = getUrlParameter('m');

let vista = "mes";
var param_v = getUrlParameter('v');
if (param_v == 's') vista = "semana";

changeView(vista);


if (param_a !== false) {      
  yr = param_a;
}
if (param_m !== false) {      
  mt = param_m;
}

hoy = yr+"-"+mt+"-"+"02";
let fechaSeleccionada = new Date(hoy);
crearMes(fechaSeleccionada);

let eventosCalendario;
$.getJSON( "eventos.json", function(data) {
    eventosCalendario = data.eventos;
    crearEventos(fechaSeleccionada);
} );




$( window ).on('resize', reescalar);