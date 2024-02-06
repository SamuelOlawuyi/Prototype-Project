main();

function main() {
  class Player {
    constructor(deck_of_cards) {
      this.deck_of_cards = deck_of_cards;
      this.hand = [];
    }
    /**Picks a random card from deck */
    draw_a_card() {
      const getRandomInt = (max) => Math.floor(Math.random() * (max + 1));
      const card = this.deck_of_cards[getRandomInt(this.deck_of_cards.length - 1)];
      const pos = this.deck_of_cards.indexOf(card);
      this.hand.push(...this.deck_of_cards.splice(pos, 1));
    }
    drop_all_cards() {
      this.deck_of_cards.push(...this.hand);
      this.hand = [];
    }
    /**Player choose a card.*/
    choose_card = (card) => {
      const pos = this.deck_of_cards.indexOf(card);
      this.hand.push(...this.deck_of_cards.splice(pos, 1));
    }
  }

  startGame();

  function startGame() {
    const deck_of_cards = full_deck();

    const p1 = new Player(deck_of_cards);
    const p2 = new Player(deck_of_cards);
    const market = createCards(4, document.querySelectorAll('.cards')[2]);
    market.forEach(button => {
      button.addEventListener('click', function () {
        const timeout = 300;  // delay in seconds after button click
        if (turn === 'Player 1') {
          p1.choose_card(this.dataset.cardvalue);
          const p_html = createCards(1, document.querySelectorAll('.cards')[0]);
          cardHtml(this.dataset.cardvalue, p_html[0]);
          turn = 'Player 2';
          setTimeout(() => {
            document.getElementById('p1').innerHTML = '';
            document.getElementById('p2').innerHTML = '(active)';
          }, timeout);
        } else {
          p2.choose_card(this.dataset.cardvalue);
          const p_html = createCards(1, document.querySelectorAll('.cards')[1]);
          cardHtml(this.dataset.cardvalue, p_html[0]);
          turn = 'Player 1';
          setTimeout(() => {
            document.getElementById('p1').innerHTML = '(active)';
            document.getElementById('p2').innerHTML = '';
          }, timeout);
        }
        document.querySelectorAll('.pick > button').forEach(button => button.disabled = true);

        setTimeout(() => {
          document.querySelectorAll('.pick > button').forEach(button => button.disabled = false);
          generate_random_cards();
          if (p2.hand.length === 5) {
            document.querySelectorAll('.pick > button').forEach(button => button.remove());
            pokerHands(p1.hand, p2.hand);
          }
        }, timeout);

        setTimeout(() => market.forEach(button => {
          if (button !== this) flipCard.call(button);
        }), timeout / 2)
      });
      button.addEventListener('click', flipCard);
    })

    let turn = 'Player 1';
    document.getElementById('p1').innerHTML = '(active)';
    generate_random_cards();

    document.querySelector('.button > button').addEventListener('click', restartGame);

    /**Generate 4 random cards from deck */
    function generate_random_cards() {
      const table = new Player(deck_of_cards);
      for (let i = 0; i < 4; i++) {
        table.draw_a_card();
        market[i].dataset.cardvalue = table.hand[i];
        cardHtml(table.hand[i], market[i]);
        flipCard.call(market[i]);  // flip all cards to cover
      }
      table.drop_all_cards();
    }
  }

  /**Use card string to customise html element */
  function cardHtml(card, element) {
    element.innerHTML = getCardUnicode(card);
    let class_name;
    if (card.includes('D') || card.includes('H')) {
      class_name = 'red card';
    } else {
      class_name = 'black card';
    }
    element.className = class_name;
    element.dataset.class0 = class_name;
  }

  function flipCard() {
    if (this.innerHTML.codePointAt() === 127136) {
      this.innerHTML = getCardUnicode(this.dataset.cardvalue);
      this.className = this.dataset.class0;
    } else {
      this.innerHTML = '&#127136;';
      this.className = 'back card';
    }
  }

  function restartGame() {
    document.querySelectorAll('.card').forEach(elem => elem.remove());
    document.querySelectorAll('.game-area>div').forEach(div => div.className = 'player');
    document.querySelectorAll('.player>p').forEach(p => p.style.display = 'none');
    document.querySelectorAll('.player span').forEach(span => span.innerHTML = '');
    startGame();
  }

  /**Full 52 deck of cards */
  function full_deck() {
    const deck_of_cards = [];
    Array.from('23456789TJQKA').forEach(val => Array.from('SHDC').forEach(suit => deck_of_cards.push(val + suit)));
    return deck_of_cards;
  }

  /**Returns the number of occurence of an element in an array */
  function count(arr, elem) {
    return arr.filter(i => i === elem).length;
  }

  /**Compare two arrays -- arr1 > arr2*/
  function arrayCompare(arr1, arr2) {
    if (arr1.length !== arr2.length) throw new Error('Both array lengths must be equal');
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] > arr2[i]) return 1;
      if (arr1[i] < arr2[i]) return -1;
      if (arr1[i] === arr2[i]) continue;
    }
    return 0;
  }

  /**Creates a list of HTMLButtonElements of length k and append to parentElement. */
  function createCards(k, parentElement) {
    const card_array = [];
    for (let j = 0; j < k; j++) {
      const card_div = document.createElement('button');
      parentElement.append(card_div);
      card_array.push(card_div);
      card_div.className = 'card';
    }
    return card_array;
  }

  function getCardUnicode(card) {
    const card_unicodes = { cover: '&#127136;' };
    let jj = 0;
    for (let j = 10; j <= 13; j++) {
      let ii = 0;
      for (let i = 1; i <= 14; i++) {
        if (i === 12) continue;
        const key = 'A23456789TJQK'[ii] + 'SHDC'[jj];
        const hex = `1f0${j.toString(16)}${i.toString(16)}`;
        card_unicodes[key] = `&#${parseInt(hex, 16)};`;
        ii++;
      }
      jj++;
    }
    return card_unicodes[card];
  }

  function createPokerHtml(result, rName) {
    const [p1_span, p2_span] = document.querySelectorAll('.player span');
    for (let i = 0; i < 2; i++) {
      document.querySelectorAll('.player p')[i].innerHTML = rName[i];
    }

    if (result.includes('player1')) {
      p1_span.innerHTML = 'wins';
      p2_span.innerHTML = 'loses';
      p1_span.parentElement.parentElement.className = 'player winner';
      p2_span.parentElement.parentElement.className = 'player loser';
    } else if (result.includes('player2')) {
      p1_span.innerHTML = 'loses';
      p2_span.innerHTML = 'wins';
      p1_span.parentElement.parentElement.className = 'player loser';
      p2_span.parentElement.parentElement.className = 'player winner';
    } else p1_span.innerHTML = p2_span.innerHTML = 'draws';
    document.querySelectorAll('.player>p').forEach(p => p.style.display = 'block');
  }

  function pokerHands(hand1, hand2) {
    const [r1, r2] = [rank(hand1), rank(hand2)];

    let result
    if (r1.score > r2.score) result = 'player1 wins (rank)';
    else if (r1.score < r2.score) result = 'player2 wins (rank)';
    else {
      const [val1, val2] = [handvalue(hand1), handvalue(hand2)];
      const count_val1 = val1.map(i => count(val1, i));
      const count_val2 = val2.map(i => count(val2, i));
      const highest1 = val1[count_val1.indexOf(Math.max(...count_val1))];
      const highest2 = val2[count_val2.indexOf(Math.max(...count_val2))];

      if (highest1 > highest2) result = 'player1 wins (high value rank)';
      else if (highest1 < highest2) result = 'player2 wins (high value rank)';
      else {
        for (let i = 0; i < Math.max(...count_val1); i++) {
          val1.splice(val1.indexOf(highest1), 1);
          val2.splice(val2.indexOf(highest2), 1);
        }
        if (arrayCompare(val1, val2) > 0) result = 'player1 wins (highest cards)';
        else if (arrayCompare(val1, val2) < 0) result = 'player2 wins (highest cards)';
        else result = 'draw';
      }
    }
    createPokerHtml(result, [r1.name, r2.name]);
    return;

    /**Returns the rank of a hand in the card game of poker.*/
    function rank(hand) {
      if (Array.from('TJQKA').every(i => hand.map(j => j[0]).includes(i)) && isSameSuit()) {
        return { score: 10, name: 'Royal Flush' };

      } else if (isConsecutive() && isSameSuit()) {
        return { score: 9, name: 'Straight Flush' };

      } else if (nOfaKind(4) > 0) {
        return { score: 8, name: 'Four of a Kind' };

      } else if (nOfaKind(3) > 0 && nOfaKind(2)) {
        return { score: 7, name: 'Full House' };

      } else if (isSameSuit()) {
        return { score: 6, name: 'Flush' };

      } else if (isConsecutive()) {
        return { score: 5, name: 'Straight' };

      } else if (nOfaKind(3) > 0) {
        return { score: 4, name: 'Three of a Kind' };

      } else if (nOfaKind(2) > 1) {
        return { score: 3, name: 'Two Pairs' };

      } else return nOfaKind(2) > 0 ?
        { score: 2, name: 'One Pair' } : { score: 1, name: 'High Card' };

      /**Checks if card values are consecutive */
      function isConsecutive() {
        const card_values = Array.from('23456789TJQKA');
        const d = hand.map(i => card_values.indexOf(i[0]));
        d.sort((a, b) => a - b);
        const a = d.map(i => card_values[i]).join('');
        const b = card_values.join('');
        for (let i = 0; i < b.length - 5; i++) if (a === b.slice(i, i + 5)) return true;
        return false;
      }

      /**Returns number of occurrence of n of a kind. */
      function nOfaKind(n) {
        const kind = {};
        for (let i = 0; i < hand.length; i++) {
          val = hand[i][0];
          if (!Object.keys(kind).includes(val)) {
            kind[val] = 1;
          } else {
            kind[val]++;
          }
        }
        return count(Object.values(kind), n);
      }

      /**Checks if cards are same suit. */
      function isSameSuit() {
        const hand_suits = hand.map(i => i[1]);
        const unique = new Set(hand_suits);
        return Array.from(unique).length === 1;
      }
    }

    /**Converts cards in hand to values in descending order. */
    function handvalue(hand) {
      const val = hand.map(card => card[0]);
      const card_values = Array.from('23456789TJQKA');
      const lst = val.map(v => card_values.indexOf(v) + 2);
      return lst.map(i => i).sort((x, y) => y - x);
    }
  }
}