// Shown to the user as an estimate; the backend calculates the real total.
export const DELIVERY_FEE = 40;

export interface ShippingDetails {
  fullName: string;
  phone: string;
  line: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
}
