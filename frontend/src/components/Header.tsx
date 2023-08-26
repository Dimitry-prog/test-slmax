import chat from '../assets/img/chat.svg';

const Header = () => {
  return (
    <header className="py-[20px] px-4 flex gap-2 items-center shadow">
      <img src={chat} alt="chat" className="w-6 h-6 object-cover" />
      <h2 className="font-bold text-lg">Great Project</h2>
    </header>
  );
};

export default Header;
