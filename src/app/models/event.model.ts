export interface EventItem {
  id: number;
  title: string;
  category: string;
  date: string; // chaîne ISO (AAAA-MM-JJ)
  place: string;
  price: number;
  imageUrl: string;
  description: string;
}
