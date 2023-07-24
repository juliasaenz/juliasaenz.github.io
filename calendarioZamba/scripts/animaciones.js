//import { MotionPathPlugin } from "gsap/MotionPathPlugin";
// style="transform-origin: 50% 50%; transform-box: fill-box;"
// style="transform-box: fill-box;"
function animaciones() {
  var mesActual = fechaSeleccionada.getMonth() + 1;
  switch (mesActual) {
    case 1:
      animacionesEnero();
      break;
    case 2:
      animacionesFebrero();
      break;
    case 3:
      animacionesMarzo();
      break;
    case 4:
      animacionesAbril();
      break;
    case 5:
      animacionesMayo();
      break;
    case 6:
      animacionesJunio();
      break;
    case 7:
      animacionesJulio();
      break;
    case 8:
      animacionesAgosto();
      break;
    case 9:
      animacionesSeptiembre();
      break;
    case 10:
      animacionesOctubre();
      break;
    case 11:
      animacionesNoviembre();
      break;
    case 12:
      animacionesDiciembre();
      break;
    default:
      break;
  }
}

function animacionesEnero() {
  var grupo = $(".portada-mes.enero").contents().contents();
  var texto = grupo.find(".texto");
  var pelotaGrupo = grupo.find(".pelotaCuerpo");
  var pelota = grupo.find(".pelota");
  var pelotaSombra = grupo.find(".pelotaSombra");
  var brazoNina = grupo.find(".brazo-bandera");


  var hop1 = "M270 502.5C356.167 369.833 511.4 186 741 478"
  var hop2 = "M741 477.5c42.833-60.167 151.1-142.9 241.5 7.5"
  var path1= "M251.5 541.5c47.167-153 182.5-367.2 346.5 0 42.667-81.167 148.6-194.8 231 0"
  gsap.registerPlugin(MotionPathPlugin);
  gsap.registerPlugin(CustomEase);

  CustomEase.create("hop", "M0,0 C0,0 0.022,0.007 0.022,0.007 0.022,0.007 0.058,0.017 0.068,0.023 0.075,0.028 0.083,0.03 0.09,0.031 0.097,0.031 0.104,0.029 0.11,0.025 0.12,0.018 0.129,0.007 0.135,0.001 0.135,0.002 0.137,0.002 0.137,0.003 0.144,0.019 0.15,0.036 0.16,0.056 0.167,0.071 0.172,0.08 0.181,0.093 0.189,0.103 0.195,0.111 0.205,0.117 0.211,0.122 0.227,0.124 0.227,0.124 0.227,0.124 0.348,0.149 0.365,0.224 0.372,0.256 0.377,0.273 0.386,0.305 0.395,0.334 0.399,0.349 0.41,0.377 0.418,0.4 0.424,0.414 0.435,0.436 0.442,0.451 0.448,0.461 0.458,0.473 0.464,0.481 0.791,0.88 0.795,0.882 0.804,0.888 0.811,0.896 0.818,0.906 0.827,0.919 0.832,0.928 0.84,0.943 0.85,0.964 0.859,0.99 0.863,0.999 0.867,0.995 0.877,0.982 0.887,0.975 0.894,0.971 0.902,0.968 0.91,0.968 0.917,0.968 0.925,0.972 0.932,0.977 0.941,0.983 0.969,0.992 0.976,0.992 0.984,0.992 1,1 1,1 ")
  CustomEase.create("custom", "M0,0 C0,0 0.129,0.007 0.135,0.001 0.135,0.002 0.137,0.002 0.137,0.003 0.144,0.019 0.15,0.036 0.16,0.056 0.167,0.071 0.172,0.08 0.181,0.093 0.189,0.103 0.195,0.111 0.205,0.117 0.211,0.122 0.219,0.125 0.227,0.124 0.235,0.124 0.243,0.121 0.25,0.117 0.258,0.111 0.264,0.104 0.271,0.095 0.28,0.082 0.286,0.073 0.293,0.058 0.304,0.037 0.316,0.005 0.318,0 0.321,0.018 0.679,0.988 0.681,0.999 0.683,0.994 0.695,0.962 0.706,0.941 0.713,0.926 0.719,0.917 0.728,0.904 0.735,0.895 0.741,0.888 0.75,0.882 0.756,0.878 0.764,0.875 0.772,0.875 0.78,0.874 0.788,0.877 0.795,0.882 0.804,0.888 0.811,0.896 0.818,0.906 0.827,0.919 0.832,0.928 0.84,0.943 0.85,0.964 0.859,0.99 0.863,0.999 0.867,0.995 1,1 1,1 ")

  var tl = gsap.timeline({repeat: -1, yoyo: true});
  tl.to(pelotaGrupo, {
    motionPath: {
      path: path1,
      align: "#path",
      alignOrigin: [0.5, 1],
      autoRotate: 80,
    },
    transformOrigin: "50% 50%",
    duration: 4,
    ease: "custom"
  });

  tl.to(pelotaSombra, {
    x: "550%", 
    y: "45%",
    duration: 4,
    ease: "custom",
  }, "<");
  // TEXTO
  $(texto).velocity({ scaleX: "110%", scaleY: "110%", translateX: "-5%", translateY: "-5%" }, { loop: false, delay: 100, duration: 1000, easing: "easeOutElastic" });
  // BRAZO NINA
  $(brazoNina).velocity({ translateX: "-3%", translateY: "2%", rotateZ: "-5deg" }, { duration: 900, loop: true, easing: "easeOutElastic" });
  // BRAZO ZAMBA
  //fin
}

