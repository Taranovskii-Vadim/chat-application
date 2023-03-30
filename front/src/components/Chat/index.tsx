import { Chat as Props } from 'src/store/user/types';

const Chat = ({ id, title, avatar, unReadCount }: Props): JSX.Element => {
  return (
    <li className="flex items-center px-4 py-3 cursor-pointer hover:bg-sky-500 ease-in duration-100 hover:text-white">
      <img className="inline-block h-1/6 rounded-full w-1/6" src={avatar} />
      <div className="ml-2 w-5/6">
        <div className="flex justify-between">
          <p>{title}</p>
          <p>10:11</p>
        </div>
        <div className="flex justify-between">
          <p>text</p>
          {unReadCount ? (
            // {/* TODO think about styles for 99+ */}
            <span className="bg-sky-500 rounded-3xl text-white h-6 text-center w-6">{unReadCount}</span>
          ) : null}
        </div>
      </div>
    </li>
  );
};

export default Chat;
