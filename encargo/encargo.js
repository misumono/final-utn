let currentStep = 1;
let bullet;
let isValid=true;
const nextButtons = document.querySelectorAll(".next");
var inputs = document.querySelectorAll(`[data-step="${currentStep}"] input`);

const value = document.querySelector("#theP");
const cant = document.querySelector("#cantidad");
value.textContent = " "+cant.value+" = "+5*cant.value+"€";
cant.addEventListener("input", (event) => {
  if (event.target.value < 10) {
    value.textContent = " "+cant.value+" = "+5*cant.value+"€";
  } else {value.textContent = cant.value+" = "+5*cant.value+"€"}
});

function showStep(step) {
  document.querySelectorAll('.step').forEach((s) => {
    s.style.display = 'none';
  });

  document.querySelector(`[data-step="${step}"]`).style.display = 'flex';
}

function nextStep(next) {
  isValid = true;

  inputs.forEach(function(input) {
    console.log(isValid);
    if (input.value.trim() === '') {
      isValid = false;
    }
  });

  if (isValid) {
    currentStep = next;
    bullet = document.getElementById(`b${next}`);
    bullet.classList.add("on");
    inputs = document.querySelectorAll(`[data-step="${currentStep}"] input`);
    showStep(currentStep);
  } else {
    alert('Rellene todos los campos')
  }
}

function prevStep(prev) {
  currentStep = prev;
  inputs = document.querySelectorAll(`[data-step="${currentStep}"] input`);
  bullet = document.getElementById(`b${prev + 1}`);
  bullet.classList.remove("on");
  showStep(currentStep);
}

function makePdf () {

  var nombreTutor = document.getElementById('nombreTutor').value;
  var nombreAlumno = document.getElementById('nombreAlumno').value;
  var email = document.getElementById('email').value;
  var whatsapp = document.getElementById('whatsapp').value;
  var horario = document.getElementById('horario').value;
  var profesor = document.getElementById('profesor').value;
  var cantidad = document.getElementById('cantidad').value;

  var doc = new jsPDF();

  var texto = "Yo, "+nombreTutor+", tutor responsable de "+nombreAlumno+", solicito "+cantidad+" clases con el profesor "+profesor+" en el turno de "+horario+". Quiero negociar el medio de pago en mi correo "+email+" o mi numero de teléfono "+whatsapp+".";

  var x = 15; var y = 20;

  var maxWidth = 180;

  var lines = doc.splitTextToSize(texto, maxWidth);

  for (var i = 0; i < lines.length; i++) {
    doc.text(x, y, lines[i]);    
    y += 10;
  }

  doc.save("Recibo.pdf");
}

showStep(currentStep);