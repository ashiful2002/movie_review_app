import { getSingleProvider } from "@/services/Providers";

interface Props {
  params: { id: string };
}

export default async function Page({ params }: Props) {
//   const provider = await getSingleProvider(params.id);
//   const data = provider.data;
//   console.log(data);

  return (
    <div className="p-6 space-y-4">
      {/* <h1 className="text-3xl font-bold">{data.restaurantName}</h1>
      <p>{data.description}</p>
      <p>
        <strong>Email:</strong> {data.user.email}
      </p>
      <p>
        <strong>Location:</strong> {data.location}
      </p> */}
    </div>
  );
}
