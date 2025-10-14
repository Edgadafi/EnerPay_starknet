#![allow(unused)]
// SPDX-License-Identifier: MIT

use starknet::{
    contract_address_const, contract_api::{get_caller_address, get_block_timestamp},
    ContractAddress, get_contract_address
};

use super::IERC20::{IERC20Dispatcher, IERC20DispatcherTrait};

#[starknet::interface]
trait IEnerPay<TContractState> {
    fn get_owner(self: @TContractState) -> ContractAddress;
    fn get_mxnb_token(self: @TContractState) -> IERC20Dispatcher;
    fn get_treasury(self: @TContractState) -> ContractAddress;
    fn pay_service(
        ref self: TContractState,
        rpu: felt252,
        service_type: felt252,
        amount: u256,
        company: felt252
    );
    fn pay_multiple_services(
        ref self: TContractState,
        rpus: Array<felt252>,
        service_types: Array<felt252>,
        amounts: Array<u256>,
        company: felt252
    );
    fn get_payments_by_user(self: @TContractState, user: ContractAddress) -> Array<Payment>;
    fn set_treasury(ref self: TContractState, new_treasury: ContractAddress);
}

#[derive(Drop, Serde, starknet::Store)]
pub struct Payment {
    pub payer: ContractAddress,
    pub rpu: felt252,
    pub service_type: felt252,
    pub amount: u256,
    pub timestamp: u64,
    pub company: felt252,
}

#[starknet::contract]
mod EnerPay {
    use super::{Payment, IERC20Dispatcher, IERC20DispatcherTrait};
    use starknet::{
        ContractAddress, contract_api::{get_caller_address, get_block_timestamp},
        get_contract_address
    };

    #[storage]
    struct Storage {
        owner: ContractAddress,
        mxnb_token: IERC20Dispatcher,
        treasury: ContractAddress,
        payments: Map<u256, Payment>,
        payment_count: u256,
        user_payments: Map<(ContractAddress, u256), u256>,
        user_payment_count: Map<ContractAddress, u256>,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        mxnb_token: IERC20Dispatcher,
        treasury: ContractAddress,
    ) {
        self.owner.write(get_caller_address());
        self.mxnb_token.write(mxnb_token);
        self.treasury.write(treasury);
        self.payment_count.write(0);
    }

    #[abi(embed_v0)]
    impl IEnerPayImpl of super::IEnerPay<ContractState> {
        fn get_owner(self: @ContractState) -> ContractAddress {
            self.owner.read()
        }

        fn get_mxnb_token(self: @ContractState) -> IERC20Dispatcher {
            self.mxnb_token.read()
        }

        fn get_treasury(self: @ContractState) -> ContractAddress {
            self.treasury.read()
        }

        fn pay_service(
            ref self: ContractState,
            rpu: felt252,
            service_type: felt252,
            amount: u256,
            company: felt252,
        ) {
            let caller = get_caller_address();
            let mxnb_token = self.mxnb_token.read();
            
            // Verificar allowance y balance
            let allowance = mxnb_token.allowance(caller, get_contract_address());
            assert(allowance >= amount, 'Insufficient allowance');
            
            let balance = mxnb_token.balance_of(caller);
            assert(balance >= amount, 'Insufficient balance');
            
            // Transferir tokens
            mxnb_token.transfer_from(caller, self.treasury.read(), amount);
            
            // Crear y almacenar payment
            let payment = Payment {
                payer: caller,
                rpu,
                service_type,
                amount,
                timestamp: get_block_timestamp(),
                company,
            };
            
            let payment_id = self.payment_count.read();
            self.payments.write(payment_id, payment);
            self.payment_count.write(payment_id + 1);
            
            // Actualizar índice de usuario
            let user_count = self.user_payment_count.read(caller);
            self.user_payments.write((caller, user_count), payment_id);
            self.user_payment_count.write(caller, user_count + 1);
            
            // Emit event
            self.emit(PaymentMade { 
                payer: caller, 
                rpu, 
                service_type, 
                amount, 
                company 
            });
        }

        fn pay_multiple_services(
            ref self: ContractState,
            rpus: Array<felt252>,
            service_types: Array<felt252>,
            amounts: Array<u256>,
            company: felt252,
        ) {
            let caller = get_caller_address();
            let mxnb_token = self.mxnb_token.read();
            
            // Verificar que los arrays tengan la misma longitud
            assert(rpus.len() == amounts.len(), 'Array length mismatch');
            assert(rpus.len() == service_types.len(), 'Array length mismatch');
            
            // Calcular total
            let mut total: u256 = 0;
            let mut i = 0;
            loop {
                if i >= amounts.len() {
                    break;
                }
                total += *amounts.at(i);
                i += 1;
            };
            
            // Verificar allowance y balance
            let allowance = mxnb_token.allowance(caller, get_contract_address());
            assert(allowance >= total, 'Insufficient allowance');
            
            let balance = mxnb_token.balance_of(caller);
            assert(balance >= total, 'Insufficient balance');
            
            // Transferir tokens una sola vez
            mxnb_token.transfer_from(caller, self.treasury.read(), total);
            
            // Crear y almacenar payments
            let mut i = 0;
            loop {
                if i >= rpus.len() {
                    break;
                }
                
                let payment = Payment {
                    payer: caller,
                    rpu: *rpus.at(i),
                    service_type: *service_types.at(i),
                    amount: *amounts.at(i),
                    timestamp: get_block_timestamp(),
                    company,
                };
                
                let payment_id = self.payment_count.read();
                self.payments.write(payment_id, payment);
                self.payment_count.write(payment_id + 1);
                
                // Actualizar índice de usuario
                let user_count = self.user_payment_count.read(caller);
                self.user_payments.write((caller, user_count), payment_id);
                self.user_payment_count.write(caller, user_count + 1);
                
                // Emit event
                self.emit(PaymentMade { 
                    payer: caller, 
                    rpu: *rpus.at(i), 
                    service_type: *service_types.at(i), 
                    amount: *amounts.at(i), 
                    company 
                });
                
                i += 1;
            };
        }

        fn get_payments_by_user(self: @ContractState, user: ContractAddress) -> Array<Payment> {
            let user_count = self.user_payment_count.read(user);
            let mut result = ArrayTrait::new();
            
            let mut i = 0;
            loop {
                if i >= user_count {
                    break;
                }
                
                let payment_id = self.user_payments.read((user, i));
                let payment = self.payments.read(payment_id);
                result.append(payment);
                
                i += 1;
            };
            
            result
        }

        fn set_treasury(ref self: ContractState, new_treasury: ContractAddress) {
            assert(get_caller_address() == self.owner.read(), 'Only owner');
            self.treasury.write(new_treasury);
        }
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        PaymentMade: PaymentMade,
    }

    #[derive(Drop, starknet::Event)]
    pub struct PaymentMade {
        #[key]
        pub payer: ContractAddress,
        pub rpu: felt252,
        pub service_type: felt252,
        pub amount: u256,
        pub company: felt252,
    }
}