function animacionesFebrero() {
  var grupo = $(".portada-mes.febrero").contents().contents();
  var texto = grupo.find(".texto");
  var brazoZ = grupo.find(".brazo-bandera");
  var brazoN = grupo.find(".brazo-der");
  var banderines = grupo.find(".banderines");
  var papelitos = grupo.find(".papelitos");
  console.log(papelitos);
  $(papelitos).css("opacity", "0.01");
  $(banderines).css("opacity", "0.01");
  $(banderines).css("transform", "translateY(-20%)");
  // TEXTO
  $(texto).velocity({ scaleX: "110%", scaleY: "110%", translateX: "-5%", translateY: "-8%" }, { loop: false, delay: 100, duration: 1000, easing: "easeOutElastic" });
  // BRAZO
  $(brazoN).velocity({ translateX: "1%", translateY: "-3%", rotateZ: "8deg" }, { duration: 500, loop: true, easing: "easeInOutBack" });
  $(brazoZ).velocity({ translateX: "-6%", translateY: "11%", rotateZ: "-5deg" }, { delay: 200, duration: 500, loop: true, easing: "easeInOutQuint" });
  // banderines
  $(banderines)
    .velocity({ translateY: "-20%", opacity: 0.1 }, { delay: 400, duration: 300, easing: "easeInOutQuint" })
    .velocity({ translateY: "0%", opacity: 1 }, { loop: true, duration: 1300, easing: "easeInOutQuint" })
    .velocity("reverse", { loop: true, delay: 8000 });

  $(papelitos).velocity({ translateY: "50%", opacity: 1 }, { duration: 1300, loop: true, easing: "easeInOutQuint" }).velocity("reverse", { loop: true, delay: 5000, easing: "easeOutQuint" });

  //fin
}

