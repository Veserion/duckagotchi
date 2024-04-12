import '../css/index.css'

import {fromNano, TonClient} from "ton";
import {Address} from "tonweb/src/utils";
import {TonConnectUI} from "@tonconnect/ui";
import axios from "axios";

// const tonConnectUI = new TonConnectUI({
//   manifestUrl: 'https://nikishmyaps.github.io/tamagotchi/tonconnect-manifest.json',
//   buttonRootId: 'ton-connect'
// });

const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
  manifestUrl: 'https://veserion.github.io/duckagotchi/tonconnect-manifest.json',
  buttonRootId: 'ton-connect',
  workchain: 0
});

const getStats = () => {
  const address = localStorage.getItem('walletAddress')
  if(address) {
    // const {data} = await axios.get(`http://44.223.23.181:5000/getStatus/${address}`, {
    //   headers: {
    //     'Access-Control-Allow-Origin' : '*',
    //     'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    //   }
    // })
    // const {lvl, hp} = data
    let lvl = localStorage.getItem('lvl')
    let hp = localStorage.getItem('hp')
    if (!lvl || !hp) {
      lvl = 0
      hp = 100
    }
    const numberLvl = document.getElementById('lvl-number');
    numberLvl.textContent = lvl;
    const numberHp = document.getElementById('hp-number');
    numberHp.textContent = hp;
  }
}

getStats()
const putStats = async () => {
  const address = localStorage.getItem('walletAddress')
  if(address) {
    const numberLvl = document.getElementById('lvl-number');
    const lvl = parseInt(numberLvl.textContent);
    const numberHp = document.getElementById('hp-number');
    let hp = parseInt(numberHp.textContent);
    // const response = await axios.post(`http://44.223.23.181:5000/putStatus`, {lvl, hp, id: address});
    localStorage.setItem('lvl', lvl.toString())
    localStorage.setItem('hp', hp.toString())
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
  if(number > 0) {
    number -= 1;
    numberHp.textContent = number;
    localStorage.setItem('hp', number.toString())
  }
  // await putStats()
}, 30000); // 30 секунд

const numberLvl = document.getElementById('lvl-number');

setInterval(async () => {
  let number = parseInt(numberLvl.textContent);
  number++;
  numberLvl.textContent = number;
  localStorage.setItem('lvl', number.toString())
  // await putStats()
}, 60000); // 60 секунд

const incrementButton2 = document.getElementById('feed');
const numberDisplay2 = document.getElementById('hp-number');

incrementButton2.addEventListener('click', () => {
  let number2 = parseInt(numberDisplay2.textContent);
  number2 += 2;
  numberDisplay2.textContent = number2;
});


const client = new TonClient({
  endpoint: 'https://toncenter.com/api/v2/jsonRPC',
});


const getWalletBalance = async(walletAddress) => {
  console.log('walletAddress', walletAddress)
  try {
    const balance = await client.getBalance(walletAddress);
    document.getElementById('ton-balance').textContent = fromNano(balance)

    return balance;
  } catch (error) {
    console.error("Ошибка при получении баланса:", error);
    throw error;
  }
}

tonConnectUI.onStatusChange(info => {
  if( info ) {
    localStorage.setItem('walletAddress', new Address(info.account.address).toString(true))
    getWalletBalance(info.account.address)
  }
  else document.getElementById('ton-balance').textContent = ''
})
document.getElementById('buy').addEventListener('click', async () => {
  await tonConnectUI.sendTransaction({
    network: -239,
    validUntil: Math.floor(Date.now() / 1000) + 360,
    messages: [
      {
        address: '0:e6a224fdc28dcba7e26e7a1b7d8ddfd7034b00eb746d4dc635241036f8b00e3b',
        amount: '100000000'
      }
    ]})
});

document.getElementById('feed').addEventListener('click', async () => {
  await tonConnectUI.sendTransaction({
    network: -239,
    validUntil: Math.floor(Date.now() / 1000) + 360,
    messages: [
      {
        address: '0:e6a224fdc28dcba7e26e7a1b7d8ddfd7034b00eb746d4dc635241036f8b00e3b',
        amount: '10000000'
      }
    ]})
});