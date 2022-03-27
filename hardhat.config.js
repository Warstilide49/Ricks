require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.KEY}`,
        blockNumber: 10396884
      }
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.KEY}`,
      accounts: [`${process.env.PRKEY1}`],
    },
    polygon_mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.KEY}`,
      accounts: [`${process.env.PRKEY1}`],
    },
    polygon: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.KEY}`,
      accounts: [`${process.env.PRKEY1}`],
    },
  }
};
