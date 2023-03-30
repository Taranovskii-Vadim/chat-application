interface Props {
  title: string;
}

const Chat = ({ title }: Props): JSX.Element => {
  return <li className="px-4 py-2 cursor-pointer">{title}</li>;
};

export default Chat;
