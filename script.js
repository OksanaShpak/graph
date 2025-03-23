const account = {
  balances: [
    { balance: 85, date: '2024-09-16' },
    { balance: 90, date: '2024-09-15' },
    { balance: 100, date: '2024-09-14' },
    { balance: 25, date: '2024-09-13' },
    { balance: 50, date: '2024-09-12' },
    { balance: 55, date: '2024-09-11' },
    { balance: 65, date: '2024-09-10' },
    { balance: 65, date: '2024-09-09' },
    { balance: 60, date: '2024-09-08' },
    { balance: 40, date: '2024-09-07' },
    { balance: 30, date: '2024-09-06' },
    { balance: 20, date: '2024-09-05' },
    { balance: 15, date: '2024-09-04' },
    { balance: 10, date: '2024-09-03' },
    { balance: 5, date: '2024-09-02' },
  ],
  id: 1234,
  name: 'Transaction Account'
}
const bars = document.querySelector('.bars');
const btnPrev = document.querySelector('.prev');
const btnNext = document.querySelector('.next');
let shift = 0;

const buildGraph = (container, data) => {
  const graphHeight = container.offsetHeight;
  const maxBalance = Math.max(...data.map(item => item.balance));

  const barsHTML = data.map(({ balance }) => {
    const barHeight = (balance / maxBalance) * graphHeight;
    return `<div class="bar" data-balance="${balance}" style="height: ${barHeight}px;"></div>`;
  }).join('');

  container.innerHTML = barsHTML;
};

const updateGraph = (direction) => {
  if (direction === 'next') {
    shift -= 5;
  }

  if (direction === 'prev') {
    shift += 5;
  }

  btnNext.disabled = shift <= 0;
  btnPrev.disabled = shift >= account.balances.length - 5;
  const start = Math.max(0, shift);

  buildGraph(bars, account.balances.slice(start, start + 5).reverse());
}

btnNext.addEventListener('click', () => updateGraph('next'));
btnPrev.addEventListener('click', () => updateGraph('prev'));

buildGraph(bars, account.balances.slice(0, 5).reverse());