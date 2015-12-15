var products = new Array();

function add()
{
	pname = prompt("Add product","Product");
	var d = new Date();
	var fd = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
	pdate = prompt("Expiration date", fd);
	var p = {name:pname, date:new Date(pdate)}; 
	products.push(p);
	console.log("Products: " + products.length);
	refresh();
	save();
}

function refresh()
{
	products.sort(function(a,b){
	  return a.date - b.date;
	});
	document.getElementById("main").innerHTML = "";
	var x = 0;
	do
	{
		var div = document.createElement("div");
		div.setAttribute("data-index", x);
		div.className = "product";
		div.innerHTML = products[x].name + "<span class='data'>" + products[x].date + "</span>";
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
