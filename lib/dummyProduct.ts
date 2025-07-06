import { IProductSchema } from "@/features/Dashboard/ProductDetails/hook/schema";

// Data dummy untuk kategori Sneakers (sudah ada)
export const dummySneakersProducts: IProductSchema[] = [
  {
    id: "sneaker-001",
    name: "Nike Air Max 90",
    price: 1500000,
    size: 42,
    quantity: 12,
    createdAt: "2025-07-01T10:30:00.000Z",
    status: "Available",
  },
  {
    id: "sneaker-002",
    name: "Adidas Ultraboost 5",
    price: 1800000,
    size: 40,
    quantity: 8,
    createdAt: "2025-07-02T12:15:00.000Z",
    status: "Unavailable",
  },
  {
    id: "sneaker-003",
    name: "Puma RS-X3 Puzzle",
    price: 1300000,
    size: 41,
    quantity: 5,
    createdAt: "2025-07-03T14:45:00.000Z",
    status: "Available",
  },
  {
    id: "sneaker-004",
    name: "Converse Chuck Taylor All Star",
    price: 900000,
    size: 43,
    quantity: 0,
    createdAt: "2025-07-04T09:00:00.000Z",
    status: "Out of Stock",
  },
  {
    id: "sneaker-005",
    name: "Nike Air Max 90",
    price: 1500000,
    size: 42,
    quantity: 12,
    createdAt: "2025-07-01T10:30:00.000Z",
    status: "Available",
  },
  {
    id: "sneaker-006",
    name: "Adidas Ultraboost 5",
    price: 1800000,
    size: 40,
    quantity: 8,
    createdAt: "2025-07-02T12:15:00.000Z",
    status: "Unavailable",
  },
  {
    id: "sneaker-007",
    name: "Puma RS-X3 Puzzle",
    price: 1300000,
    size: 41,
    quantity: 5,
    createdAt: "2025-07-03T14:45:00.000Z",
    status: "Available",
  },
  {
    id: "sneaker-008",
    name: "Converse Chuck Taylor All Star",
    price: 900000,
    size: 43,
    quantity: 0,
    createdAt: "2025-07-04T09:00:00.000Z",
    status: "Out of Stock",
  },
];

// Data dummy untuk kategori Jacket
export const dummyJacketProducts: IProductSchema[] = [
  {
    id: "jacket-001",
    name: "Denim Jacket Classic",
    price: 850000,
    size: 38, // Ukuran jaket bisa S, M, L, XL, atau numerik
    quantity: 20,
    createdAt: "2025-06-28T09:00:00.000Z",
    status: "Available",
  },
  {
    id: "jacket-002",
    name: "Leather Biker Jacket",
    price: 2500000,
    size: 40,
    quantity: 5,
    createdAt: "2025-07-01T11:45:00.000Z",
    status: "Available",
  },
  {
    id: "jacket-003",
    name: "Bomber Jacket Urban",
    price: 700000,
    size: 39,
    quantity: 15,
    createdAt: "2025-07-03T16:00:00.000Z",
    status: "Available",
  },
  {
    id: "jacket-004",
    name: "Waterproof Rain Jacket",
    price: 950000,
    size: 42,
    quantity: 0, // Habis stok
    createdAt: "2025-07-05T08:30:00.000Z",
    status: "Out of Stock",
  },
  {
    id: "jacket-005",
    name: "Padded Winter Jacket",
    price: 1200000,
    size: 41,
    quantity: 7,
    createdAt: "2025-06-25T13:00:00.000Z",
    status: "Available",
  },
];

// Anda juga bisa membuat data dummy untuk kategori lain seperti T-Shirt, Bag, dll.
export const dummyTShirtProducts: IProductSchema[] = [
  {
    id: "tshirt-001",
    name: "Basic Cotton T-Shirt",
    price: 150000,
    size: 39,
    quantity: 50,
    createdAt: "2025-07-01T08:00:00.000Z",
    status: "Available",
  },
  {
    id: "tshirt-002",
    name: "Graphic Print Tee",
    price: 200000,
    size: 40,
    quantity: 30,
    createdAt: "2025-07-02T10:00:00.000Z",
    status: "Available",
  },
];

export const dummyBagProducts: IProductSchema[] = [
  {
    id: "bag-001",
    name: "Leather Backpack",
    price: 1800000,
    size: 1, // Ukuran bisa diinterpretasikan berbeda untuk tas, misal 1 = medium
    quantity: 10,
    createdAt: "2025-06-30T15:00:00.000Z",
    status: "Available",
  },
  {
    id: "bag-002",
    name: "Canvas Tote Bag",
    price: 250000,
    size: 1,
    quantity: 25,
    createdAt: "2025-07-01T09:00:00.000Z",
    status: "Available",
  },
];
