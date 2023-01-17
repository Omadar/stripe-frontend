import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "../src/components/CheckoutForm";
import {useEffect, useState} from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
export default function Home() {
    const [clientSecret, setClientSecret] = useState("");

    const appearance = {
        theme: 'stripe',
    };
    const options:any = {
        clientSecret,
        appearance,
    };

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/payment/create-payment-intent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);
    console.log('clientSecret',clientSecret)
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
          {stripePromise && clientSecret && <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>}
      </main>
    </div>
  )
}
