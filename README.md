# Pax External Currencies Wallets

# Customer External Currencies Wallets

# Customer Pax Wallet
# Customer Pax Currencies Wallets

Deposit = Customers Bank > Menahem Bank > Customers Currency Wallet

Withdrawal = Customers Currency Wallet > Customers Bank

Exchange = Customer A Pax Wallet > Customer B Currency Wallet
Exchange (Reverse) = Customer B Currency Wallet > Customer A Pax Wallet


# PAX
customers
wallets
transactions (id, tid, from, to, date)

# Ext
ext_currencies (Bitcoin, Etherium)
ext_wallets (customer_id, currency_id, balance)
ext_statuses (pending, success, failed)
ext_types (Received(deposit), Send(withdrawal))
ext_transactions (ext_wallet, amount, type, status, date)

# Exchange
orders (id, customer_id, wallet_id, request_amount, current_amount, created, updated, completed)
orders_transactions
orders_types (Buy, Sell)
orders_statuses (Pending, Partial (Split), Complete)

# Payperex Stocks


2 lines to each transactions