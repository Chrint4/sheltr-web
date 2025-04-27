export const metadata = {
  title: "Donation was successful!"
};

export default async function PaymentSuccess({ searchParams }) {
  const symbols = { USD: '$', GBP: '£', EUR: '€', AUD: 'A$' };
  
  const params = await searchParams;
  const amount = params?.amount;
  const currency = params?.currency;

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-green-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
        <h2 className="text-2xl">You donated {symbols[currency]}{amount}</h2>
      </div>
    </main>
  );
}