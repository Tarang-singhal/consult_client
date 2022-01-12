import Axios from 'axios';
import Constants from 'expo-constants';

const GetTxnToken = async (orderId, amount, userId) => {
    // console.log(orderId, amount, userId);
    try{
        const res = await Axios.post(
            Constants.manifest.extra.API_URL + `/paytm/initiatePayment?userId=${userId}`,
            {
                orderId,
                amount,
                userId
            },
    
        )
        return res.data.body.txnToken;
    }catch(err) {
        console.log(err);
    }
}

export {
    GetTxnToken
}