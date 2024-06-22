interface DetailsProps {
  title: string;
  description: string;
  icon?: React.ElementType;
  iconColor?: string;
}

const Details: React.FC<DetailsProps> = ({
  title,
  description,
  iconColor = "#3572EF",
  icon: Icon,
}) => {
  return (
    <div className="flex w-96 mt-6 rounded-xl shadow-lg bg-white/45 hover:scale-110 transition duration-700">
      <div className="flex justify-center m-4 p-2 flex-col space-y-3">
        <div className="flex space-x-3 items-center">
          <Icon size={34} color={iconColor} />
          <p className="font-semibold text-xl font-poppins text-blue-900">
            {title}
          </p>
        </div>
        <p className="text-slate-700">{description}</p>
      </div>
    </div>
  );
};

export default Details;
