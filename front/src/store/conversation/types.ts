import { Base, CommonChat, CommonMessage } from '../types';

export interface Store extends Base<CommonChat> {
  messages: CommonMessage[];
}
