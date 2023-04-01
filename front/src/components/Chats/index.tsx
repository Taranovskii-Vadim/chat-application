import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import user from 'src/store/user';
import { Chat as ChatType } from 'src/store/user/types';

interface Props {
  data: ChatType[];
}

// TODO maybe create routes folder
const BASE = '/conversation/';

const Chats = ({ data }: Props): JSX.Element => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(parseInt(location.pathname.split(BASE)[1], 10));

  const handleMoveToConversation = (id: number): void => {
    navigate(`${BASE}${id}`);
    setCurrent(id);
  };

  return (
    <ul className="overflow-y-auto max-h-9/10">
      {data.map(({ id, title, avatar, unReadCount, lastMessage }) => {
        const count = unReadCount >= 1000 ? '999+' : unReadCount;
        const prefix = current === id ? 'bg-sky-500 text-white' : '';

        return (
          <li
            key={id}
            className={`${prefix} flex items-center px-4 py-3 cursor-pointer hover:bg-sky-500 ease-in duration-100 hover:text-white`}
            onClick={() => handleMoveToConversation(id)}
          >
            <img className="inline-block h-1/6 rounded-full w-1/6" src={avatar} />
            <div className="ml-2 w-5/6">
              <div className="flex justify-between items-center mb-1">
                <p>{title}</p>
                {lastMessage ? <p className="text-sm">{lastMessage.createdAt}</p> : null}
              </div>
              <div className="flex justify-between items-center">
                {lastMessage ? (
                  <p className={`${count ? 'w-5/6' : ''} overflow-hidden whitespace-nowrap text-ellipsis text-sm`}>
                    {user.data?.id === lastMessage.sender.id ? `You: ${lastMessage.text}` : lastMessage.text}
                  </p>
                ) : null}
                {count ? (
                  <span className="bg-sky-500 rounded-3xl text-white text-center px-1 text-sm min-w-5">{count}</span>
                ) : null}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Chats;
