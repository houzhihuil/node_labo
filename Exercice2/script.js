var listeProduit;
var panier = new Array();
const TAUX_TPS = 0.05;
const TAUX_TVQ = 0.09975;

function ajouterItem(nomDeProduit, quantite, prix){
    let nouvelleLigne = "<tr>";
    nouvelleLigne += "<td>" + nomDeProduit + "</td>";
    nouvelleLigne += "<td>" + quantite + "</td>";
    nouvelleLigne += "<td>" + prix + "</td>";
    nouvelleLigne += "</tr>";

    let ancienContenuDeTable = document.getElementById("corpsTableau").innerHTML;
    let contenuApresAjouterNouvelLigne = ancienContenuDeTable + nouvelleLigne;
    document.getElementById("corpsTableau").innerHTML = contenuApresAjouterNouvelLigne;

    let nbItemPanier = parseInt(document.getElementById("idItem").innerHTML);
    nbItemPanier += parseInt(quantite);
    document.getElementById("idItem").innerHTML = nbItemPanier;
}
/*-----------------------------------------------*/
function afficheFacture(){
    document.getElementById("zoneContenuItem").style.display = "none";
    document.getElementById("zoneContenuFacture").style.display = "block";
    document.getElementById("zoneContenuFacture").style.height = "85%";
	
	var sousTotal = 0;	
	var noeudTBody = document.querySelector("#corpsTableau");
	panier.forEach(function(ligneCommande, index){		
		var nomDeProduit = ligneCommande.produit.description;
		var quantite = ligneCommande.quantite;
		var prix = ligneCommande.produit.prix;
		sousTotal += parseInt(quantite) * parseFloat(prix);
				
		var noeudTr = document.createElement("tr");
		var noeudTd1 = document.createElement("td");
		var contenuTd1 = document.createTextNode(nomDeProduit); 
		noeudTd1.appendChild(contenuTd1);
		noeudTr.appendChild(noeudTd1);
				
		var noeudTd2 = document.createElement("td");		
		var noeudTd21 = document.createElement("input");
		noeudTd21.setAttribute("type", "text");
		noeudTd21.setAttribute("value", quantite);	
		noeudTd21.addEventListener("change", function(){
			var nouvelleQte = this.value;
			panier[index].quantite = nouvelleQte;			
			enregistrerPanier();
			calculerFacture();
		});		
		noeudTd2.appendChild(noeudTd21);
		noeudTr.appendChild(noeudTd2);
		
		var noeudTd3 = document.createElement("td");
		var contenuTd3 = document.createTextNode(prix);
		noeudTd3.appendChild(contenuTd3);
		noeudTr.appendChild(noeudTd3);				
		
		noeudTBody.appendChild(noeudTr);
	});
	var totalTPS = sousTotal * TAUX_TPS;
	var totalTVQ = sousTotal * TAUX_TVQ;
	var total = sousTotal + totalTPS + totalTVQ;
	document.querySelector("#idSousTotal").innerHTML = sousTotal.toFixed(2) + " $";
	document.querySelector("#idTPS").innerHTML = totalTPS.toFixed(2) + " $";
	document.querySelector("#idTVQ").innerHTML = totalTVQ.toFixed(2) + " $";
	document.querySelector("#idTotal").innerHTML = total.toFixed(2) + " $";	
}

function calculerFacture(){	
	var sousTotal = 0;
	var totalQte = 0;
	panier.forEach(function(ligneCommande){
		/*
		  un petit rappel pour la ligneCommande
		  ligneCommande = {produit : pr, quantite : qte};
		*/		
		var quantite = ligneCommande.quantite;
		var prix = ligneCommande.produit.prix;
		sousTotal += parseInt(quantite) * parseFloat(prix);
		totalQte += parseInt(quantite);
	});
	var totalTPS = sousTotal * TAUX_TPS;
	var totalTVQ = sousTotal * TAUX_TVQ;
	var total = sousTotal + totalTPS + totalTVQ;
	document.querySelector("#idSousTotal").innerHTML = sousTotal.toFixed(2) + " $";
	document.querySelector("#idTPS").innerHTML = totalTPS.toFixed(2) + " $";
	document.querySelector("#idTVQ").innerHTML = totalTVQ.toFixed(2) + " $";
	document.querySelector("#idTotal").innerHTML = total.toFixed(2) + " $";	
	
	//Modification du panier
	document.getElementById("idItem").innerHTML = totalQte;
}

