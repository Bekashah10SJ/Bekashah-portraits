
/* Bekashah Portraits — Public Art Gallery */

const artworks = [
  /*
  Add your artwork here:

  {
    title: "Graphite Portrait",
    description: "Realistic black-and-white pencil art",
    imageUrl: "images/portrait-1.jpg"
  },
  {
    title: "Portrait Study",
    description: "Handcrafted pencil shading",
    imageUrl: "images/portrait-2.jpg"
  }
  */
];

const artGrid = document.getElementById("artGrid");
const emptyMessage = document.getElementById("emptyMessage");

function makeText(tag, text, className) {
  const element = document.createElement(tag);
  element.textContent = text || "";

  if (className) element.className = className;

  return element;
}

function loadGallery() {
  if (!artGrid || !emptyMessage) return;

  artGrid.replaceChildren();

  if (artworks.length === 0) {
    emptyMessage.textContent =
      "Your portrait collection will appear here soon.";
    emptyMessage.hidden = false;
    return;
  }

  artworks.forEach(function (item) {
    const card = document.createElement("article");
    card.className = "art-card";

    if (item.imageUrl) {
      const image = document.createElement("img");
      image.src = item.imageUrl;
      image.alt = item.title || "Graphite portrait artwork";
      image.loading = "lazy";
      image.style.width = "100%";
      image.style.height = "auto";

      image.addEventListener("error", function () {
        image.alt = "Image unavailable. Please check the image path.";
      });

      card.appendChild(image);
    }

    card.appendChild(makeText("h3", item.title, ""));
    card.appendChild(makeText("p", item.description, ""));

    if (item.price) {
      card.appendChild(makeText("p", item.price, ""));
    }

    artGrid.appendChild(card);
  });

  emptyMessage.hidden = true;
}

loadGallery();
