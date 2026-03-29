import Link from "next/link";

const Logo = () => {
  return (
    <>
      <Link href="/" className="">
        <div className="flex justify-center text-xl max-w-20 font-extrabold font-mono bg-yellow-400 px-1.5 py-1 rounded ">
          <span className="text-black">MM</span>
          <span className="text-black">DB</span>
        </div>
      </Link>
    </>
  );
};

export default Logo;