function ajouterItem(ligneCommande){
	panier.push(ligneCommande);
	enregistrerPanier(); //ajoute le panier dans un cookie
	var quantite = ligneCommande.quantite ;
	var nbItemPanier = parseInt(document.getElementById("idItem").innerHTML);
    nbItemPanier += parseInt(quantite);
    document.getElementById("idItem").innerHTML = nbItemPanier;
}

function enregistrerPanier(){
	if(typeof(localStorage) == "undefined"){
		alert("votre navigateur ne supporte pas les cookies");
		return;
	}
	localStorage.setItem("panier", JSON.stringify(panier));
}

function chargerPanier(){
	if(typeof(localStorage) == "undefined"){
		alert("votre navigateur ne supporte pas les cookies");
		return;
	}
	if(!localStorage.panier){
		return;
	}
	panier = JSON.parse(localStorage.getItem("panier"));
	var totalQte = 0;
	panier.forEach(function(ligneCommande){		
		var quantite = ligneCommande.quantite;
		
		totalQte += parseInt(quantite);
	});
	var nbItemPanier = parseInt(document.getElementById("idItem").innerHTML);
    nbItemPanier += totalQte;
    document.getElementById("idItem").innerHTML = nbItemPanier;
}

function chargerZoneItem(){	
	chargerPanier();
	var xhr;				
	try{
		xhr = new ActiveXObject("Msxml2.XMLHTTP");		
	}
	catch(e){		
		try{
			xhr = new ActiveXObject("Microsoft.XMLHTTP");			
		}
		catch(e1){			
			try{
				xhr = new XMLHttpRequest();				
			}
			catch(e2){
				xhr = false;				
			}
		}
	}	
	
	//Établir la connexion avec le serveur
	xhr.open("GET", "produits.json", false);
	xhr.send();
	
	//Récupérer la réponse du serveur
	if(xhr.readyState == 4){		
		var reponse = xhr.responseText;
		var objJSON = JSON.parse(reponse);
		listeProduit = objJSON.liste;
		afficherListeProduit();
	}
}

function afficherListeProduit(){
	listeProduit.forEach(function(produitActuel){
		var description = produitActuel.description;
		var image = produitActuel.image;
		var prix = produitActuel.prix;
		
		var noeudDivItem = document.createElement("div");
		noeudDivItem.setAttribute("class", "item");
		
		var noeudImage = document.createElement("img");
		noeudImage.setAttribute("class", "imageItem");
		noeudImage.setAttribute("src", image);
		noeudDivItem.appendChild(noeudImage);
		noeudImage.addEventListener("click", function(){
			afficherDetail(produitActuel);
		});
		
		
		var noeudDescription = document.createElement("div");
		noeudDescription.setAttribute("class", "description");		
		noeudDescription.appendChild(document.createTextNode(description));
		noeudDivItem.appendChild(noeudDescription);
		
		var noeudPrix = document.createElement("div");
		noeudPrix.setAttribute("class", "prix");		
		noeudPrix.appendChild(document.createTextNode(prix));
		noeudDivItem.appendChild(noeudPrix);
		
		var noeudBtnAjouter = document.createElement("div");
		noeudBtnAjouter.setAttribute("class", "ajouter");		
		noeudBtnAjouter.appendChild(document.createTextNode("Ajouter"));
		noeudDivItem.appendChild(noeudBtnAjouter);
		noeudBtnAjouter.produit = produitActuel;
		noeudBtnAjouter.addEventListener("click", function(){
			var monProduit = this.produit;
			var ligneCommande = {produit : monProduit, quantite : "1" };
			ajouterItem(ligneCommande);			
		});
		
		document.querySelector("#zoneContenuItem").appendChild(noeudDivItem);
	});		
}

function afficherDetail(unProduit){
	document.querySelector("#zoneDetail").style.display = "block";
	document.querySelector("#uneImage").src = unProduit.image;	
	document.querySelector("#uneDescription").innerHTML = unProduit.description;
	document.querySelector("#unPrix").innerHTML = unProduit.prix;
	document.querySelector("#unDetail").innerHTML = unProduit.details;
	
	document.querySelector("#unAjout").addEventListener("click", function(){
		var qte = document.querySelector("#txtQuantite").value;
		var ligneCommande = {produit : unProduit, quantite : qte};
		ajouterItem(ligneCommande);		
		document.querySelector("#zoneDetail").style.display = "none";	
		document.querySelector("#txtQuantite").value = "1";
	});
}

function fermerDialogue(){
	document.querySelector("#zoneDetail").style.display = "none";
}