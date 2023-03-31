export type Message = {
  id: number;
  text: string;
  createdAt: string;
  sender: { id: number; fullname: string };
};
