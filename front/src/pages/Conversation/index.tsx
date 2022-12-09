import { useParams } from 'react-router-dom';

const Conversation = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();

  return <div>Conversation with id: {id}</div>;
};

export default Conversation;
