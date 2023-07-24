function crearHome() {
  /////////// agregar al containter
  let container = document.getElementById("container");
  $("#container").empty();
  ///////////// crear home
  let home = document.createElement("div");
  home.id = "home";
  home.classList.add("pagina");
  container.appendChild(home);
  /////////// dibujos fondo
  setDecorado(container);
  /////////// crear portada
  let portada = document.createElement("object");
  portada.type = "image/svg+xml";
  portada.data = "./assets/portadasSVG/home.svg";
  portada.classList.add("portada-home");
  portada.classList.add("home");
  home.appendChild(portada);

  $(".portada-home").on("load", function () {
    $(".portada-home").css("z-index", "10");
    ///////// Animación
    animar();
    //////////// Divs meses
    let menuMeses = document.createElement("div");
    menuMeses.classList.add("menu-meses");
    for (i = 0; i < 12; i++) {
      const mes = document.createElement("a");
      mes.id = "boton-" + meses[i];
      mes.classList.add(meses[i]);
      mes.classList.add("boton-mes");
      mes.setAttribute("href", "agenda.html?m=" + (i + 1));
      menuMeses.appendChild(mes);
    }

    home.appendChild(menuMeses);
  });
}

function setDecorado(container) {
  let arr = [2, -3, -5, 4];

  for (let i = 0; i < arr.length; i++) {
    let decorado = document.createElement("object");
    decorado.classList.add("decorado-home");
    decorado.type = "image/svg+xml";
    decorado.data = "./assets/dibujosHome/decorado" + i + ".svg";
    decorado.style.zIndex = 1 + i;
    container.appendChild(decorado);

    $(".decorado-home>object")
      .imagesLoaded()
      .always(function (instance) {
        console.log("cargo: ", decorado);

        //
        gsap.to(decorado, {
          yPercent: arr[i],
          ease: "none",
          scrollTrigger: {
            trigger: ".container",
            // start: "top bottom", // the default values
            // end: "bottom top",
            scrub: true,
          },
        }); 
        //
      });
  }
}

function animar() {
  gsap.registerPlugin(ScrollTrigger);

  var grupo = $(".portada-home").contents().contents();

  var nina = grupo.find(".nina");
  var zamba = grupo.find(".zamba");
  var texto = grupo.find(".texto");

  var brazoZ = grupo.find(".zamba.brazo-der");
  var brazoN = grupo.find(".nina.brazo-izq");

  var tl = gsap.timeline();
  tl.to(
    texto[0].children,
    {
      repeat: -1,
      yoyo: true,
      y: "20%",
      duration: 3,
      repeatDelay: 2,
      ease: "elastic",
      stagger: {
        // wrap advanced options in an object
        each: 0.1,
        from: "end",
      },
    },
    "<"
  );
  tl.to(
    brazoZ,
    {
      repeat: -1,
      yoyo: true,
      rotation: 15,
      x: "10%",
      duration: 0.9,
      ease: "circ.inOut",
    },
    "<"
  );
  tl.to(
    brazoN,
    {
      repeat: -1,
      yoyo: true,
      rotation: -15,
      y: "10%",
      duration: 0.9,
      transformOrigin: "50% 50%",
      ease: "circ.inOut",
    },
    "<"
  );
  gsap.to(zamba, {
    scrollTrigger: {
      trigger: zamba,
      toggleActions: "play pause reverse none",
      start: "clamp(20px 80%)",
      end: "bottom center",
    },
    rotation: 15,
    transformOrigin: "50% 50%",
  });
  gsap.to(nina, {
    scrollTrigger: {
      trigger: zamba,
      toggleActions: "play pause reverse none",
      start: "clamp(20px 80%)",
      end: "bottom center",
    },
    rotation: -15,
    y: "-5%",
    transformOrigin: "50% 50%",
  });
}

crearHome();
