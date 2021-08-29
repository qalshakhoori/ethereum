import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xA8EbC2436E016c82A7fdbC72C0D1124498F5Eb23'
);

export default instance;
