
export class Section { // Section)::;))))//
  constructor(cards, selector, renderer) {
    this.cards = cards;
    this.elements = document.querySelector(selector);
    this.renderer = renderer;
  }

  render() {
    this.cards.forEach(card => {
      this.renderer(card);
    })
  }

  addItem(cardElement) {
    this.elements.prepend(cardElement);
  };


}
