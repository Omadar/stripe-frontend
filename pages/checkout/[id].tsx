import React from 'react';
import {useRouter} from "next/router";

const CheckoutDetail = () => {
    const router = useRouter()
    return (
        <div>
            Hello {router.query.id}
        </div>
    );
};

export default CheckoutDetail;
