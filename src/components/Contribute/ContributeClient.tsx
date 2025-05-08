"use client"

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from 'next/image';

import CheckoutPage from "@/components/payment/CheckoutPage";
import CurrencyInput from "@/components/payment/CurrencyInput";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { getLocationFromPostcode } from '@/lib/postcodeToLocation';
import { getFoodBanks } from '../map/Locations/FoodBankData';
import MainFoodBankCard from './MainFoodBankCard';
import FoodBankCard from './FoodBankCard';
import { getUserPosition } from '../map/Locations/UserPosition';

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is undefined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const ContributeClient = () => {
  const [postcode, setPostcode] = useState("");

  const symbols = { USD: '$', GBP: '£', EUR: '€', AUD: 'A$' };
  const currencies = ['AUD', 'USD', 'EUR', 'GBP'];

  const defaultAmount = 10.00;
  const [amount, setAmount] = useState(defaultAmount);
  const [currency, setCurrency] = useState('GBP');

  const [nearbyBanks, setNearbyBanks] = useState([])

  const FOODBANK_DISPLAY_LIMIT = 4;
  
  const handleSearch = async () => {
    if (!postcode) {
      await getUserPosition()
        .then(getFoodBanks)
        .then(data => setNearbyBanks(data.slice(0, FOODBANK_DISPLAY_LIMIT)));
    } else {
      await getLocationFromPostcode(postcode)
        .then(getFoodBanks)
        .then(data => setNearbyBanks(data.slice(0, FOODBANK_DISPLAY_LIMIT)));
    }
  }

  useEffect(() => {
    handleSearch();
  }, [])

  return (
    <section className="gradient-bg pt-6 pb-10 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* help the cause */}
        <div
          className={`
            flex flex-col lg:flex-row items-center mb-16 gap-0
            -mx-4 sm:-mx-6 lg:-mx-8
          `}
        >
          {/* Text column */}
          <div className="lg:w-2/6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
              Help The Cause!
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-lg">
              Find out how and where to donate food and other essentials to your local food bank.
            </p>
          </div>

          {/* Image column */}
          <div className="lg:w-4/6">
            <div
              className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden"
              style={{
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 10% 100%)",
              }}
            >
              <Image
                src="/foodbank1.jpg"
                alt="Volunteer stocking shelves"
                fill
                className="object-cover"
                priority
              />
            </div></div></div>

        <div className="mb-16 flex flex-col lg:flex-row justify-center lg:items-center gap-8">
          {/* find food bank (left) */}
          <div className="w-full lg:w-1/3 flex-none">
            <div className="bg-primary rounded-2xl p-6 shadow-md">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Find your closest food bank
              </h3>
              <div className="flex mb-4">
                <Input
                  type="text"
                  placeholder="Enter your postcode..."
                  className="text-white rounded-l-lg rounded-r-none border-0 focus:ring-2 focus:ring-primary-foreground"
                  // value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                />
                <Button
                  // disabled={isSearching}
                  onClick={() => handleSearch()}
                  className="bg-white text-primary hover:bg-gray-100 rounded-l-none"
                >
                  Search
                </Button>
              </div>
              <div className='flex'>
                <Button className="ml-auto text-m font-semibold bg-white text-primary hover:bg-gray-100 self-end"
                  onClick={() => { setPostcode(""); handleSearch(); }}
                >
                  Use my current location
                </Button>
              </div>
            </div>
          </div>

          {/* nearest‐bank card (right) */}
          {nearbyBanks.length >= 0 && (<MainFoodBankCard foodbank={nearbyBanks[0]} />)}
        </div>

        {/* other nearby */}
        {nearbyBanks.length >= 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Other Nearby Food Banks
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {nearbyBanks.slice(1).map((_, i) => (
                <FoodBankCard key={"foodbank" + i} foodbank={nearbyBanks[i + 1]} />
              ))}

            </div>
          </div>
        )}

        {/* Donation */}
        <div className="px-2">
          <div className="px-2 mt-16">
            <div className="mb-4">
              <h1 className="text-4xl font-extrabold mb-2">Donate</h1>
              <p className="text-xl text-gray-700 mb-2">{"Can\'t decide on what food bank to donate to? Donate to us and we will send your money to those who need it the most."}</p>
            </div>
          </div>

          <div className="p-0">
            <CurrencyInput
              value={amount}
              onChange={setAmount}
              currency={currency}
              symbols={symbols}
              onCurrencyChange={setCurrency}
              currencies={currencies}
            />
          </div>
        </div>

        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(amount),
            currency: currency.toLowerCase(),
          }}
        >
          <CheckoutPage amount={amount} currency={currency} symbols={symbols} />
        </Elements>
      </div>
    </section>
  );
};

export default ContributeClient;