function animacionesMarzo() {
  var grupo = $(".portada-mes.marzo").contents().contents();
  var texto = grupo.find(".texto");
  var brazoN = grupo.find(".brazo-der");
  var cartel = grupo.find(".cartel-completo");
  var dedo = grupo.find(".dedo");
  console.log(dedo)
  var cuerpo = grupo.find(".cuerpo");

  var motionPath = "M107 585c-.667-89.5 26.3-239.7 139.5-124.5"
  gsap.registerPlugin(MotionPathPlugin);
  var tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 2});
  tl.to(cuerpo, {
    motionPath: {
      path: motionPath,
      align: "#path",
      alignOrigin: [0.5, 0.5],
      autoRotate: false,
      offsetX: -8,
    },
    transformOrigin: "50% 50%",
    duration: 0.8,
  });

  $(texto).velocity({ scaleX: "110%", scaleY: "110%", translateX: "-3.8%", translateY: "-7%" }, { loop: false, delay: 100, duration: 1000, easing: "easeOutElastic" });
  $(brazoN).velocity({ translateX: "1%", translateY: "-3%", rotateZ: "8deg" }, { duration: 700, loop: true, easing: "easeInOutBack" });
  $(cartel).velocity({ translateX: "15%", translateY: "-7%", rotateZ: "8deg" }, { duration: 700, loop: true, easing: "easeInOutBack" });
  $(dedo).velocity({ translateX: "0%", translateY: "2.8%" }, { duration: 700, loop: true, easing: "easeInOutBack" });
}

function animacionesAbril() {
  var grupo = $(".portada-mes.abril").contents().contents();
  var texto = grupo.find(".texto");
  var brazo = grupo.find(".brazo-bandera-abril");
  var luz = grupo.find(".luz-amarilla");

  // TEXTO
  $(texto).velocity({ scaleX: "110%", scaleY: "110%", translateX: "-4%", translateY: "-2%" }, { loop: false, delay: 100, duration: 1000, easing: "easeOutElastic" });
  
  // faro
  $(luz).velocity("fadeIn", { duration: "slow", delay: 1200, loop: true, easing: "easeOutQuart" });
  // BRAZO
  $(brazo).velocity({ translateX: "-14.3%", translateY: "3.4%", rotateZ: "-5deg" }, { duration: 900, loop: true, easing: "easeOutQuart" });
  //fin
}

function animacionesMayo() {
  var grupo = $(".portada-mes.mayo").contents().contents();
  var texto = grupo.find(".texto");
  var escarapelaP = grupo.find(".escarapela-personaje");
  var escarapelaZ = grupo.find(".escarapela-zamba");
  var brazo = grupo.find(".brazo-der");
  var trompetaCabeza = grupo.find(".cabeza-trompeta");
  var trompetaCuerpo = grupo.find(".cuerpo-trompeta");
  var trompeta = grupo.find(".trompeta");
  var notas = grupo.find(".notas");
  $(notas).css("display", "none");

  // TEXTO
  $(texto).velocity({ scaleX: "110%", scaleY: "110%", translateX: "-5%", translateY: "-5%" }, { loop: false, delay: 100, duration: 1000, easing: "easeOutElastic" });
  // ESCARAPELA
  $(escarapelaP)
    .velocity({ scaleX: "115%", scaleY: "115%", translateX: "-1%", translateY: "-8.2%", rotateZ: "1deg" }, { loop: false, duration: 800, easing: "easeOutCirc" })
    .velocity("reverse", { loop: true, duration: 600, delay: 5000, easing: "linear" });
  /*$(escarapelaZ)
    .velocity({ scaleX: "110%", scaleY: "110%", translateX: "-7%", translateY: "-6%", rotateZ: "-1deg" }, { loop: false, duration: 800, easing: "easeOutCirc" })
    .velocity("reverse", { loop: true, duration: 600, delay: 5000, easing: "linear" });*/
  // BRAZO
  $(brazo)
    .velocity({ translateX: "-3%", translateY: "2%", rotateZ: "-5deg" }, { delay: 1100, duration: 900, loop: true, easing: "easeOutBack" })
    .velocity("reverse", { loop: true, easing: "easeInBack" });
  // TROMPETA
  /* version 1 */
  $(trompeta)
    .velocity(
      { translateX: "0%", translateY: "0%", rotateZ: "0deg" },
      {
        loop: true,
        delay: 1000,
        duration: 350,
        easing: "easeInOutQuint",
      }
    )
    .velocity(
      { translateX: "2%", translateY: "-1%", rotateZ: "10deg" },
      {
        loop: true,
        duration: 250,
        easing: "easeInOutQuint",
        progress: function (elements, complete, remaining, start, tweenValue) {
          if (complete * 100 === 100) {
            $(notas).velocity("fadeIn", { duration: "fast" }).velocity({ translateX: "-1%", translateY: "-1%" }, { delay: 7, duration: "fast", queue: false });
          } else if (complete * 100 < 90) {
            $(notas).css("display", "none");
            $(notas).velocity({ translateX: "1%", translateY: "1%" }, { duration: "fast", queue: false });
          }
        },
      }
    );
  /*.velocity("reverse", {
      loop: true,
      delay: 1000,
      duration: 350,
      easing: "easeInOutQuint",
      complete: function () {},
    }); */

  /* version 2 */
  /*$(trompetaCabeza)
    .velocity({ translateX: "2%" }, { loop: true, duration: 350, easing: "easeInOutQuint" })
    .velocity("reverse", { loop: true, duration: 350, easing: "easeInOutQuint" })
    .velocity({ translateX: "2%" }, { loop: true, duration: 250, easing: "easeInOutQuint" })
    .velocity("reverse", { loop: true, delay: 700, duration: 350, easing: "easeInOutQuint" })*/

  //fin
}

