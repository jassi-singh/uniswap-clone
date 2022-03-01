require("@nomiclabs/hardhat-waffle");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks:{
    rinkeby:{
      url:'https://eth-rinkeby.alchemyapi.io/v2/CUk_L6RsUaGvu9CdIr-drsHqe9Ebe6QO',
      accounts:[
        'ac52fcc4e038a8df4426c669659821306cd0e180847fa71f7d47aa2350821ad8'
      ]
    }
  }
};
