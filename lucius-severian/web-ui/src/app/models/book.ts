export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}
