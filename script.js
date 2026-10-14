
/* Bekashah Portraits — Public Gallery */
/* No login, registration, or Firebase required. */

const artworks = [
  /*
  Add your artwork entries here:

  {
    title: "Portrait Study",
    description: "Realistic graphite pencil portrait",
    imageUrl: "images/portrait-1.jpg"
  },
  {
    title: "Graphite Art",
    description: "Black-and-white portrait shading",
    imageUrl: "images/portrait-2.jpg"
  }
  */
];

const artGrid = document.getElementById("artGrid");
const emptyMessage = document.getElementById("emptyMessage");

function makeText(tag, text) {
  const element = document.createElement(tag);
  element.textContent = text || "";
  return element;
}

function loadGallery() {
  if (!artGrid || !emptyMessage) return;

  artGrid.replaceChildren();

  if (artworks.length === 0) {
    emptyMessage.hidden = false;
    return;
  }

  artworks.forEach(function (artwork) {
    const card = document.createElement("article");
    card.className = "art-card";

    if (artwork.imageUrl) {
      const image = document.createElement("img");
      image.src = artwork.imageUrl;
      image.alt = artwork.title || "Pencil portrait";
      image.loading = "lazy";

      card.appendChild(image);
    }

    const details = document.createElement("div");
    details.className = "art-info";

    details.appendChild(
      makeText("h3", artwork.title || "Portrait")
    );

    details.appendChild(
      makeText("p", artwork.description || "Graphite pencil art")
    );

    if (artwork.price) {
      details.appendChild(makeText("p", artwork.price));
    }

    card.appendChild(details);
    artGrid.appendChild(card);
  });

  emptyMessage.hidden = true;
}

loadGallery();
