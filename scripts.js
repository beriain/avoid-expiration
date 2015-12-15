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
			products.push(p);
			refresh();
			save();
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
		if(new Date(products[x].date).getDate() - new Date().getDate() <= 3)
		{
			div.style.background = "#B90000";
			div.style.color = "white";
		}
		if(new Date(products[x].date).getDate() - new Date().getDate() >= 3 && new Date(products[x].date).getDate() - new Date().getDate() <= 7)
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

function read()
{
	products = JSON.parse(localStorage["products"]);
	refresh();
}
