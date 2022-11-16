import { createMask } from '@ngneat/input-mask';
export const currencyMask = createMask({
  alias: 'numeric',
  groupSeparator: ',',
  digits: 2,
  digitsOptional: false,
  prefix: '$ ',
  placeholder: '0',
  parser: (value: string) => {
    return Number(value.substring(2)) as number;
  },
});
