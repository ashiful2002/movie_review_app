import Link from "next/link";

const CancelPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center gap-4">
      <h1 className="text-3xl font-bold text-red-500">Payment Cancelled</h1>
      <p className="text-muted-foreground">
        No charge was made. You can try again anytime.
      </p>
      <Link
        href="/dashboard/subscriptions"
        className="underline text-primary font-medium"
      >
        Back to Plans
      </Link>
    </div>
    
  );
};

export default CancelPage;
