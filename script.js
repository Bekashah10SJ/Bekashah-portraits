
/* =====================================
   BEKASHAH PORTRAITS
   Public Art Gallery
   No login • No registration • No Firebase
   ===================================== */

// Add your artwork details here.
const artworks = [
  {
    title: "Portrait Study",
    description: "Realistic graphite pencil art",
    imageUrl: "images/portrait-1.jpg"
  }

  // Add more artworks by separating entries with commas:
  //
  // {
  //   title: "Graphite Portrait",
  //   description: "Black-and-white pencil shading",
  //   imageUrl: "images/portrait-2.jpg"
  // }
];

const artGrid = document.getElementById("artGrid");
const emptyMessage = document.getElementById("emptyMessage");

function createTextElement(tag, text, className = "") {
  const element = document.createElement(tag);
  element.textContent = text || "";

  if (className) {
    element.className = className;
  }

  return element;
}

function displayGallery() {
  if (!artGrid || !emptyMessage) return;

  artGrid.replaceChildren();

  if (artworks.length === 0) {
    emptyMessage.textContent = "New artwork coming soon.";
    emptyMessage.hidden = false;
    return;
  }

  let displayedCount = 0;

  artworks.forEach(function (artwork) {
    const card = document.createElement("article");
    card.className = "art-card";

    if (artwork.imageUrl) {
      const image = document.createElement("img");

      image.src = artwork.imageUrl;
      image.alt = artwork.title || "Graphite pencil portrait";
      image.loading = "lazy";

      image.addEventListener("error", function () {
        card.remove();

        if (artGrid.children.length === 0) {
          emptyMessage.textContent =
            "Artwork images could not be loaded. Check your image filenames.";
          emptyMessage.hidden = false;
        }
      });

      card.appendChild(image);
    }

    const details = document.createElement("div");
    details.className = "art-info";

    details.appendChild(
      createTextElement(
        "h3",
        artwork.title || "Untitled Portrait"
      )
    );

    details.appendChild(
      createTextElement(
        "p",
        artwork.description || "Handcrafted pencil artwork"
      )
    );

    if (artwork.price) {
      details.appendChild(
        createTextElement("p", artwork.price)
      );
    }

    card.appendChild(details);
    artGrid.appendChild(card);
    displayedCount++;
  });

  emptyMessage.hidden = displayedCount > 0;
}

displayGallery();
