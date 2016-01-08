var indexToDelete;
var suggestions;

function loadSuggestions()
{
  if(localStorage.getItem("suggestions") != null)
  {
    suggestions = JSON.parse(localStorage["suggestions"]);
    document.getElementById("suggestions").innerHTML = "";
    suggestions.sort();
    for(x = 0; x < suggestions.length; x++)
    {
      var div = document.createElement("div");
  		div.setAttribute("data-index", x);
  		div.className = "suggestion";
      div.innerHTML = suggestions[x];
      div.onclick = function()
      {
        var index = this.getAttribute("data-index");
        document.getElementById("sname").innerHTML = suggestions[index];
        indexToDelete = index;
        document.getElementById("delete").style.display = "block";
      }
      document.getElementById("suggestions").appendChild(div);
    }
  }
  translate();
  /**/
  /*try
  {
    suggestions = JSON.parse(localStorage["suggestions"]);
    document.getElementById("suggestions").innerHTML = "";
    suggestions.sort();
    for(x = 0; x < suggestions.length; x++)
    {
      var div = document.createElement("div");
  		div.setAttribute("data-index", x);
  		div.className = "suggestion";
      div.innerHTML = suggestions[x];
      div.onclick = function()
      {
        var index = this.getAttribute("data-index");
        document.getElementById("sname").innerHTML = suggestions[index];
        indexToDelete = index;
        document.getElementById("delete").style.display = "block";
      }
      document.getElementById("suggestions").appendChild(div);
    }
  }
  catch(e)
  {
    console.log(e);
  }*/
}

function cancel()
{
	document.getElementById("delete").style.display = "none";
}

function deleteSuggestion()
{
	suggestions.splice(indexToDelete, 1);
	localStorage["suggestions"] = JSON.stringify(suggestions);
  loadSuggestions();
	document.getElementById("delete").style.display = "none";
}

function translate()
{
  if(navigator.language.substring(0, 2) == "eu")
	{
    document.title = "Iradokizunak kudeatu";
		document.getElementById("title").innerHTML = "Iradokizunak kudeatu";
    document.getElementById("bdelete").innerHTML = "Ezabatu";
		document.getElementById("tdelete").innerHTML = "Ezabatu";
    document.getElementById("bcancel2").innerHTML = "Utzi";
	}
  if(navigator.language.substring(0, 2) == "es")
  {
    document.title = "Gestionar sugerencias";
		document.getElementById("title").innerHTML = "Gestionar sugerencias";
    document.getElementById("bdelete").innerHTML = "Eliminar";
		document.getElementById("tdelete").innerHTML = "Eliminar";
    document.getElementById("bcancel2").innerHTML = "Cancelar";
  }
}
