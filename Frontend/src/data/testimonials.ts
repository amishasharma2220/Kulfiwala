// NOTE: These testimonials were already present in the codebase before this
// revision (duplicated separately in the homepage and Contact page). They
// have been centralized here to remove duplication, but they still read as
// placeholder/sample content rather than verified reviews from real
// customers. Swap in real reviews (and, ideally, a verification badge)
// before launch — see project handoff notes.
export interface Testimonial {
  name: string;
  location?: string;
  text: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  { name: "Priya Sharma", location: "Delhi", text: "The best kulfi I've ever had! Takes me back to my grandmother's kitchen.", rating: 5 },
  { name: "Rahul Verma", location: "Mumbai", text: "Kesar kulfi is absolutely divine. Ordering every weekend now!", rating: 5 },
  { name: "Anita Patel", location: "Ahmedabad", text: "Fresh, authentic, and delivered so fast. Love the mango kulfi!", rating: 5 },
  { name: "Vikram Singh", location: "Jaipur", text: "Tried the Paan kulfi — mind-blowing flavour! Nothing like this anywhere else.", rating: 5 },
  { name: "Meera Iyer", location: "Bangalore", text: "Ordered the Dry Fruit Royal for a party. Every guest was asking where I got it from!", rating: 5 },
  { name: "Arjun Kapoor", location: "Pune", text: "The Gulkand kulfi is a work of art. So creamy and the rose flavour is perfect.", rating: 4 },
];
