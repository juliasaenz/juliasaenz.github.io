$(document).ready(function () {
  $("#contenedor-junio-20").load("../assets/eventos/6-20.svg", function () {
    var grupo = $(this).contents().contents();
    var elemento = grupo.find(".brazo.derecho");
    var fondo = grupo.find(".cubo");
    var cuerpo = grupo.find(".ilustracion");
    console.log("Encontré estos", elemento, fondo);
    // Animate fade-in effect using Velocity.js and jQuery
    $(grupo).hover(
      function () {
        console.log("entre aca");
        $(elemento).velocity(
          {
            rotateX: "15deg",
            rotateY: "15deg",
            rotateZ: "0.4deg",
          },
          { loop: 3 }
        );

        $(cuerpo).velocity({
            rotateZ: "-3deg",
            scaleX: "105%",
            scaleY: "105%",
        });

        $(fondo).velocity({
          scaleX: "105%",
          scaleY: "105%",
          translateX: "-5%",
        });
      },
      function () {
        //termina el hover
          $(fondo).velocity("reverse");
          $(cuerpo).velocity("reverse")
      }
    );
  });
});
