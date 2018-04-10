# Pax External Currencies Wallets

# Customer External Currencies Wallets

# Customer Pax Wallet
# Customer Pax Currencies Wallets

Deposit = Customers Bank > Menahem Bank > Customers Currency Wallet

Withdrawal = Customers Currency Wallet > Customers Bank

Exchange = Customer A Pax Wallet > Customer B Currency Wallet
Exchange (Reverse) = Customer B Currency Wallet > Customer A Pax Wallet

------------- NEW -------------

# Core
customers
wallets (id, customer_id, currency_id, amount)
transactions (id, customer_id, wallet_id, type[received(deposit), send(withdrawal)], tuid)
transfers (id, target_wallet_id, amount, type, status_id, created, updated)
transactions_statuses (id, title[pending, success, failed])
currencies (id, title[Bitcoin, Etherium])

# PAX
pax_rates

# Exchange
orders (id, order_type_id customer_id, wallet_id, order_status_id, request_amount, current_amount, created, updated, completed)
orders_transactions (id, order_id, tuid)
orders_statuses (Pending, Partial (Split), Complete, Canceled)

# Payperex Stocks
paypers_inventory // id, title, quantity, sold, inventory
paypers // id, customer_id, paypers_inventory_id, paypers_transaction_id, created
paypers_transactions // id, receiver_id, sender_id, paypers_amount, payed_amount, currency, created

# QR Reader
https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=123123123