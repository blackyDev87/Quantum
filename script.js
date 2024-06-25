document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const nombre = document.getElementById("name");
  const asunto = document.getElementById("asunto");
  const telefono = document.getElementById("telefono");
  const email = document.getElementById("email");
  const consulta = document.getElementById("consulta");
  const parrafo = document.getElementById("warnings");
  const success = document.getElementById("success");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let warnings = "";
    let entrar = false;
    parrafo.innerHTML = "";
    success.innerHTML = "";

    // Validaciones
    if (nombre.value.length < 6) {
      warnings += "El nombre no es válido.<br>";
      entrar = true;
    }
    if (asunto.value.length < 6) {
      warnings += "El asunto no es válido.<br>";
      entrar = true;
    }
    if (!/^\d{10}$/.test(telefono.value)) {
      warnings += "El teléfono no es válido.<br>";
      entrar = true;
    }
    let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email.value)) {
      warnings += "El email no es válido.<br>";
      entrar = true;
    }
    if (consulta.value.length < 20) {
      warnings += "La consulta es muy corta.<br>";
      entrar = true;
    }

    // Mostrar mensajes
    if (entrar) {
      parrafo.innerHTML = warnings;
      setTimeout(() => {
        parrafo.innerHTML = "";
      }, 5000);
    } else {
      // Enviar formulario con Fetch API
      const formData = new FormData(form);
      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.status === 200) {
            success.innerHTML =
              "¡Muchas gracias por contactarnos, te responderemos a la brevedad!";
            form.reset(); // Limpiar el formulario después de enviarlo con éxito

            // Desaparecer los mensajes después de 5 segundos
            setTimeout(() => {
              success.innerHTML = "";
            }, 5000); // 5 segundos * 1000 milisegundos
          } else {
            throw new Error("Error al enviar el formulario");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          parrafo.innerHTML =
            "Hubo un error en el envío de tu consulta, por favor inténtalo más tarde.";
          // Desaparecer los mensajes después de 5 segundos
          setTimeout(() => {
            parrafo.innerHTML = "";
          }, 5000); // 5 segundos * 1000 milisegundos
        });
    }
  });

  window.onbeforeunload = () => {
    for (const form of document.getElementsByTagName("form")) {
      form.reset();
    }
  };
});

