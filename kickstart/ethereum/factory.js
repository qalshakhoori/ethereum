import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x86009dc3118E234c8761E615A59669242D4b5092'
);

export default instance;
