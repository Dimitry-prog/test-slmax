import readMark from '../assets/img/readMark.svg';

type TimeMessageProps = {
  time: string;
  my: boolean;
};

const TimeMessage = ({ time, my }: TimeMessageProps) => {
  return (
    <div className="flex gap-1 justify-end text-extra-small text-black-extra-light">
      {time}
      {my && <img src={readMark} alt="readMark" className="w-4 h-[10px] object-cover" />}
    </div>
  );
};

export default TimeMessage;
