# Crypto Bug: Swapping Money
technology

One was interested in this NEAR Protocol (now called NEAR BOS, or NEAR Blockchain Operating System) coin a long time ago, and then one stopped for a bit after one found work and get back doing normal work. Despite, one continues to play the game [CryptoHeroes](https://pd.marmaj.org/cryptoheroes) and hence, one have to swap coins to NEAR or other more useful currencies like USDT. A few weeks ago, though, one went to the swap and performed the same operations, this time distracted by another game one was sucked into at the moment, and clicked "accept" only after a long time later (when liquidity might have changed); and it so opens up a possibility for stealing money. Let's described the step of how it works. 

Let's see how much money I got in the testnet (fake accounts used by developer for testing purposes):

![Initial Money in NEAR Testnet Wallet](assets/images/wallet_near_init.png "Initial Money in NEAR Wallet")

Then, there comes [Ref.Finance](https://app.ref.finance/), but here, we're using the [testnet version](https://testnet.ref.finance/). So, we can swap money from it: 

![Swap a random coin on Ref](assets/images/swap_on_ref.png "Swap a random coin on Ref")

Then, it comes to the waiting page: 

![Wait here for 10 minutes](assets/images/wait_this_page.png "Wait here for 10 minutes")

Now, this is the page we want to accept. But it so often one went to play game and forgot about it entirely, for a really long time, like 10 minutes or more. Then, when one comes back to accept it, it has an error due to "slippage error", but then it says its "succeeded", which is not true. 

Then, they build the function separately, meaning that when one is "succeeded", THEN only we went to transfer money. So even if this has a slippage error, it result succeeded, it continue to transfer money. The problem is, it refund back the money I want to swap for. Therefore, I got back what I want to swap from, and I got what I want to swap to. Double Kill!!

![Wallet status after swap](assets/images/wallet_near_after.png "Wallet status after swap")

Notice the amount of NEAR increased, but the LNC coin doesn't change. You could try with other coins on TESTNET, it'll probably show the same. Though one thing one haven't tried: swap to another currency other than NEAR. Probably is buggy as well. 

You can view the 2 transaction record how it says "Status succeeded" on the first one, but when you scroll down (or CTRL+F), you'll find the "slippage error". 
1. [First Transaction: ft_transfer_call](https://explorer.testnet.near.org/transactions/3YmFxdkQCPqz9o1CaqGZvK6Hp3DYFTLGCCZg79CxrZHx)
2. [Second Transaction: near_withdraw](https://explorer.testnet.near.org/transactions/DVmV66wxJkzUuhuogjK2Rpkzt98g5EdSFSudg7fXqnM8)


## Why Still Works?
Well, One reported it in ImmuneFi where they say it's where they have bug; but unfortunately probably because I don't put it "critical" only "medium" (you see, although it can steal money, the sheer power of time you have to wait makes it possible only once or twice before being noticed, unlike most critical money stealing that can drain money every seconds, so it isn't really "critical" but "medium" or at most "high", depending on how you view it, from your point of view), so they didn't care about it. No reply. 

Then, one thought one might try to get to them on discord. Unfortunately, the sheer amount of scam means that you have to pass some test before being able to reach them. And unfortunately, I didn't join the group long time before, only new, and I'm not considered "intelligence" enough to prove myself not a bot; and therefore I could only submit a ticket. About a week later, one went back and found that the ticket had been removed. No reply. Check their website, the trick still works, so it isn't updated (or probably it has, only in mainnet but not testnet? One isn't sure). One do see there is [a commit](https://github.com/ref-finance/ref-contracts/commit/0bdcf0a639219eb6d4a818ef0d29ff19c038fac4#diff-c0428b0db6402e1ceeecd1795cc99ca26b3dc1e552feee6a6b657d9aeca5969c) that comes after the bug discovered, but the sheer length of the commit one cannot determined whether they fix the bug or not. Nor one wants to try in mainnet as it's not ethical.

Then, one tries opening a bug quote [in github](https://github.com/ref-finance/ref-contracts/issues/98), but unfortunately, it goes unnoticed. No comments etc. 

So voilà, I'll end it as a "you problem not a me problem" now for such effort one tried to notify but failed. 

Any so peer readers, please remain ethical and use this to check your own program whether you have this kind of "slippage error" bug or not, in NEAR or in other types of money. If it has, please fix your code. 

> **PLEASE DON'T STEAL MONEY!!! IT'S UNETHICAL!!!**. 

