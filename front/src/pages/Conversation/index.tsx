import { useParams } from 'react-router-dom';

const Conversation = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="w-3/4">
      <div className="h-1/10 border-b">chat № {id} header</div>
      <div className="max-h-9/10">conversation № {id}</div>
    </div>
  );
};

export default Conversation;
