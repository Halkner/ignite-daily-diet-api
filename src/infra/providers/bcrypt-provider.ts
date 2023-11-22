import { compare, hash } from 'bcrypt';

import { CryptProvider } from '@domain/providers/crypt-provider';

export class BcryptProvider implements CryptProvider {
  compare(data: string, hash: string): Promise<boolean> {
    return compare(data, hash);
  }
  hash(data: string, salt?: number): Promise<string> {
    return hash(data, salt ?? 8);
  }
}
