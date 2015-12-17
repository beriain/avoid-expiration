var products = new Array();
var translations = new Array();

function add()
{
	pname = prompt(translations[0],translations[1]);
	if(pname != null)
	{
		var d = new Date();
		var fd = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
		pdate = prompt("Expiration date", fd);
		if(pdate != null)
		{
			var p = {name:pname, date:new Date(pdate)};
			if(p.date != "Invalid Date")
			{
				products.push(p);
				refresh();
				save();
			}
			else alert(translations[3]);
		}
	}
}

function refresh()
{
	products.sort(function(a,b){
	  return new Date(a.date) - new Date(b.date);
	});
	document.getElementById("main").innerHTML = "";
	var x = 0;
	while(x < products.length);
	{
		var div = document.createElement("div");
		div.setAttribute("data-index", x);
		div.className = "product";
		div.innerHTML = products[x].name + "<span class='data'>" + new Date(products[x].date).toISOString().split('T')[0] + "</span>";
		if(daysToExpire(products[x].date) <= 3)
		{
			div.style.background = "#B90000";
			div.style.color = "white";
		}
		if(daysToExpire(products[x].date) >= 3 && daysToExpire(products[x].date) <= 7)
		{
			div.style.background = "#CD6723";
			div.style.color = "white";
		}
		div.onclick = function()
		{
			var index = this.getAttribute("data-index");
			d = confirm(translations[4] + products[index].name + "?");
			if (d == true)
			{
				products.splice(index, 1);
				refresh();
				save();
			}
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
    return Math.round(dte);
}

function translate()
{
	translations[0] = "Add product";
	translations[1] = "Product";
	translations[2] = "Expiration date";
	translations[3] = "Invalid date! Format must be YYYY-MM-DD";
	translations[4] = "Delete ";
	if(navigator.language.substring(0, 2) == "eu")
	{
		document.getElementById("title").innerHTML = "Iraungitzea ekiditu";
		translations[0] = "Produktua gehitu";
		translations[1] = "Produktua";
		translations[2] = "Iraungitze data";
		translations[3] = "Akatsa data sartzerakoan!formatua UUUU-HH-EE izan behar da";
		translations[4] = "Ezabatu ";
	}
	if(navigator.language.substring(0, 2) == "es")
	{
		document.getElementById("title").innerHTML = "Evitar caducidades";
		translations[0] = "Añadir producto";
		translations[1] = "Producto";
		translations[2] = "Fecha de caducidad";
		translations[3] = "Fecha no valida! El formato tiene que ser AAAA-MM-DD";
		translations[4] = "Eliminar ";
	}
}
