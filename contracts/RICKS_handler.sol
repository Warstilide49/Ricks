//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Handler{

	struct Vault{
		address contractAddress;
		address owner;
	}
	
	mapping(address=> address[]) public vaultByOwner;

	Vault[] public vaultList;

	//To add a vault, it adds into the public list as well as in the mapping
    function addVault(address add, address own) external{
        vaultList.push(Vault(add, own));
        vaultByOwner[own].push(add);
    }

    //pagination of all vaults
	function showVaultsPublic(uint offset, uint limit) external view returns (Vault[] memory vaults, uint nextOffset, uint total) {
        uint totalVaults = vaultList.length;
        limit=checkLimit(limit, totalVaults, offset);
        Vault[] memory values = new Vault[] (limit);
        for (uint i = 0; i < limit; i++) {
            values[i] = vaultList[offset + i];
        }

        return (values, offset + limit, totalVaults);
    }

    //pagination of the mapping of owner to address
    function showVaultIndividual(address own, uint offset, uint limit) external view returns (address[] memory vaults, uint nextOffset, uint total) {
        uint totalVaults = vaultByOwner[own].length;
        limit=checkLimit(limit, totalVaults, offset);
        address[] memory values = new address[] (limit);
        for (uint i = 0; i < limit; i++) {
            values[i] = vaultByOwner[own][offset + i];
        }

        return (values, offset + limit, totalVaults);
    }

    //helper function to check limits
    function checkLimit(uint limit, uint total, uint offset) private pure returns (uint){
        if(limit == 0) {
            limit = 1;
        }
        if (limit > total- offset) {
            limit = total- offset;
        }
        return limit;
    }

    function getTotalVaults() external view returns(uint){
        return vaultList.length;
    }
}