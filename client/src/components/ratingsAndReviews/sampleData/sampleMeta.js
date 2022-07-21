const sampleMeta = {
  "product_id": "71697",
  "ratings": {
    "1": "3",
    "2": "1",
    "3": "6",
    "4": "6",
    "5": "13"
  },
  "recommended": {
    "false": "5",
    "true": "24"
  },
  "characteristics": {
    "Size": {
      "id": 240582,
      // "value": "3.0869565217391304",
      "value": "1"
    },
    "Width": {
      "id": 240582,
      // "value": "3.0869565217391304",
      "value": "1"
    },
    "Fit": {
      "id": 240582,
      // "value": "3.0869565217391304",
      "value": "1"
    },
    "Length": {
      "id": 240583,
      // "value": "3.0434782608695652"
      "value": "4.5"
    },
    "Comfort": {
      "id": 240584,
      // "value": "3.0434782608695652"
      "value": "3.2"
    },
    "Quality": {
      "id": 240585,
      // "value": "3.2608695652173913"
      "value": "2.0"
    }
  }
};

const ratings = sampleMeta.ratings;
let totalNumberOfRatings = 0;
let totalRatings = 0;
let rating;
for (var key in ratings) {
  totalNumberOfRatings += parseInt(ratings[key]);
  totalRatings += (parseInt(key) * parseInt(ratings[key]));
}

rating = totalRatings / totalNumberOfRatings;
rating = Math.round(10 * rating) / 10;

module.exports = {sampleMeta, rating, totalNumberOfRatings};