function animacionesJunio() {
  var grupo = $(".portada-mes.junio").contents().contents();
  var texto = grupo.find(".texto");
  var cola = grupo.find(".cola");
  var brazo = grupo.find(".brazo-izq");
  // TEXTO
  $(texto).velocity({ scaleX: "110%", scaleY: "110%", translateX: "-5%", translateY: "-5%" }, { loop: false, delay: 100, duration: 1000, easing: "easeOutElastic" });
  // cola
  $(cola)
    .velocity({ translateX: "4%", translateY: "50%", rotateZ: "-25deg" }, { delay: 1100, duration: 300, loop: true, easing: "easeInBack" })
    .velocity("reverse", { loop: true, easing: "easeInBack" });
  // brazo
  $(brazo).velocity({ translateX: "-8%", translateY: "6%", rotateZ: "-5deg" }, { duration: 900, loop: true, easing: "easeOutElastic" });

  //fin
}

function animacionesJulio() {
  var grupo = $(".portada-mes.julio").contents().contents();
  var texto = grupo.find(".texto");
  var brazo = grupo.find(".brazo-bandera");
  var espada = grupo.find(".espada");
  // TEXTO
  $(texto).velocity({ scaleX: "110%", scaleY: "110%", translateX: "-4%", translateY: "-5%" }, { loop: false, delay: 100, duration: 1000, easing: "easeOutElastic" });
  // BRAZO
  $(brazo).velocity({ translateX: "13%", translateY: "1%", rotateZ: "5deg" }, { duration: 900, loop: true, easing: "easeInOutQuad" });
  $(espada).velocity({ translateX: "-14%", translateY: "6%", rotateZ: "-6deg" }, { duration: 2000, loop: true, easing: "easeInOutCubic" });

  //fin
}

