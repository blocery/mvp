const SimpleStorageSC = artifacts.require("./SimpleStorageSC.sol");

module.exports = function(deployer) {
    deployer.deploy(SimpleStorageSC);

    //when Saling Token
    // deployer.deploy(ATZToken).then(function () {
    //     deployer.deploy(ATZUserList).then(function() {
    //         deployer.deploy(ATZTokenSale, ATZToken.address, ATZUserList.address);
    //     });
    // });
};
