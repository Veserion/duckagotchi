import '../css/index.css'

import {fromNano, TonClient} from "ton";
import TonConnect from "@tonconnect/sdk";
import TonWeb from "tonweb";

const connector = new TonConnect({manifestUrl: 'https://nikishmyaps.github.io/tamagotchi/tonconnect-manifest.json'});

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

setInterval(() => {
  let number = parseInt(numberHp.textContent);
  number -= 2;
  numberHp.textContent = number;
}, 30000); // 30 секунд

const numberLvl = document.getElementById('lvl-number');

setInterval(() => {
  let number = parseInt(numberLvl.textContent);
  number++;
  numberLvl.textContent = number;
}, 15000); // 15 секунд

const incrementButton2 = document.getElementById('feed');
const numberDisplay2 = document.getElementById('hp-number');

incrementButton2.addEventListener('click', () => {
  let number2 = parseInt(numberDisplay2.textContent);
  number2 += 2;
  numberDisplay2.textContent = number2;
});

//// TON wallet

const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
  manifestUrl: 'https://nikishmyaps.github.io/tamagotchi/tonconnect-manifest.json',
  buttonRootId: 'ton-connect'
});

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

tonConnectUI.onStatusChange(info => {
  if( info ) {
    getWalletBalance(info.account.address)
  }
  else document.getElementById('ton-balance').textContent = ''
})

// const tonweb = new TonWeb();
// const walletAddress = connector.account.address
// const jettonWallet = new TonWeb.token.jetton.JettonWallet(tonweb.provider,{address: walletAddress});

document.getElementById('buy').addEventListener('click', async () => {
  const data = await jettonWallet.getData();
});