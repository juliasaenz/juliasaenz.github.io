let fechaAnio = new Date().getFullYear();

function esBisiesto(anyo) {
  if (anyo / 4 != Math.floor(anyo / 4)) return false;
  if (anyo / 100 != Math.floor(anyo / 100)) return true;
  if (anyo / 400 != Math.floor(anyo / 400)) return false;
  return true;
}

/* https://www.irt.org/articles/js052/index.htm */
function padout(number) {
  return number < 10 ? "0" + number : number;
}

function Easter(Y) {
  var C = Math.floor(Y / 100);
  var N = Y - 19 * Math.floor(Y / 19);
  var K = Math.floor((C - 17) / 25);
  var I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
  I = I - 30 * Math.floor(I / 30);
  I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
  var J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
  J = J - 7 * Math.floor(J / 7);
  var L = I - J;
  var M = 3 + Math.floor((L + 40) / 44);
  var D = L + 28 - 31 * Math.floor(M / 4);

  return padout(D) + "." + padout(M);
}

function crearMes(fecha) {
  let mes = fecha.getMonth();
  crearAnio(fecha.getFullYear());
  let diaComienzo = fecha.getDay() - 1;
  if (diaComienzo == -1) diaComienzo = 6; /* esto es porque el dominog figura como primer día y nosotr·s queremos que sea último */

  var diasEsteMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate();

  let semanasMes = Math.ceil((diasEsteMes + diaComienzo) / 7);
  /* crear mes */
  let mesHTML = document.createElement("div");
  mesHTML.id = meses[mes];
  mesHTML.classList.add("mes");
  /* portada */
  let portada = document.createElement("object");
  portada.type = "image/svg+xml";
  portada.id = "portada-mes-" + meses[mes];
  portada.data = "./assets/portadasSVG/" + meses[mes] + ".svg";
  portada.classList.add("portada-mes");
  portada.classList.add(meses[mes]);
  /* mes grilla */
  for (i = 0; i < 7; i++) {
    const diaSemana = document.createElement("div");
    diaSemana.classList.add("semana-titulo"); // estilo de titulos semana
    diaSemana.classList.add(dias[i] + "-titulo"); // identificar cada dia
    diaSemana.innerHTML = dias[i];
    mesHTML.appendChild(diaSemana);
  }

  let totalDiasCalendario = diasEsteMes + diaComienzo + (7 - ((diasEsteMes + diaComienzo) % 7)); // esto último es para completar los 7 días de la última semana con blancos.
  for (i = 0; i < totalDiasCalendario; i++) {
    const dia = document.createElement("div");
    dia.id = "fecha-" + (mes + 1) + "-" + (i - diaComienzo + 1);
    dia.classList.add("dia-mes");
    dia.classList.add(meses[mes]);
    dia.classList.add(dias[i % 7]);
    dia.classList.add("variante-" + (parseInt(Math.random() * 3) + 1));
    dia.classList.add("fecha-" + (mes + 1) + "-" + (i - diaComienzo + 1));

    if (i < diaComienzo || i >= diasEsteMes + diaComienzo) {
      // son dias invisibles...
      dia.classList.add("dia-hidden");
    }
    var diaNumero = document.createElement("div");
    diaNumero.classList.add("dia-numero");
    diaNumero.innerHTML = i + 1 - diaComienzo;
    dia.appendChild(diaNumero);

    var diaTexto = document.createElement("div");
    diaTexto.classList.add("dia-texto");
    diaTexto.innerHTML = "";
    dia.appendChild(diaTexto);

    mesHTML.appendChild(dia);
  }

  /* Agregar al calendario */
  let pagina = document.createElement("div");
  pagina.classList.add("pagina");
  pagina.classList.add(meses[mes]);
  pagina.appendChild(portada);
  pagina.appendChild(mesHTML);
  let container = document.getElementById("container");
  $("#container").empty();
  container.appendChild(pagina);

  if (vista == "semana") {
    $(".dia-mes").addClass("vista-semana");
    $(".semana-titulo").addClass("vista-semana");
  }
}

