function btn() {
  let inputSum = document.querySelector('.nfs-date__input')
  let sum = inputSum.value;
  let history = document.querySelector('.nfs-history__result')

  if (sum != '') {
    history.insertAdjacentHTML("afterbegin",
      `<div class="nfs-history__result-item" onclick="copyFunction()">
      <div class="nfs-history__result-item-str">${money2string(Number(sum))}</div>

      <div class="nfs-history__result-item-int">${sum}</div>
    </div>`);
  }

  inputSum.value = ""
}
function plural(n, forms) {
  return forms[n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
}
function money2string(n) {
  let s1 = [['', '', ''],
  [['один', 'одна'], ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'], 'сто'],
  [['два', 'две'], 'двадцать', 'двести'],
  ['три', 'тридцать', 'триста'],
  ['четыре', 'сорок', 'четыреста'],
  ['пять', 'пятьдесят', 'пятьсот'],
  ['шесть', 'шестьдесят', 'шестьсот'],
  ['семь', 'семьдесят', 'семьсот'],
  ['восемь', 'восемьдесят', 'восемьсот'],
  ['девять', 'девяносто', 'девятьсот']];
  let b = [['копейка', 'копейки', 'копеек'],
  ['рубль', 'рубля', 'рублей'],//['доллар','доллара','долларов']
  ['тысяча', 'тысячи', 'тысяч'],
  ['миллион', 'миллиона', 'миллионов'],
  ['миллиард', 'миллиарда', 'миллиардов']
  ];

  function m999(n, b, f) {
    let s = '';
    let t = s1[Math.floor(n / 100) % 10][2];
    if (t) s += t + ' ';

    let d = Math.floor(n / 10) % 10;
    t = s1[d][1];
    if (t instanceof Array) {
      t = t[n % 10];
      if (t) s += t + ' ';
    } else {
      if (t) s += t + ' ';
      t = s1[n % 10][0];
      if (t instanceof Array) t = t[f == 0 || f == 2 ? 1 : 0];
      if (t) s += t;
    }

    return s + ' ' + plural(n, b[f]) + (f > 1 ? ' ' : '');
  }

  let i = Math.floor(n + 0.005),
    f = Math.floor(((n - i) * 100) + 0.5),
    s = '';
  for (let j = 1; i > 0.9999; i /= 1000) {
    s = m999(Math.floor(i % 1000), b, j) + s;
    j++;
  }
  if (f > 0) s = s + ' ' + m999(f, b, 0)

  
  return ucFirst(s);
}


// UpperCase для 1 буквы
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}


// копировать элемент
function copyFunction() {
  navigator.clipboard.writeText()
    .then(() => {
      // Получилось!
    })
    .catch(err => {
      console.log('Something went wrong', err);
    });
}