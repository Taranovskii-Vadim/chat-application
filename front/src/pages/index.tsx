import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import user from 'src/store/user';

import Chat from 'src/components/Chat';
import Input from 'src/components/ui/Input';

const Pages = (): JSX.Element => {
  useEffect(() => {
    user.fetchData();
  }, []);

  if (user.isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="flex h-screen max-h-screen">
      <div className="w-1/4 border-r">
        <form className="py-2 px-4 h-1/10 border-b">
          <Input placeholder="Добавить чат" />
        </form>
        <ul className="overflow-y-auto max-h-9/10">
          {user.chats.map((item) => {
            return <Chat key={item.id} {...item} />;
          })}
        </ul>
      </div>
      <div className="w-3/4">
        <div className="h-1/10 border-b">chat header</div>
        <div className="max-h-9/10">conversation</div>
      </div>
    </div>

    // <tr className="relative transform scale-100 text-xs py-1 border-b-2 border-blue-100 cursor-default bg-blue-500 bg-opacity-25">
    //   <td className="pl-5 pr-3 whitespace-no-wrap">
    //     <div className="text-gray-400">Today</div>
    //     <div>07:45</div>
    //   </td>
    //   <td className="px-2 py-2 whitespace-no-wrap">
    //     <div className="leading-5 text-gray-500 font-medium">Taylor Otwel</div>
    //     <div className="leading-5 text-gray-900">
    //       Create pull request #1213
    //       <a className="text-blue-500 hover:underline" href="#">
    //         #231231
    //       </a>
    //     </div>
    //     <div className="leading-5 text-gray-800">Hello message</div>
    //   </td>
    // </tr>
  );
};

export default observer(Pages);