function crearEventos(fecha) {
  let mes = fecha.getMonth();
  let lado_a_lado = true;
  let idx = 0;
  eventosCalendario.forEach(
    element => {
      if (element.mes == mes+1) {
        if (element.asset != undefined) {
          let evento = document.createElement("div");
          evento.classList.add("evento");
          evento.classList.add("evento-"+element.mes+"-"+element.dia);
          let imgContainer = document.createElement("div");
          imgContainer.classList.add("evento-img-container");
          let img = document.createElement("img");
          img.id = "evento-img-"+element.mes+"-"+element.dia;
          img.src = "assets/eventos/"+element.mes+"-"+element.dia+".svg";
          imgContainer.appendChild(img);
          evento.appendChild(imgContainer);

          let imgVistaSemanaContainer = document.createElement("div");
          imgVistaSemanaContainer.classList.add("evento-vista-semanal-img-container");
          let imgVSI = document.createElement("img");
          let imgVST = document.createElement("img");
          imgVistaSemanaContainer.classList.add((lado_a_lado?"lado-izq":"lado-der"));
          lado_a_lado = !lado_a_lado;
          imgVSI.id = "evento-vista-semanal-img-"+element.mes+"-"+element.dia;
          imgVSI.src = "assets/eventosSeparados/"+element.mes+"-"+element.dia+"-ilus.svg";
          imgVSI.classList.add("evento-img");
          imgVST.id = "evento-vista-semanal-text-"+element.mes+"-"+element.dia;
          imgVST.src = "assets/eventosSeparados/"+element.mes+"-"+element.dia+"-texto.svg";
          imgVST.classList.add("evento-texto");
          imgVistaSemanaContainer.appendChild(imgVSI);
          imgVistaSemanaContainer.appendChild(imgVST);

          if (element.texto != undefined) {
            let evtTXT = document.createElement("div");
            evtTXT.classList.add("dia-texto-inner");
            $(evtTXT).html(element.texto);
            imgVistaSemanaContainer.appendChild(evtTXT);
          }

          evento.appendChild(imgVistaSemanaContainer);

          //$("#fecha-"+element.mes+"-"+element.dia).empty();
          $("#fecha-"+element.mes+"-"+element.dia).append(evento);
          $("#fecha-"+element.mes+"-"+element.dia).addClass("fecha-con-evento");
          if (element.color != undefined) $("#fecha-"+element.mes+"-"+element.dia).addClass("vista-semanal-color-"+element.color);

        if (element.actividades != undefined || element.contexto != undefined || element.video != undefined) {
          img.classList.add("evento-con-link");
          $(img).data("idxEventosCalendar", idx);
        }
      }

      if (element.texto != undefined) {
        $("#fecha-" + element.mes + "-" + element.dia + ">.dia-texto").html(element.texto);
      }
    }
    idx++;
  });

  $(".evento-img-container>img")
    .imagesLoaded()
    .always(function (instance) {
      escalarEventos();
      asignarTituloDias();
        animaciones();
    });

  /* $(".portada-mes").on("load", function () {
    // esto hace que las animaciones funcionen en chrome
    console.log("en TEORIA CARGASTE");
    animaciones();
  }); */

  $(".evento-con-link").on("click", function () {
    abrirPopup($(this));
  });
}

function abrirPopup(obj) {
  var esteEvento = eventosCalendario[obj.data("idxEventosCalendar")];

  $("#popup .fecha .fecha1 .texto").html(esteEvento.dia + " de " + meses[esteEvento.mes - 1]);
  $("#popup .fecha .fecha2 .texto").html(esteEvento.dia + " de " + meses[esteEvento.mes - 1]);
  $("#popup .fecha .fecha3 .texto").html(esteEvento.dia + " de " + meses[esteEvento.mes - 1]);

  $("#popup .descripcion").html(esteEvento.textoPopup);

  if (esteEvento.contexto != undefined) {
    $("#popup .ver-contexto").show();
    $("#popup .ver-contexto a").attr("href", "eventos/" + esteEvento.mes + "-" + esteEvento.dia + "-contexto.html");
  }
  if (esteEvento.actividades != undefined) {
    $("#popup .ver-actividad").show();
    $("#popup .ver-actividad a").attr("href", "eventos/" + esteEvento.mes + "-" + esteEvento.dia + "-actividad.html");
  }
  if (esteEvento.video != undefined) {
    $("#popup .ver-video").show();
    $("#popup .ver-video a").attr("href", esteEvento.video);
  }

  $("#popup").show(obj.data("idxEventosCalendar"));
  $("#popup").on("click", function () {
    $("#popup").hide();
  });
}

function escalarEventos() {
  if (vista == "mes") {
    $(".evento-img-container>img").each(function (i, e) {
      $(e).width($(e).parent().width() * ($(e).prop("naturalWidth") / 91));
      $(e).css("height", "auto");
    });
  } else if (vista == "semana") {
    $(".evento-img-container>img").each(function (i, e) {
      $(e).height($(e).parent().height() * ($(e).prop("naturalHeight") / 91));
      $(e).css("width", "auto");
    });
  }
}
