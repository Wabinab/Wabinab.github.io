# A Payment System On Near Protocol

While QR code scanning for wallet addresses are quite popular, it isn't clear; how do we let the money receivers define the amount of money to receive, rather than the person doing the payment?

Here comes the payment system on NEAR Protocol. The receiver specify an amount in NEAR, which generates a QR code for the payee to scan and send.

![Type amount](/docs/assets/images/pn-image.png)

![Scan barcode](/docs/assets/images/pnimage1.png)

Normally, both parties can retrieve past transactions from their wallet. Here, we took one step ahead by returning a temporary receipt to save you from navigating to nearblocks.io and search for transaction histories for confirmation.

![Receipt](/docs/assets/images/pn-image3.png)

P.S. Receipt is only available after you "activate receipt" (cost 0.1 N), and you choose "only one payment" (meaning, only one single person is scanning the QR code).

And how do you know how much money you have paid last month? Last year? For the past 10 years? Stats tracking aggregates total payment made for the last 12 months (literally), and the last 10 years (literally), current month and current year inclusive.

![Stats Graphs](/docs/assets/images/py-image9.png)

P.S. (If no stats, it won't be displayed, like the image above). You also need to "activate stats", which cost 0.75 N.

Start logging in today with your favorite wallet on the web app (link below), and setup a POS receive-payment system to receive payment in NEAR!

### Links
Mainnet: https://wabinab.github.io/pay-near/tabs/receive

Testnet: https://wabinab.github.io/pay-near-testnet/tabs/receive
