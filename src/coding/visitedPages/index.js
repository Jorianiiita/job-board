class History {
  constructor() {
    this.visitedPagesMap = new Map();
  }

  visitPage(url) {
    const time = new Date().getTime();
    console.log('visitPage', time);
    this.visitedPagesMap.set(url, time);
  }

  getHistory() {
    // Convert the Map to an array of objects and sort it by timestamp in descending order
    let pagesArray = Array.from(this.visitedPagesMap.entries());
    pagesArray.sort((a, b) => b[1] - a[1]);

    // Remove duplicates from the sorted array
    let uniquePagesArray = [];
    let visitedUrls = new Set();
    for (let [url, timestamp] of pagesArray) {
      if (!visitedUrls.has(url)) {
        uniquePagesArray.push({ url, timestamp });
        visitedUrls.add(url);
      }
    }

    // Return the sorted array of unique recently visited pages
    return uniquePagesArray;
  }
}

const delay = (time) =>
  new Promise((resolve, reject) => setTimeout(() => resolve(), time));

// Add some example visited pages
(async () => {
  const tabHistory = new History();
  tabHistory.visitPage('https://example.com/page1');

  await delay(1000);
  tabHistory.visitPage('https://example.com/page2');

  await delay(1000);
  tabHistory.visitPage('https://example.com/page3');

  await delay(1000);
  tabHistory.visitPage('https://example.com/page1'); // Revisit page1

  await delay(1000);
  tabHistory.visitPage('https://example.com/page4');

  console.log(tabHistory.getHistory());
})();