function animacionesAgosto() {
  var grupo = $(".portada-mes.agosto").contents().contents();
  var texto = grupo.find(".texto");
  var cola = grupo.find(".cola-caballo");
  var brazoD = grupo.find(".brazo-der-nina");
  var brazoP = grupo.find(".brazo-der-personaje");
  var trompeta = grupo.find(".trompeta");
  var notas = grupo.find(".notas");
  $(notas).css("display", "none");

  // TEXTO
  $(texto).velocity({ scaleX: "110%", scaleY: "110%", translateX: "-5%", translateY: "-5%" }, { loop: false, delay: 100, duration: 1000, easing: "easeOutElastic" });
  // cola
  $(cola)
    .velocity({ translateX: "1%", translateY: "20%", rotateZ: "25deg" }, { delay: 1100, duration: 300, loop: true, easing: "easeInBack" })
    .velocity("reverse", { loop: true, easing: "easeInBack" });
  // brazo
  $(brazoP).velocity({ translateX: "20%", translateY: "15%", rotateZ: "25deg" }, { delay: 300, duration: 700, loop: true, easing: "easeOutBack"  }).velocity("reverse", { loop: true, easing: "easeInBack" });
  $(brazoD).velocity({ translateX: "1%", translateY: "80%", rotateZ: "-25deg" }, { delay: 1100, duration: 900, loop: true }).velocity("reverse", { loop: true, easing: "easeInBack" });
  // TROMPETA
  /* version 1 */
  $(trompeta)
    .velocity(
      { translateX: "0%", translateY: "0%", rotateZ: "0deg" },
      {
        loop: true,
        delay: 1000,
        duration: 350,
        easing: "easeInOutQuint",
      }
    )
    .velocity(
      { translateX: "-1.45%", translateY: "-3.2%", rotateZ: "-9deg" },
      {
        loop: true,
        duration: 250,
        easing: "easeInOutQuint",
        progress: function (elements, complete, remaining, start, tweenValue) {
          if (complete * 100 === 100) {
            $(notas).velocity("fadeIn", { duration: "fast" }).velocity({ translateX: "1%", translateY: "-1%" }, { delay: 7, duration: "fast", queue: false });
          } else if (complete * 100 < 90) {
            $(notas).css("display", "none");
            $(notas).velocity({ translateX: "-1%", translateY: "1%" }, { duration: "fast", queue: false });
          }
        },
      }
    );

  //fin
}

function animacionesSeptiembre() {
  var grupo = $(".portada-mes.septiembre").contents().contents();

  var texto = grupo.find(".texto");
  var brazoZ = grupo.find(".brazo-izq-zamba");
  var brazoN = grupo.find(".brazo-der-nina");

  var brazoP = grupo.find(".brazo-izq-personaje");
  var tiza = grupo.find(".texto-tiza");
  var letras = tiza[0].children;
  for (let i = 0; i < letras.length; i++) {
    var atraso = i * 200;
    console.log("ding", i, this);
    $(letras[i]).velocity({ strokeDashoffset: 50 }, { duration: 1000, delay: atraso });
  }

  // TEXTO
  $(texto).velocity({ scaleX: "105%", scaleY: "105%", translateX: "-4%", translateY: "-5%" }, { loop: false, delay: 100, duration: 1000, easing: "easeOutElastic" });
  // BRAZO
  $(brazoN).velocity({ translateX: "5%", translateY: "8%", rotateZ: "8deg" }, { duration: 700, loop: true, easing: "easeInOutQuad" });
  $(brazoZ).velocity({ translateX: "-10%", translateY: "15%", rotateZ: "-3deg" }, { duration: 700, loop: true, easing: "easeInOutQuint" });
  //$(brazoP).velocity({ translateX: "-10%", translateY: "15%", rotateZ: "-15deg" }, { duration: 700, loop: true, easing: "easeInOutQuint" });
  //fin
}

function animacionesOctubre() {
  var grupo = $(".portada-mes").contents().contents();

  var texto = grupo.find(".texto");
  var brazoZ = grupo.find(".zamba.brazo-izq");
  var brazoN = grupo.find(".nina.brazo-izq.adelante");

  // TEXTO
  $(texto).velocity({ scaleX: "110%", scaleY: "110%", translateX: "-4%", translateY: "-5%" }, { loop: false, delay: 100, duration: 1000, easing: "easeOutElastic" });
  // BRAZO
  $(brazoN).velocity({ translateX: "15%", translateY: "-2%", rotateZ: "8deg" }, { duration: 900, loop: true, easing: "easeInOutQuad" });
  $(brazoZ).velocity({ translateX: "-22%", translateY: "11%", rotateZ: "-10deg" }, { duration: 700, loop: true, easing: "easeInOutQuint" });
  //fin
}

