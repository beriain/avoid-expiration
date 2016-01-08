var settings = new Array();



function initializeSettings()
{
  var s = {name:"notifications", value:0};
  settings.push(s);
  var s = {name:"daysForRed", value:3};
  settings.push(s);
  var s = {name:"daysForYellow", value:7};
  settings.push(s);
}

function saveSettings()
{
  if(document.getElementById("notify").checked)
    settings[0].value = 1;
  else
    settings[0].value = 0;

  settings[1].value = document.getElementById("daysForRed").value;

  settings[2].value = document.getElementById("daysForOrange").value;

  localStorage["settings"] = JSON.stringify(settings);
}

function readSettings()
{
  if(localStorage.getItem("settings") != null)
  {
    settings = JSON.parse(localStorage["settings"]);
    if(settings[0].value == 0)
      document.getElementById("notify").checked = false;
    else
      document.getElementById("notify").checked = true;

    document.getElementById("daysForRed").value = settings[1].value;

    document.getElementById("daysForOrange").value = settings[2].value;
  }
  else
  {
    initializeSettings();
    saveSettings();
  }
  translate();
}

function translate()
{
  if(navigator.language.substring(0, 2) == "eu")
	{
    document.title = "Ezarpenak";
		document.getElementById("title").innerHTML = "Ezarpenak";
    document.getElementById("titleNot").innerHTML = "JAKINARAZPENAK";
    document.getElementById("descNot").innerHTML = "Produkturen bat iraungitzera doanean jakinarazi";
    document.getElementById("titleDays").innerHTML = "EGUNAK";
    document.getElementById("descRed").innerHTML = "Egunak abisu gorrirako";
    document.getElementById("descOrange").innerHTML = "Egunak abisu laranjarako";
    document.getElementById("mSug").innerHTML = "Iradokizun zerrendatik hitzak ezabatu";
	}
  if(navigator.language.substring(0, 2) == "es")
  {
    document.title = "Configuración";
    document.getElementById("title").innerHTML = "Configuración";
    document.getElementById("titleNot").innerHTML = "NOTIFICACIONES";
    document.getElementById("descNot").innerHTML = "Notificar cuando algún producto vaya a caducar";
    document.getElementById("titleDays").innerHTML = "DÍAS";
    document.getElementById("descRed").innerHTML = "Días para aviso rojo";
    document.getElementById("descOrange").innerHTML = "Días para aviso naranja";
    document.getElementById("mSug").innerHTML = "Eliminar palabras de lista de sujerencias";
  }
}
