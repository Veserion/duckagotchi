import '../css/index.css'

import {fromNano, TonClient} from "ton";
import {TonConnectUI} from '@tonconnect/ui'

// const tonConnectUI = new TonConnectUI({
//   manifestUrl: 'https://nikishmyaps.github.io/tamagotchi/tonconnect-manifest.json',
//   buttonRootId: 'ton-connect'
// });

const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
  manifestUrl: 'https://nikishmyaps.github.io/tamagotchi/tonconnect-manifest.json',
  buttonRootId: 'ton-connect'
});

const getStats = async () => {
  const address = localStorage.getItem('walletAddress')
  if(address) {
    const data = await fetch(`http://44.223.23.181:5000/getStatus/${address}`)
    const {lvl, hp} = JSON.parse(data)

    const numberLvl = document.getElementById('lvl-number');
    numberLvl.textContent = lvl;
    const numberHp = document.getElementById('hp-number');
    numberHp.textContent = hp;
  }
}

await getStats()
const putStats = async () => {
  const address = localStorage.getItem('walletAddress')
  if(address) {
    const numberLvl = document.getElementById('lvl-number');
    const lvl = parseInt(numberLvl.textContent);
    const numberHp = document.getElementById('hp-number');
    let hp = parseInt(numberHp.textContent);
    const response = await fetch(`http://44.223.23.181:5000/getStatus/${address}`, {
      method: "POST",
      // mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: "follow", // manual, *follow, error
      // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({id: address, lvl, hp}), // body data type must match "Content-Type" header
    });
  }
}

document.querySelector('.pat').addEventListener('click', () => {
  document.querySelectorAll('.video-pat').forEach(element => {
    element.classList.add('active');
  });

  document.querySelectorAll('.video-feed').forEach(element => {
    element.classList.remove('active');
  });
});

document.querySelector('.feed').addEventListener('click', () => {
  document.querySelectorAll('.video-feed').forEach(element => {
    element.classList.add('active');
  });

  document.querySelectorAll('.video-pat').forEach(element => {
    element.classList.remove('active');
  });
});

const randomDivContainer = document.getElementById('duck__list');
const randomDivs = randomDivContainer.querySelectorAll('.duck');

function randomShow() {
  const randomIndex = Math.floor(Math.random() * randomDivs.length);
  for (let i = 0; i < randomDivs.length; i++) {
    randomDivs[i].classList.remove('active');
  }
  randomDivs[randomIndex].classList.add('active');
}

setTimeout(randomShow, 7000);

const playButton = document.getElementById('pat');
const videos = document.getElementsByClassName('video-pat');

playButton.addEventListener('click', () => {
  for (let i = 0; i < videos.length; i++) {
    videos[i].play();
  }
});

const playButton2 = document.getElementById('feed');
const videos2 = document.getElementsByClassName('video-feed');

playButton2.addEventListener('click', () => {
  for (let i = 0; i < videos2.length; i++) {
    videos2[i].play();
  }
});

const numberHp = document.getElementById('hp-number');

setInterval(async () => {
  let number = parseInt(numberHp.textContent);
  number -= 2;
  numberHp.textContent = number;
  await putStats()
}, 30000); // 30 секунд

const numberLvl = document.getElementById('lvl-number');

setInterval(async () => {
  let number = parseInt(numberLvl.textContent);
  number++;
  numberLvl.textContent = number;
  await putStats()
}, 60000); // 60 секунд

const incrementButton2 = document.getElementById('feed');
const numberDisplay2 = document.getElementById('hp-number');

incrementButton2.addEventListener('click', () => {
  let number2 = parseInt(numberDisplay2.textContent);
  number2 += 2;
  numberDisplay2.textContent = number2;
});

//// TON wallet

// const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
//   manifestUrl: 'https://nikishmyaps.github.io/tamagotchi/tonconnect-manifest.json',
//   buttonRootId: 'ton-connect'
// });

const client = new TonClient({
  endpoint: 'https://toncenter.com/api/v2/jsonRPC',
});


const getWalletBalance = async(walletAddress) => {
  try {
    const balance = await client.getBalance(walletAddress);
    document.getElementById('ton-balance').textContent = fromNano(balance)

    return balance;
  } catch (error) {
    console.error("Ошибка при получении баланса:", error);
    throw error;
  }
}

let address = ''
tonConnectUI.onStatusChange(info => {
  if( info ) {
    localStorage.setItem('wallerAddress', info.account.address)
    getWalletBalance(info.account.address)
  }
  else document.getElementById('ton-balance').textContent = ''
})
document.getElementById('buy').addEventListener('click', async () => {
  const res = await tonConnectUI.sendTransaction({messages: [
      {
        address: '0:e6a224fdc28dcba7e26e7a1b7d8ddfd7034b00eb746d4dc635241036f8b00e3b',
        amount: '100000000'
      }
    ]})
  console.log('res', res)
});

document.getElementById('feed').addEventListener('click', async () => {
  return await tonConnectUI.sendTransaction({messages: [
      {
        address: '0:e6a224fdc28dcba7e26e7a1b7d8ddfd7034b00eb746d4dc635241036f8b00e3b',
        amount: '10000000'
      }
    ]})
});