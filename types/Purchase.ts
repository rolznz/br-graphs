export type Purchase = {
  payment_method: string;
  purchase_category: string;
  country: string;
  created_time: string;
  euro_price: number;
  zero_conf_time: string;
  time_to_onchain_conf: number | null;
  is_from_exchange: 0 | 1;
  exchange_name: string | null;
  fee_rate: number;
  fee_estimates: number;
  has_account: 0 | 1;
  satoshi_amount: number;
  user_wallet: string;
  is_walletconnect: "Y" | "N";
  ID: number;
};
