import { BaseApiClient } from '@/services/api/base';
import { ApiResponse } from '@/types/apiResponse';
import { Wallet } from '@/types/wallet';

export class WalletApiClient extends BaseApiClient {
  async getWallet(): Promise<ApiResponse<Wallet>> {
    return this.request("/wallets", {
      method: "GET",
    });
  }
}
