const { model } = require("mongoose");

const calcBid = (bids) => {
  let endValue = 0;
  let pesel = "";
  bids.forEach((bid) => {
    if (endValue <= bid.bidValue) {
      endValue = bid.bidValue;
      pesel = bid.pesel;
    }
  });

  return pesel;
};

const getUserWiningAuctions = (posts, pesel) => {
  const winingAuctions = [];
  posts.forEach((post) => {
    const peselHighest = calcBid(post.bids);
    if (peselHighest === pesel) {
      winingAuctions.push(post);
    }
  });

  return winingAuctions;
};

module.exports = getUserWiningAuctions;
