

export const calcBid = (bids: any[]) => {
    let endValue  = 0;

    bids.forEach(bid => {
        if(endValue <= bid.bidValue) {
            endValue = bid.bidValue
        }
    })

    return endValue;
} 