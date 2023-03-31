import { Chat as Props } from 'src/store/user/types';

const Chat = ({ id, title, avatar, unReadCount, lastMessage }: Props): JSX.Element => {
  const count = unReadCount >= 1000 ? '999+' : unReadCount;

  return (
    <li className="flex items-center px-4 py-3 cursor-pointer hover:bg-sky-500 ease-in duration-100 hover:text-white">
      <img className="inline-block h-1/6 rounded-full w-1/6" src={avatar} />
      <div className="ml-2 w-5/6">
        <div className="flex justify-between items-center mb-1">
          <p>{title}</p>
          {lastMessage ? <p className="text-sm">{lastMessage.createdAt}</p> : null}
        </div>
        <div className="flex justify-between items-center">
          {lastMessage ? (
            <p className={`${count ? 'w-5/6' : ''} overflow-hidden whitespace-nowrap text-ellipsis text-sm`}>
              {lastMessage.text}
            </p>
          ) : null}
          {count ? (
            <span className="bg-sky-500 rounded-3xl text-white text-center px-1 text-sm min-w-5">{count}</span>
          ) : null}
        </div>
      </div>
    </li>
  );
};

export default Chat;
