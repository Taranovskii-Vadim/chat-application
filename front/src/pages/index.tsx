import Input from 'src/components/ui/Input';

const Pages = (): JSX.Element => {
  // here we must fetch user profile and chats
  return (
    <div className="flex h-screen max-h-screen">
      <div className="w-1/4">
        <form className="py-2 px-4 h-1/10">
          <Input placeholder="Добавить чат" />
        </form>
        <ul className="overflow-y-auto max-h-9/10">
          <li>first</li>
          <li>second</li>
        </ul>
      </div>
      <div className="w-3/4">
        <div className="h-1/10">chat header</div>
        <div className="max-h-9/10">conversation</div>
      </div>
    </div>

    // <div className="container mx-auto py-10 flex justify-center h-screen">
    //   <div className="w-4/12 pl-4  h-full flex flex-col">
    //     <div className="bg-white text-sm text-gray-500 font-bold px-5 py-2 shadow border-b border-gray-300">
    //       Tracking events
    //     </div>

    //     <div className="w-full h-full overflow-auto shadow bg-white" id="journal-scroll">
    //       <table className="w-full">
    //         <tbody className="">
    //           <tr
    //             className="relative transform scale-100
    //                                       text-xs py-1 border-b-2 border-blue-100 cursor-default

    //                               bg-blue-500 bg-opacity-25"
    //           >
    //             <td className="pl-5 pr-3 whitespace-no-wrap">
    //               <div className="text-gray-400">Today</div>
    //               <div>07:45</div>
    //             </td>

    //             <td className="px-2 py-2 whitespace-no-wrap">
    //               <div className="leading-5 text-gray-500 font-medium">Taylor Otwel</div>
    //               <div className="leading-5 text-gray-900">
    //                 Create pull request #1213
    //                 <a className="text-blue-500 hover:underline" href="#">
    //                   #231231
    //                 </a>
    //               </div>
    //               <div className="leading-5 text-gray-800">Hello message</div>
    //             </td>
    //           </tr>
    //           <tr
    //             className="relative transform scale-100
    //                                       text-xs py-1 border-b-2 border-blue-100 cursor-default

    //                               bg-blue-500 bg-opacity-25"
    //           >
    //             <td className="pl-5 pr-3 whitespace-no-wrap">
    //               <div className="text-gray-400">Today</div>
    //               <div>07:45</div>
    //             </td>

    //             <td className="px-2 py-2 whitespace-no-wrap">
    //               <div className="leading-5 text-gray-500 font-medium">Taylor Otwel</div>
    //               <div className="leading-5 text-gray-900">
    //                 Create pull request #1213
    //                 <a className="text-blue-500 hover:underline" href="#">
    //                   #231231
    //                 </a>
    //               </div>
    //               <div className="leading-5 text-gray-800">Hello message</div>
    //             </td>
    //           </tr>
    //           <tr
    //             className="relative transform scale-100
    //                                       text-xs py-1 border-b-2 border-blue-100 cursor-default

    //                               "
    //           >
    //             <td className="pl-5 pr-3 whitespace-no-wrap">
    //               <div className="text-gray-400">24 jule</div>
    //               <div>07:45</div>
    //             </td>

    //             <td className="px-2 py-2 whitespace-no-wrap">
    //               <div className="leading-5 text-gray-500 font-medium">Taylor Otwel</div>
    //               <div className="leading-5 text-gray-900">
    //                 Create pull request #1213
    //                 <a className="text-blue-500 hover:underline" href="#">
    //                   #231231
    //                 </a>
    //               </div>
    //               <div className="leading-5 text-gray-800">Hello message</div>
    //             </td>
    //           </tr>
    //           <tr
    //             className="relative transform scale-100
    //                                       text-xs py-1 border-b-2 border-blue-100 cursor-default

    //                               "
    //           >
    //             <td className="pl-5 pr-3 whitespace-no-wrap">
    //               <div className="text-gray-400">24 jule</div>
    //               <div>07:45</div>
    //             </td>

    //             <td className="px-2 py-2 whitespace-no-wrap">
    //               <div className="leading-5 text-gray-500 font-medium">Taylor Otwel</div>
    //               <div className="leading-5 text-gray-900">
    //                 Create pull request #1213
    //                 <a className="text-blue-500 hover:underline" href="#">
    //                   #231231
    //                 </a>
    //               </div>
    //               <div className="leading-5 text-gray-800">Hello message</div>
    //             </td>
    //           </tr>
    //           <tr
    //             className="relative transform scale-100
    //                                       text-xs py-1 border-b-2 border-blue-100 cursor-default

    //                               "
    //           >
    //             <td className="pl-5 pr-3 whitespace-no-wrap">
    //               <div className="text-gray-400">24 jule</div>
    //               <div>07:45</div>
    //             </td>

    //             <td className="px-2 py-2 whitespace-no-wrap">
    //               <div className="leading-5 text-gray-500 font-medium">Taylor Otwel</div>
    //               <div className="leading-5 text-gray-900">
    //                 Create pull request #1213
    //                 <a className="text-blue-500 hover:underline" href="#">
    //                   #231231
    //                 </a>
    //               </div>
    //               <div className="leading-5 text-gray-800">Hello message</div>
    //             </td>
    //           </tr>
    //           <tr
    //             className="relative transform scale-100
    //                                       text-xs py-1 border-b-2 border-blue-100 cursor-default

    //                               "
    //           >
    //             <td className="pl-5 pr-3 whitespace-no-wrap">
    //               <div className="text-gray-400">24 jule</div>
    //               <div>07:45</div>
    //             </td>

    //             <td className="px-2 py-2 whitespace-no-wrap">
    //               <div className="leading-5 text-gray-500 font-medium">Taylor Otwel</div>
    //               <div className="leading-5 text-gray-900">
    //                 Create pull request #1213
    //                 <a className="text-blue-500 hover:underline" href="#">
    //                   #231231
    //                 </a>
    //               </div>
    //               <div className="leading-5 text-gray-800">Hello message</div>
    //             </td>
    //           </tr>
    //           <tr
    //             className="relative transform scale-100
    //                                       text-xs py-1 border-b-2 border-blue-100 cursor-default

    //                               "
    //           >
    //             <td className="pl-5 pr-3 whitespace-no-wrap">
    //               <div className="text-gray-400">24 jule</div>
    //               <div>07:45</div>
    //             </td>

    //             <td className="px-2 py-2 whitespace-no-wrap">
    //               <div className="leading-5 text-gray-500 font-medium">Taylor Otwel</div>
    //               <div className="leading-5 text-gray-900">
    //                 Create pull request #1213
    //                 <a className="text-blue-500 hover:underline" href="#">
    //                   #231231
    //                 </a>
    //               </div>
    //               <div className="leading-5 text-gray-800">Hello message</div>
    //             </td>
    //           </tr>
    //           <tr
    //             className="relative transform scale-100
    //                                       text-xs py-1 border-b-2 border-blue-100 cursor-default

    //                               "
    //           >
    //             <td className="pl-5 pr-3 whitespace-no-wrap">
    //               <div className="text-gray-400">24 jule</div>
    //               <div>07:45</div>
    //             </td>

    //             <td className="px-2 py-2 whitespace-no-wrap">
    //               <div className="leading-5 text-gray-500 font-medium">Taylor Otwel</div>
    //               <div className="leading-5 text-gray-900">
    //                 Create pull request #1213
    //                 <a className="text-blue-500 hover:underline" href="#">
    //                   #231231
    //                 </a>
    //               </div>
    //               <div className="leading-5 text-gray-800">Hello message</div>
    //             </td>
    //           </tr>
    //           <tr
    //             className="relative transform scale-100
    //                                       text-xs py-1 border-b-2 border-blue-100 cursor-default

    //                               "
    //           >
    //             <td className="pl-5 pr-3 whitespace-no-wrap">
    //               <div className="text-gray-400">24 jule</div>
    //               <div>07:45</div>
    //             </td>

    //             <td className="px-2 py-2 whitespace-no-wrap">
    //               <div className="leading-5 text-gray-500 font-medium">Taylor Otwel</div>
    //               <div className="leading-5 text-gray-900">
    //                 Create pull request #1213
    //                 <a className="text-blue-500 hover:underline" href="#">
    //                   #231231
    //                 </a>
    //               </div>
    //               <div className="leading-5 text-gray-800">Hello message</div>
    //             </td>
    //           </tr>
    //           <tr
    //             className="relative transform scale-100
    //                                       text-xs py-1 border-b-2 border-blue-100 cursor-default

    //                               "
    //           >
    //             <td className="pl-5 pr-3 whitespace-no-wrap">
    //               <div className="text-gray-400">24 jule</div>
    //               <div>07:45</div>
    //             </td>

    //             <td className="px-2 py-2 whitespace-no-wrap">
    //               <div className="leading-5 text-gray-500 font-medium">Taylor Otwel</div>
    //               <div className="leading-5 text-gray-900">
    //                 Create pull request #1213
    //                 <a className="text-blue-500 hover:underline" href="#">
    //                   #231231
    //                 </a>
    //               </div>
    //               <div className="leading-5 text-gray-800">Hello message</div>
    //             </td>
    //           </tr>
    //           <tr
    //             className="relative transform scale-100
    //                                       text-xs py-1 border-b-2 border-blue-100 cursor-default

    //                               "
    //           >
    //             <td className="pl-5 pr-3 whitespace-no-wrap">
    //               <div className="text-gray-400">24 jule</div>
    //               <div>07:45</div>
    //             </td>

    //             <td className="px-2 py-2 whitespace-no-wrap">
    //               <div className="leading-5 text-gray-500 font-medium">Taylor Otwel</div>
    //               <div className="leading-5 text-gray-900">
    //                 Create pull request #1213
    //                 <a className="text-blue-500 hover:underline" href="#">
    //                   #231231
    //                 </a>
    //               </div>
    //               <div className="leading-5 text-gray-800">Hello message</div>
    //             </td>
    //           </tr>
    //           <tr
    //             className="relative transform scale-100
    //                                       text-xs py-1 border-b-2 border-blue-100 cursor-default

    //                               "
    //           >
    //             <td className="pl-5 pr-3 whitespace-no-wrap">
    //               <div className="text-gray-400">24 jule</div>
    //               <div>07:45</div>
    //             </td>

    //             <td className="px-2 py-2 whitespace-no-wrap">
    //               <div className="leading-5 text-gray-500 font-medium">Taylor Otwel</div>
    //               <div className="leading-5 text-gray-900">
    //                 Create pull request #1213
    //                 <a className="text-blue-500 hover:underline" href="#">
    //                   #231231
    //                 </a>
    //               </div>
    //               <div className="leading-5 text-gray-800">Hello message</div>
    //             </td>
    //           </tr>
    //           <tr
    //             className="relative transform scale-100
    //                                       text-xs py-1 border-b-2 border-blue-100 cursor-default

    //                               "
    //           >
    //             <td className="pl-5 pr-3 whitespace-no-wrap">
    //               <div className="text-gray-400">24 jule</div>
    //               <div>07:45</div>
    //             </td>

    //             <td className="px-2 py-2 whitespace-no-wrap">
    //               <div className="leading-5 text-gray-500 font-medium">Taylor Otwel</div>
    //               <div className="leading-5 text-gray-900">
    //                 Create pull request #1213
    //                 <a className="text-blue-500 hover:underline" href="#">
    //                   #231231
    //                 </a>
    //               </div>
    //               <div className="leading-5 text-gray-800">Hello message</div>
    //             </td>
    //           </tr>
    //           <tr
    //             className="relative transform scale-100
    //                                       text-xs py-1 border-b-2 border-blue-100 cursor-default

    //                               "
    //           >
    //             <td className="pl-5 pr-3 whitespace-no-wrap">
    //               <div className="text-gray-400">24 jule</div>
    //               <div>07:45</div>
    //             </td>

    //             <td className="px-2 py-2 whitespace-no-wrap">
    //               <div className="leading-5 text-gray-500 font-medium">Taylor Otwel</div>
    //               <div className="leading-5 text-gray-900">
    //                 Create pull request #1213
    //                 <a className="text-blue-500 hover:underline" href="#">
    //                   #231231
    //                 </a>
    //               </div>
    //               <div className="leading-5 text-gray-800">Hello message</div>
    //             </td>
    //           </tr>
    //           <tr
    //             className="relative transform scale-100
    //                                       text-xs py-1 border-b-2 border-blue-100 cursor-default

    //                               "
    //           >
    //             <td className="pl-5 pr-3 whitespace-no-wrap">
    //               <div className="text-gray-400">24 jule</div>
    //               <div>07:45</div>
    //             </td>

    //             <td className="px-2 py-2 whitespace-no-wrap">
    //               <div className="leading-5 text-gray-500 font-medium">Taylor Otwel</div>
    //               <div className="leading-5 text-gray-900">
    //                 Create pull request #1213
    //                 <a className="text-blue-500 hover:underline" href="#">
    //                   #231231
    //                 </a>
    //               </div>
    //               <div className="leading-5 text-gray-800">Hello message</div>
    //             </td>
    //           </tr>
    //           <tr
    //             className="relative transform scale-100
    //                                       text-xs py-1 border-b-2 border-blue-100 cursor-default

    //                               "
    //           >
    //             <td className="pl-5 pr-3 whitespace-no-wrap">
    //               <div className="text-gray-400">24 jule</div>
    //               <div>07:45</div>
    //             </td>

    //             <td className="px-2 py-2 whitespace-no-wrap">
    //               <div className="leading-5 text-gray-500 font-medium">Taylor Otwel</div>
    //               <div className="leading-5 text-gray-900">
    //                 Create pull request #1213
    //                 <a className="text-blue-500 hover:underline" href="#">
    //                   #231231
    //                 </a>
    //               </div>
    //               <div className="leading-5 text-gray-800">Hello message</div>
    //             </td>
    //           </tr>
    //           <tr
    //             className="relative transform scale-100
    //                                       text-xs py-1 border-b-2 border-blue-100 cursor-default

    //                               "
    //           >
    //             <td className="pl-5 pr-3 whitespace-no-wrap">
    //               <div className="text-gray-400">24 jule</div>
    //               <div>07:45</div>
    //             </td>

    //             <td className="px-2 py-2 whitespace-no-wrap">
    //               <div className="leading-5 text-gray-500 font-medium">Taylor Otwel</div>
    //               <div className="leading-5 text-gray-900">
    //                 Create pull request #1213
    //                 <a className="text-blue-500 hover:underline" href="#">
    //                   #231231
    //                 </a>
    //               </div>
    //               <div className="leading-5 text-gray-800">Hello message</div>
    //             </td>
    //           </tr>
    //           <tr
    //             className="relative transform scale-100
    //                                       text-xs py-1 border-b-2 border-blue-100 cursor-default

    //                               "
    //           >
    //             <td className="pl-5 pr-3 whitespace-no-wrap">
    //               <div className="text-gray-400">24 jule</div>
    //               <div>07:45</div>
    //             </td>

    //             <td className="px-2 py-2 whitespace-no-wrap">
    //               <div className="leading-5 text-gray-500 font-medium">Taylor Otwel</div>
    //               <div className="leading-5 text-gray-900">
    //                 Create pull request #1213
    //                 <a className="text-blue-500 hover:underline" href="#">
    //                   #231231
    //                 </a>
    //               </div>
    //               <div className="leading-5 text-gray-800">Hello message</div>
    //             </td>
    //           </tr>
    //           <tr
    //             className="relative transform scale-100
    //                                       text-xs py-1 border-b-2 border-blue-100 cursor-default

    //                               "
    //           >
    //             <td className="pl-5 pr-3 whitespace-no-wrap">
    //               <div className="text-gray-400">24 jule</div>
    //               <div>07:45</div>
    //             </td>

    //             <td className="px-2 py-2 whitespace-no-wrap">
    //               <div className="leading-5 text-gray-500 font-medium">Taylor Otwel</div>
    //               <div className="leading-5 text-gray-900">
    //                 Create pull request #1213
    //                 <a className="text-blue-500 hover:underline" href="#">
    //                   #231231
    //                 </a>
    //               </div>
    //               <div className="leading-5 text-gray-800">Hello message</div>
    //             </td>
    //           </tr>
    //           <tr
    //             className="relative transform scale-100
    //                                       text-xs py-1 border-b-2 border-blue-100 cursor-default

    //                               "
    //           >
    //             <td className="pl-5 pr-3 whitespace-no-wrap">
    //               <div className="text-gray-400">24 jule</div>
    //               <div>07:45</div>
    //             </td>

    //             <td className="px-2 py-2 whitespace-no-wrap">
    //               <div className="leading-5 text-gray-500 font-medium">Taylor Otwel</div>
    //               <div className="leading-5 text-gray-900">
    //                 Create pull request #1213
    //                 <a className="text-blue-500 hover:underline" href="#">
    //                   #231231
    //                 </a>
    //               </div>
    //               <div className="leading-5 text-gray-800">Hello message</div>
    //             </td>
    //           </tr>
    //           <tr
    //             className="relative transform scale-100
    //                                       text-xs py-1 border-b-2 border-blue-100 cursor-default

    //                               "
    //           >
    //             <td className="pl-5 pr-3 whitespace-no-wrap">
    //               <div className="text-gray-400">24 jule</div>
    //               <div>07:45</div>
    //             </td>

    //             <td className="px-2 py-2 whitespace-no-wrap">
    //               <div className="leading-5 text-gray-500 font-medium">Taylor Otwel</div>
    //               <div className="leading-5 text-gray-900">
    //                 Create pull request #1213
    //                 <a className="text-blue-500 hover:underline" href="#">
    //                   #231231
    //                 </a>
    //               </div>
    //               <div className="leading-5 text-gray-800">Hello message</div>
    //             </td>
    //           </tr>
    //           <tr
    //             className="relative transform scale-100
    //                                       text-xs py-1 border-b-2 border-blue-100 cursor-default

    //                               "
    //           >
    //             <td className="pl-5 pr-3 whitespace-no-wrap">
    //               <div className="text-gray-400">24 jule</div>
    //               <div>07:45</div>
    //             </td>

    //             <td className="px-2 py-2 whitespace-no-wrap">
    //               <div className="leading-5 text-gray-500 font-medium">Taylor Otwel</div>
    //               <div className="leading-5 text-gray-900">
    //                 Create pull request #1213
    //                 <a className="text-blue-500 hover:underline" href="#">
    //                   #231231
    //                 </a>
    //               </div>
    //               <div className="leading-5 text-gray-800">Hello message</div>
    //             </td>
    //           </tr>
    //           <tr
    //             className="relative transform scale-100
    //                                       text-xs py-1 border-b-2 border-blue-100 cursor-default

    //                               "
    //           >
    //             <td className="pl-5 pr-3 whitespace-no-wrap">
    //               <div className="text-gray-400">24 jule</div>
    //               <div>07:45</div>
    //             </td>

    //             <td className="px-2 py-2 whitespace-no-wrap">
    //               <div className="leading-5 text-gray-500 font-medium">Taylor Otwel</div>
    //               <div className="leading-5 text-gray-900">
    //                 Create pull request #1213
    //                 <a className="text-blue-500 hover:underline" href="#">
    //                   #231231
    //                 </a>
    //               </div>
    //               <div className="leading-5 text-gray-800">Hello message</div>
    //             </td>
    //           </tr>
    //           <tr
    //             className="relative transform scale-100
    //                                       text-xs py-1 border-b-2 border-blue-100 cursor-default

    //                               "
    //           >
    //             <td className="pl-5 pr-3 whitespace-no-wrap">
    //               <div className="text-gray-400">24 jule</div>
    //               <div>07:45</div>
    //             </td>

    //             <td className="px-2 py-2 whitespace-no-wrap">
    //               <div className="leading-5 text-gray-500 font-medium">Taylor Otwel</div>
    //               <div className="leading-5 text-gray-900">
    //                 Create pull request #1213
    //                 <a className="text-blue-500 hover:underline" href="#">
    //                   #231231
    //                 </a>
    //               </div>
    //               <div className="leading-5 text-gray-800">Hello message</div>
    //             </td>
    //           </tr>
    //           <tr
    //             className="relative transform scale-100
    //                                       text-xs py-1 border-b-2 border-blue-100 cursor-default

    //                               "
    //           >
    //             <td className="pl-5 pr-3 whitespace-no-wrap">
    //               <div className="text-gray-400">24 jule</div>
    //               <div>07:45</div>
    //             </td>

    //             <td className="px-2 py-2 whitespace-no-wrap">
    //               <div className="leading-5 text-gray-500 font-medium">Taylor Otwel</div>
    //               <div className="leading-5 text-gray-900">
    //                 Create pull request #1213
    //                 <a className="text-blue-500 hover:underline" href="#">
    //                   #231231
    //                 </a>
    //               </div>
    //               <div className="leading-5 text-gray-800">Hello message</div>
    //             </td>
    //           </tr>
    //           <tr className="relative transform scale-100 text-xs py-1 border-b-2 border-blue-100 cursor-default">
    //             <td className="pl-5 pr-3 whitespace-no-wrap">
    //               <div className="text-gray-400">24 jule</div>
    //               <div>07:45</div>
    //             </td>

    //             <td className="px-2 py-2 whitespace-no-wrap">
    //               <div className="leading-5 text-gray-500 font-medium">Taylor Otwel</div>
    //               <div className="leading-5 text-gray-900">
    //                 Create pull request #1213
    //                 <a className="text-blue-500 hover:underline" href="#">
    //                   #231231
    //                 </a>
    //               </div>
    //               <div className="leading-5 text-gray-800">Hello message</div>
    //             </td>
    //           </tr>
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Pages;
