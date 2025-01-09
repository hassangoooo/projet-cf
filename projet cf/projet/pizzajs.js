let panier = [];
let montantTotal = 0;

const nomPizza = document.getElementById("main");
const btnPanier = document.getElementById("commande"); 
const maList   = document.getElementById("ul");
const monFiltre = document.getElementById("mon-filtre");

maList.appendChild(btnPanier);

// Afficher le nombre d'articles dans le panier
const compteurPanier = document.createElement("span");
compteurPanier.setAttribute("class", "badge");
compteurPanier.textContent = "0";
btnPanier.appendChild(compteurPanier);

const pizza = [
  fetch("4saison.json"),
  fetch("fromage.json"),
  fetch("carbonara.json"),
  fetch("napoli.json"),
  fetch("pizzasaumon.json"),
  fetch("margherita.json")
];

Promise.all(pizza.map(p => p.then(response => response.json())))
  .then(pizzaData => {
    window.pizzaData = pizzaData.flat(); 
    afficherLesdonnees(window.pizzaData);
  });

monFiltre.addEventListener('change', () => filterTaches(window.pizzaData));

function filterTaches(data) {
  const filtreActif = monFiltre.selectedIndex;
 nomPizza.innerHTML = "";
  data.forEach(pizza => {
    if (filtreActif === 0 || (filtreActif === 1 && pizza.base === "tomate") || (filtreActif === 2 && pizza.base === "creme")) {
      afficherLesdonnees([pizza]);
    }
  });
}

function afficherLesdonnees(data) {
  data.forEach(pizza => {
    let footer = document.createElement("div");
    let div1 = document.createElement("div");
    let image = document.createElement("img");
    let div2 = document.createElement("div");
    let h3 = document.createElement("h3");
    let h2 = document.createElement("h2");
    let boutton = document.createElement("button");

    footer.setAttribute("class", "card-footer");
    h3.setAttribute("class", "card-title");
    h3.textContent = pizza.nom;
    h2.textContent = pizza.base;
    div1.setAttribute("class", "card");
    image.setAttribute("class", "card-img-top");
    div1.setAttribute("style", "width: 20rem;");
    image.setAttribute("style", "height: 10rem;");
    image.setAttribute("src", pizza.image);

    div2.setAttribute("class", "card-body");
    boutton.setAttribute("class", "btn btn-primary");
    boutton.textContent = "Ajouter ";

    div1.appendChild(image);
    div2.appendChild(h3);
    div2.appendChild(h2);
    div1.appendChild(div2);
    nomPizza.appendChild(div1);

    pizza.ingredients.forEach(ingredient => {
      let para = document.createElement("p");
      para.setAttribute("class", "card-text");
      para.textContent = ingredient;
      div2.appendChild(para);
    });

    Object.keys(pizza.options_diet).forEach(key => {
      let value = pizza.options_diet[key];
      const option = document.createElement("h5");
      option.textContent = `${key} : ${value}`;
      div2.appendChild(option);
    });

    let tarifDev = document.createElement("h1");
    tarifDev.textContent = `${pizza.prix}${pizza.devise}`;
    footer.appendChild(tarifDev);
    footer.appendChild(boutton);
    div1.appendChild(footer);

    boutton.addEventListener('click', () => ajouterAuPanier(pizza));
  });
}

function ajouterAuPanier(pizza) {
  panier.push(pizza);
  montantTotal += parseFloat(pizza.prix);
  compteurPanier.textContent = panier.length;
}

function afficherPanier() {
  nomPizza.innerHTML = "";

  const divPanier = document.createElement('div');
  divPanier.setAttribute('class', 'panier-container');

  const titre = document.createElement('h2');
  titre.textContent = 'Votre Panier';
  divPanier.appendChild(titre);

  if (panier.length === 0) {
    const msgVide = document.createElement('p');
    msgVide.textContent = 'Votre panier est vide';
    divPanier.appendChild(msgVide);
  } else {
    panier.forEach((pizza, index) => {
      const Panier1 = document.createElement('div');
      Panier1.setAttribute('class', 'panier');

      const img = document.createElement('img');
      img.setAttribute('src', pizza.image);
      img.setAttribute('style', 'width: 100px;');

      const nom = document.createElement('h3');
      nom.textContent = pizza.nom;

      const prix = document.createElement('p');
      prix.textContent = `${pizza.prix}${pizza.devise}`;

      const btnSupprimer = document.createElement('button');
      btnSupprimer.setAttribute('class', 'btn btn-danger');
      btnSupprimer.textContent = 'Supprimer';
      btnSupprimer.addEventListener('click', () => supprimerDuPanier(index));

      Panier1.appendChild(img);
      Panier1.appendChild(nom);
      Panier1.appendChild(prix);
      Panier1.appendChild(btnSupprimer);
      divPanier.appendChild(Panier1);
    });

    const total = document.createElement('h3');
    total.textContent = `Total: ${montantTotal.toFixed(2)}€`;
    divPanier.appendChild(total);

    const btnCommander = document.createElement('button');
    btnCommander.setAttribute('class', 'btn btn-success');
    btnCommander.textContent = 'Commander';
    btnCommander.addEventListener('click', () => passerCommande());
    divPanier.appendChild(btnCommander);
  }

  const btnRetour = document.createElement('button');
  btnRetour.setAttribute('class', 'btn btn-primary');
  btnRetour.textContent = 'Retour aux pizzas';
  btnRetour.addEventListener('click', () => {
    nomPizza.innerHTML = "";
    afficherLesdonnees(window.pizzaData);
  });
  divPanier.appendChild(btnRetour);

  nomPizza.appendChild(divPanier);
}

function supprimerDuPanier(index) {
  montantTotal -= parseFloat(panier[index].prix);
  panier.splice(index, 1);
  compteurPanier.textContent = panier.length;
  afficherPanier();
}

function passerCommande() {
  if (panier.length > 0) {
    alert(`Commande confirmée! Montant total: ${montantTotal.toFixed(2)}€`);
    panier = [];
    montantTotal = 0;
    compteurPanier.textContent = "0";
    afficherPanier();
  }
}

btnPanier.addEventListener('click', afficherPanier);