type SystemMessageProps = {
  date: string;
};

const SystemMessage = ({ date }: SystemMessageProps) => {
  return <div className="px-3 py-2 w-fit self-center text-xs bg-blue-light">{date}</div>;
};

export default SystemMessage;
