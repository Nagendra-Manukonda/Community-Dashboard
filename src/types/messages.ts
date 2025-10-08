export interface Contact {
  id: string;
  name: string;
  time: string;
  last: string;
  image: string;
  online?: boolean;
}
export interface Message {
  id: string;
  fromMe?: boolean;
  text?: string;
  time?: string;
  image?: string;
}