function animacionesNoviembre() {
  var grupo = $(".portada-mes").contents().contents();

  var texto = grupo.find(".texto");
  var brazoZ = grupo.find(".brazo-izq");
  var brazoN = grupo.find(".mano-bandera");
  var palabras = grupo.find(".independencia");
  var letras = palabras[0].children;
  for (let i = 0; i < letras.length; i++) {
    var atraso = i * 200;
    $(letras[letras.length - i - 1]).velocity({ strokeDashoffset: 50 }, { duration: 1000, delay: atraso });
  }
  palabras = grupo.find(".pueblo");
  letras = palabras[0].children;
  for (let i = 0; i < letras.length; i++) {
    var atraso = i * 200;
    $(letras[letras.length - i - 1]).velocity({ strokeDashoffset: 50 }, { duration: 1000, delay: atraso });
  }
  palabras = grupo.find(".poder");
  letras = palabras[0].children;
  for (let i = 0; i < letras.length; i++) {
    var atraso = i * 200;
    $(letras[letras.length - i - 1]).velocity({ strokeDashoffset: 50 }, { duration: 1000, delay: atraso });
  }
  palabras = grupo.find(".territorio");
  letras = palabras[0].children;
  for (let i = 0; i < letras.length; i++) {
    var atraso = i * 200;
    $(letras[letras.length - i - 1]).velocity({ strokeDashoffset: 50 }, { duration: 1000, delay: atraso });
  }
  palabras = grupo.find(".soberania");
  letras = palabras[0].children;
  console.log("letras: ", letras[i]);
  for (let i = 0; i < letras.length; i++) {
    var atraso = i * 200;
    $(letras[letras.length - i - 1]).velocity({ strokeDashoffset: 50 }, { duration: 1000, delay: atraso });
  }
  // TEXTO
  $(texto).velocity({ scaleX: "110%", scaleY: "110%", translateX: "-4%", translateY: "-1%" }, { loop: false, delay: 100, duration: 1000, easing: "easeOutElastic" });
  // BRAZO
  $(brazoN).velocity({ translateX: "-14%", translateY: "-2%", rotateZ: "-8deg" }, { duration: 900, loop: true, easing: "easeInOutQuad" });
  $(brazoZ).velocity({ translateX: "-22%", translateY: "11%", rotateZ: "-10deg" }, { duration: 700, loop: true, easing: "easeInOutQuint" });
  //fin
}

function animacionesDiciembre() {
  var grupo = $(".portada-mes.diciembre").contents().contents();
  var texto = grupo.find(".texto");
  var bandera = grupo.find(".bandera-grupo");
  var band = grupo.find(".banner");
  var manoN = grupo.find(".nina.mano");
  var manoZ = grupo.find(".zamba.mano");
  var paloD = grupo.find(".palo-der");
  var paloI = grupo.find(".palo-izq");
  // TEXTO
  $(texto).velocity({ scaleX: "110%", scaleY: "110%", translateX: "-4%", translateY: "-1%" }, { loop: false, delay: 100, duration: 1000, easing: "easeOutElastic" });
  // BRAZO
  $(band).velocity({ scaleX: "90%", translateX: "6%" }, { loop: true, duration: 1000 });
  /////$(bandera).velocity({ translateX: "1.2%", translateY: "-3%", rotateZ: "1deg" }, { duration: 1000, loop: true, easing: "easeInOutQuad" });
  // manos
  $(manoN).velocity({ translateX: "0.5", translateY: "20%" }, { duration: 1000, loop: true, easing: "easeInOutQuad" });
  $(manoZ).velocity({ translateY: "11%" }, { duration: 1000, loop: true, easing: "easeInOutQuad" });
  // manos
  $(paloI).velocity({ translateX: "20%", translateY: "0%", rotateZ:"6deg" }, { duration: 1000, loop: true, easing: "easeInOutQuad" });
  $(paloD).velocity({ translateX: "-20%", translateY: "0%", rotateZ:"-5deg" }, { duration: 1000, loop: true, easing: "easeInOutQuad" });
  //fin
}
