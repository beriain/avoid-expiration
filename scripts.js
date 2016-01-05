var products = new Array();
var translations = new Array();
var indexToDelete = 0;
var settings = new Array();

function showAddInput()
{
	document.getElementById("input").style.display = "block";
	document.getElementById("product").value = "";
	document.getElementById("product").placeholder = "";
	document.getElementById("product").focus();
	var d = new Date();
	document.getElementById("year").value = d.getFullYear();
	document.getElementById("month").value = d.getMonth()+1;
	document.getElementById("day").value = d.getDate();

	/*document.getElementById("header").style.opacity = "0.6";
	document.getElementById("main").style.opacity = "0.6";*/
}

function add()
{
	if(document.getElementById("product").value != "")
	{
		var pname = document.getElementById("product").value;
		var pdate = document.getElementById("year").value
			+"-"+checkDate(document.getElementById("month").value)
			+"-"+checkDate(document.getElementById("day").value);
		var p = {name:pname, date:new Date(pdate)};
		products.push(p);
		document.getElementById("input").style.display = "none";
		refresh();
		save();
	}
	else
	{
		document.getElementById("product").placeholder = translations[1];
		document.getElementById("product").focus();
	}

}

function checkDate(d)
{
	if(d < 10) d = "0"+d;
	return d;
}

function refresh()
{
	products.sort(function(a,b){
	  return new Date(a.date) - new Date(b.date);
	});
	document.getElementById("main").innerHTML = "";
	var x = 0;
	while(x < products.length)
	{
		var div = document.createElement("div");
		div.setAttribute("data-index", x);
		div.className = "product";
		div.innerHTML = products[x].name + "<span class='data'>" + new Date(products[x].date).toISOString().split('T')[0] + "</span>";
		if(daysToExpire(products[x].date) <= settings[1].value)
		{
			div.style.background = "#B90000";
			div.style.color = "white";
		}
		if(daysToExpire(products[x].date) > settings[1].value && daysToExpire(products[x].date) <= settings[2].value)
		{
			div.style.background = "#CD6723";
			div.style.color = "white";
		}
		div.onclick = function()
		{
			var index = this.getAttribute("data-index");
			document.getElementById("pname").innerHTML = products[index].name;
			indexToDelete = index;
			document.getElementById("delete").style.display = "block";
		}
		document.getElementById("main").appendChild(div);
		x++;
	}
}

function save()
{
	localStorage["products"] = JSON.stringify(products);
}

function start()
{
	try
	{
		settings = JSON.parse(localStorage["settings"]);
		products = JSON.parse(localStorage["products"]);
		refresh();
	}
	catch(e)
	{
		console.log(e);
	}
	finally
	{
		translate();
	}
}

function daysToExpire(date)
{
    var mpd = 1000 * 60 * 60 * 24;
    var mb = new Date(date).getTime() - new Date().getTime();
    var dte = mb / mpd;
    return Math.round(dte)+1;
}

function translate()
{
	translations[0] = "Add product";
	translations[1] = "Product name is empty!";
	translations[2] = "Expiration date";
	translations[3] = "Invalid date! Format must be YYYY-MM-DD";
	translations[4] = "Delete ";
	if(navigator.language.substring(0, 2) == "eu")
	{
		document.getElementById("title").innerHTML = "Iraungitzea ekiditu";
		document.getElementById("badd").innerHTML = "Gehitu";
		document.getElementById("bcancel1").innerHTML = "Utzi";
		document.getElementById("bcancel2").innerHTML = "Utzi";
		document.getElementById("bdelete").innerHTML = "Ezabatu";
		document.getElementById("tproduct").innerHTML = "Produktua";
		document.getElementById("texpdate").innerHTML = "Iraungitze data";
		document.getElementById("tdelete").innerHTML = "Ezabatu";
		translations[0] = "Produktua gehitu";
		translations[1] = "Produktuaren izena hutsik dago!";
		translations[2] = "Akatsa data sartzerakoan!formatua UUUU-HH-EE izan behar da";
	}
	if(navigator.language.substring(0, 2) == "es")
	{
		document.getElementById("title").innerHTML = "Evitar caducidades";
		document.getElementById("badd").innerHTML = "Añadir";
		document.getElementById("bcancel1").innerHTML = "Cancelar";
		document.getElementById("bcancel2").innerHTML = "Cancelar";
		document.getElementById("bdelete").innerHTML = "Eliminar";
		document.getElementById("tproduct").innerHTML = "Producto";
		document.getElementById("texpdate").innerHTML = "Fecha de caducidad";
		document.getElementById("tdelete").innerHTML = "Eliminar";
		translations[0] = "Añadir producto";
		translations[1] = "El nombre de producto esta vacio!";
		translations[2] = "Fecha no valida! El formato tiene que ser AAAA-MM-DD";
	}
}

function cancel()
{
	document.getElementById("input").style.display = "none";
	document.getElementById("delete").style.display = "none";
}

function deleteProduct()
{
	products.splice(indexToDelete, 1);
	refresh();
	save();
	document.getElementById("delete").style.display = "none";
}
