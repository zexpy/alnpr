interface DetailsProps {
  detail: {
    title: string;
    description: string;
    icon?: React.ReactNode;
  };
}

const Details: React.FC<DetailsProps> = ({ detail }) => {
  return (
    <div className="flex w-96 mt-6 rounded-xl shadow-lg bg-white/45 hover:scale-110 transition duration-700">
      <div className="flex justify-center m-4 p-2 flex-col space-y-3">
        <div className="flex space-x-3 items-center">
          {detail.icon}
          <p className="font-semibold text-xl font-poppins text-blue-900">
            {detail.title}
          </p>
        </div>
        <p className="text-slate-700">{detail.description}</p>
      </div>
    </div>
  );
};

export default Details;
