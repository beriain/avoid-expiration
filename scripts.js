var products = new Array();

function add()
{
	pname = prompt("Add product","Product");
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
			else alert("Invalid date! Format must be YYYY-MM-DD");
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
	do
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
			d = confirm("Delete " + products[index].name + "?");
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
	while(x < products.length);
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
}

function daysToExpire(date)
{
    var mpd = 1000 * 60 * 60 * 24;
    var mb = new Date(date).getTime() - new Date().getTime();
    var dte = mb / mpd;
    return Math.round(dte);
}
