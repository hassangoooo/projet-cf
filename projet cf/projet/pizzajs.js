
  const nomPizza = document.getElementById("main");
  const btncomm = document.getElementsByClassName("commande");
  

let dataJson = [];


const pizza = [
  fetch("4saison.JSON"),
  fetch("fromage.JSON"),
  fetch("carbonara.JSON"),
  fetch("napoli.JSON"),
  fetch("pizzasaumon.JSON"),
  fetch("margherita.JSON")
];
console.log(pizza);

Promise.all(pizza.map(p => p.then(response => response.json())))
  .then(pizzaData => {
      pizzaData.forEach(afficherLesdonnees);
  })
function afficherLesdonnees(data){
  for (let i = 0; i < data.length; i++) {
    
   
  let footer  =document.createElement("div");
  let div1    = document.createElement("div");
  let image   = document.createElement("img");
  let div2    = document.createElement("div");
  let h3      = document.createElement("h3");
  let boutton = document.createElement("a");
  footer.setAttribute("class", "card-footer");
  h3.setAttribute("class", "card-title");
  h3.textContent = data[i].nom;
  div1.setAttribute("class", "card");
  image.setAttribute("class", "card-img-top");
  div1.setAttribute("style", "width: 20rem;");
  image.setAttribute("style", "height: 10rem;");
  image.setAttribute("src",data[i].image) ;
 
  div2.setAttribute("class", "card-body");
  boutton.setAttribute("class","btn btn-primary" );
  boutton.textContent = "Ajouter" ;
 
 
 
  div1.appendChild(image);
  div2.appendChild(h3);
 
 
 
  div1.appendChild(div2);
  nomPizza.appendChild(div1);
  for (let j = 0; j < data[i].ingredients.length; j++) {
    let para    = document.createElement("p");
    para.setAttribute("class", "card-text");
    para.textContent = data[i].ingredients[j];
    div2.appendChild(para);
  }
  for (let key of Object.keys(data[i].options_diet)) {
    var value = data[i].options_diet[key];
 
    //créer un element avec la clé (halal, vege,...) + un element valeur
    const halal = document.createElement("h5");
    halal.textContent = key + "    :    " + value;
    div2.appendChild(halal);
  }
  let tarifDev = document.createElement("h1");
  tarifDev.textContent = data[i].prix + data[i].devise;
  footer.appendChild(tarifDev)
  footer.appendChild(boutton);
  div1.appendChild(footer);
 }
}

function ajouterAuPanier(event) {
  
  const pizzaIndex = event.target.dataset.pizzaIndex;
  const pizzaSelectionee = pizzasFiltrees[pizzaIndex];

  // Vérifier si la pizza existe
  if (!pizzaSelectionee) {
    console.error("Pizza non trouvée");
    return;
  }

  // Créer les éléments du panier
  const panierItem = document.createElement("div");
  panierItem.className = "panier-item d-flex align-items-center mb-2";

  const image = document.createElement("img");
  image.style.height = "5rem";
  image.style.width = "5rem";
  image.style.objectFit = "cover";
  image.src = pizzaSelectionee.image;
  image.alt = pizzaSelectionee.nom;

  const details = document.createElement("div");
  details.className = "ms-2";

  const titre = document.createElement("div");
  titre.className = "fw-bold";
  titre.textContent = pizzaSelectionee.nom;

  const prix = document.createElement("div");
  prix.className = "text-muted";
  prix.textContent = `${pizzaSelectionee.prix}${pizzaSelectionee.devise}`;

  const baseInfo = document.createElement("div");
  baseInfo.className = "text-muted small";
  baseInfo.textContent = `Base : ${pizzaSelectionee.base}`;

  details.append(titre, prix, baseInfo);
  panierItem.append(image, details);
  contenu.appendChild(panierItem);
}

// Charger les données au chargement de la page
document.addEventListener('DOMContentLoaded', recupererDesdonnees);
  
