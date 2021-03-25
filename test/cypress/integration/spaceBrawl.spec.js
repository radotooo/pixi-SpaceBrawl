/* eslint-disable */
/// <reference types="cypress" />

describe('Space Brawl', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('should load game', () => {
    cy.getPixiStage().then((stage) => {
      expect(stage).to.exist;
    });
  });

  it('should display tutorial scene', () => {
    const element = 'tutorial';
    cy.getPixiStage()
      .getPixiElementByName(element)
      .then((el) => {
        expect(el).to.exist;
      });
  });

  it('should display all slides', () => {
    const element = 'button';

    cy.getPixiStage()
      .getPixiElementByName(element)
      .then((el) => {
        const slidesCount = el.parent._slides.length;

        for (let index = 0; index < slidesCount; index++) {
          cy.wait(1000).then(() => {
            let num = el.parent._activeSlideIndex;
            expect(num, 'active slide shoud change').to.equal(index);
            el.emit('click');
          });
        }
      });
  });

  it('should display countdown scene', () => {
    const element = 'tutorial';
    cy.getPixiStage()
      .getPixiElementByName(element)
      .then((el) => {
        el.emit('tutorial_done');
      });

    cy.getPixiStage()
      .getPixiElementByName('countdown')
      .then((el) => {
        expect(el).to.exist;
      });
  });

  it('button click should change scene to countdown', () => {
    const element = 'tutorial';

    cy.getPixiStage()
      .getPixiElementByName(element)
      .then((el) => el.emit('tutorial_done'));

    cy.getPixiStage()
      .getPixiElementByName('play')
      .then((el) => {
        el.emit('game_over', { winner: '2' });
      });

    cy.getPixiStage().getPixiElementByName('button').pixiClick();

    cy.getPixiStage()
      .getPixiElementByName('countdown')
      .then((el) => {
        expect(el._name, 'current scene name').to.equal('countdown');
      });
  });
});
