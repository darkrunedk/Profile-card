class ProfileCard extends HTMLElement {
    constructor() {
      // Always call super first in constructor
      super();
  
      // ShadowDOM
      this.attachShadow({mode: 'open'});

      // Element
      const card = document.createElement("div");
      card.setAttribute("class", "card");
      
      const front = document.createElement("div");
      front.setAttribute("class", "card-front");

      const frontImage = this.hasAttribute("front-img") ? this.getAttribute("front-img") : "";
      if (frontImage != "") {
          front.style.backgroundImage = `url(${frontImage})`;
      }

      const back = document.createElement("div");
      back.setAttribute("class", "card-back");

      const backHeader = this.hasAttribute("back-header") ? this.getAttribute("back-header") : "";
      if (backHeader != "") {
          const backHeaderEl = document.createElement("h2");
          backHeaderEl.textContent = backHeader;
          back.appendChild(backHeaderEl);
      }

      const backText = this.hasAttribute("back-text") ? this.getAttribute("back-text") : "";
      if (backText != "") {
          const backTextEl = document.createElement("p");
          backTextEl.textContent = backText;
          back.appendChild(backTextEl);
      }

      const hasFontAwesome = this.checkFontAwesome();

      const links = this.hasAttribute("back-links") ? this.getAttribute("back-links") : "";
      if (links != "") {
          let linkParts = links.split(';');
          if (linkParts.length > 0) {
              const backLinksWrapper = document.createElement("div");
              backLinksWrapper.setAttribute("class", "socials");

              const backLinksList = document.createElement("ul");
              linkParts.forEach(function(item, index) {
                  const listItem = document.createElement("li");
                  let itemClass = item.split('|');
                  if (itemClass.length == 2) {
                    const link = document.createElement("a");
                    link.setAttribute("class", itemClass[0]);
                    link.setAttribute("href", itemClass[1]);
                    link.setAttribute("target", "_blank");
                    
                    if (itemClass[0].includes("fa") && !hasFontAwesome) {
                        link.textContent = itemClass[1];
                    }
                    listItem.appendChild(link);
                  }
                  backLinksList.appendChild(listItem);
              });
              backLinksWrapper.appendChild(backLinksList);
              back.appendChild(backLinksWrapper);
          }
      }

      card.appendChild(front);
      card.appendChild(back);

      const styling = document.createElement("style");

      let height = 400;
      if (this.hasAttribute("height") && parseFloat(this.getAttribute("height")) > 0) {
          height = parseFloat(this.getAttribute("height"));
      }
      let width = 300;
      if (this.hasAttribute("width") && parseFloat(this.getAttribute("width")) > 0) {
          width = parseFloat(this.getAttribute("width"));
      }
      const direction = this.hasAttribute("direction") ? this.getAttribute("direction") : "vertical";

      styling.textContent = this.GetStyling(height, width, direction);
      this.shadowRoot.appendChild(styling);

      if (hasFontAwesome) {
          this.loadFontAwesome();
      }

      this.shadowRoot.appendChild(card);
    }
    checkFontAwesome() {
        const fontAwesomeKit = document.querySelector('script[src*="kit.fontawesome.com"]');
        if (fontAwesomeKit != null) {
            console.log("Font awesome kit detected!");
            return true;
        }

        return false;
    }
    loadFontAwesome() {
        const checkElement = async selector => {
            while (document.querySelector(selector) === null) {
                await new Promise(resolve => requestAnimationFrame(resolve));
            }
            return document.querySelector(selector);
        };

        checkElement("#fa-main").then((selector) => {
            this.shadowRoot.appendChild(selector.cloneNode(true));
            console.log(selector);
        });
    }
    GetStyling(height = 400, width = 300, direction = "vertical") {
        let styling =   "a { color: var(--link-color); text-decoration: none; }" +
                        ".card { height: " + height + "px; width: " + width + "px; transform-style: preserve-3d; perspective: 600px; transition: 0.5s; }" + 
                        ".card-front, .card-back { height: 100%; width: 100%; position: absolute; top: 0; left: 0; background-color: #000000; backface-visibility: hidden; transition: 0.5s; }" +
                        ".card-front { background-position: 50% 50%; background-size: cover; }" +
                        ".card-back { color: #ffffff; text-align: center; }" +
                        ".card-back .socials { position: fixed; bottom: 0; left: 0; width: 100%; background-color: rgba(255,255,255,.7); }" +
                        ".socials ul { display: flex; justify-content: center; align-items: center; list-style: none; margin: 0; padding: 0; font-size: 1.3rem; }" +
                        ".socials ul li { flex: 1; }";

        switch(direction) {
            case "horizontal":
                styling +=  ".card-front { transform: rotateY(0deg); }" +
                            ".card:hover .card-front { transform: rotateY(-180deg); }" +
                            ".card-back { transform: rotateY(180deg); }" +
                            ".card:hover .card-back { transform: rotateY(0deg); }";
                break;
            default:
                styling +=  ".card-front { transform: rotateX(0deg); }" +
                            ".card:hover .card-front { transform: rotateX(-180deg); }" +
                            ".card-back { transform: rotateX(180deg); }" +
                            ".card:hover .card-back { transform: rotateX(0deg); }";
                break;
        }

        return styling;
    }
  }

  customElements.define('profile-card', ProfileCard);