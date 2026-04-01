import Link from "next/link";

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center gap-4">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful! 🎉</h1>
      <p className="text-muted-foreground">
        Your subscription is now active. Enjoy full access!
      </p>
      <Link
        href="/dashboard/subscriptions"
        className="underline text-primary font-medium"
      >
        Go to Subscriptions
      </Link>
    </div>
  );
};

export default SuccessPage;
