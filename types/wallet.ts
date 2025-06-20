export interface Wallet {
  available_balance: number;
  balance_id: string;
  change_amount: number;
  currency: string;
  id: string;
  locked_amount: number;
  owner_id: string;
  owner_type: string;
  status: string;
}
