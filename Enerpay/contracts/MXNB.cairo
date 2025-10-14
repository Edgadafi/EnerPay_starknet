#![allow(unused)]

use starknet::{
    ContractAddress, contract_api::{get_caller_address, get_contract_address},
    get_block_timestamp
};

#[starknet::interface]
trait IMXNB<TContractState> {
    fn name(self: @TContractState) -> felt252;
    fn symbol(self: @TContractState) -> felt252;
    fn decimals(self: @TContractState) -> u8;
    fn total_supply(self: @TContractState) -> u256;
    fn balance_of(self: @TContractState, account: ContractAddress) -> u256;
    fn allowance(self: @TContractState, owner: ContractAddress, spender: ContractAddress) -> u256;
    fn transfer(ref self: TContractState, recipient: ContractAddress, amount: u256) -> bool;
    fn transfer_from(
        ref self: TContractState,
        sender: ContractAddress,
        recipient: ContractAddress,
        amount: u256
    ) -> bool;
    fn approve(ref self: TContractState, spender: ContractAddress, amount: u256) -> bool;
    fn mint(ref self: TContractState, to: ContractAddress, amount: u256);
}

#[starknet::contract]
mod MXNB {
    use super::IMXNB;
    use starknet::{
        ContractAddress, contract_api::{get_caller_address, get_contract_address}
    };

    #[storage]
    struct Storage {
        name: felt252,
        symbol: felt252,
        decimals: u8,
        total_supply: u256,
        balances: Map<ContractAddress, u256>,
        allowances: Map<(ContractAddress, ContractAddress), u256>,
        owner: ContractAddress,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        initial_supply: u256,
        recipient: ContractAddress,
    ) {
        self.name.write('Mexican Peso Token');
        self.symbol.write('MXNB');
        self.decimals.write(18);
        self.total_supply.write(initial_supply);
        self.owner.write(get_caller_address());
        
        // Mint initial supply to recipient
        self.balances.write(recipient, initial_supply);
        
        self.emit(Transfer {
            from: ContractAddress::default(),
            to: recipient,
            value: initial_supply,
        });
    }

    #[abi(embed_v0)]
    impl IMXNBImpl of IMXNB<ContractState> {
        fn name(self: @ContractState) -> felt252 {
            self.name.read()
        }

        fn symbol(self: @ContractState) -> felt252 {
            self.symbol.read()
        }

        fn decimals(self: @ContractState) -> u8 {
            self.decimals.read()
        }

        fn total_supply(self: @ContractState) -> u256 {
            self.total_supply.read()
        }

        fn balance_of(self: @ContractState, account: ContractAddress) -> u256 {
            self.balances.read(account)
        }

        fn allowance(
            self: @ContractState,
            owner: ContractAddress,
            spender: ContractAddress,
        ) -> u256 {
            self.allowances.read((owner, spender))
        }

        fn transfer(ref self: ContractState, recipient: ContractAddress, amount: u256) -> bool {
            let sender = get_caller_address();
            self._transfer(sender, recipient, amount);
            true
        }

        fn transfer_from(
            ref self: ContractState,
            sender: ContractAddress,
            recipient: ContractAddress,
            amount: u256,
        ) -> bool {
            let caller = get_caller_address();
            let current_allowance = self.allowances.read((sender, caller));
            
            assert(current_allowance >= amount, 'Insufficient allowance');
            
            self.allowances.write((sender, caller), current_allowance - amount);
            self._transfer(sender, recipient, amount);
            
            true
        }

        fn approve(ref self: ContractState, spender: ContractAddress, amount: u256) -> bool {
            let owner = get_caller_address();
            self.allowances.write((owner, spender), amount);
            
            self.emit(Approval { owner, spender, value: amount });
            true
        }

        fn mint(ref self: ContractState, to: ContractAddress, amount: u256) {
            assert(get_caller_address() == self.owner.read(), 'Only owner can mint');
            
            let current_supply = self.total_supply.read();
            let new_supply = current_supply + amount;
            self.total_supply.write(new_supply);
            
            let current_balance = self.balances.read(to);
            self.balances.write(to, current_balance + amount);
            
            self.emit(Transfer {
                from: ContractAddress::default(),
                to,
                value: amount,
            });
        }
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        fn _transfer(
            ref self: ContractState,
            from: ContractAddress,
            to: ContractAddress,
            amount: u256,
        ) {
            assert(from != ContractAddress::default(), 'Transfer from zero address');
            assert(to != ContractAddress::default(), 'Transfer to zero address');
            
            let from_balance = self.balances.read(from);
            assert(from_balance >= amount, 'Insufficient balance');
            
            self.balances.write(from, from_balance - amount);
            
            let to_balance = self.balances.read(to);
            self.balances.write(to, to_balance + amount);
            
            self.emit(Transfer { from, to, value: amount });
        }
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        Transfer: Transfer,
        Approval: Approval,
    }

    #[derive(Drop, starknet::Event)]
    pub struct Transfer {
        #[key]
        pub from: ContractAddress,
        #[key]
        pub to: ContractAddress,
        pub value: u256,
    }

    #[derive(Drop, starknet::Event)]
    pub struct Approval {
        #[key]
        pub owner: ContractAddress,
        #[key]
        pub spender: ContractAddress,
        pub value: u256,
    }
}

