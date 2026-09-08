import { MyBig } from "@/lib/big";

const toCent = (amount: number) =>
  new MyBig(amount).mul(100).round(2).toNumber();

const fromCentToDollar = (amount: number) =>
  new MyBig(amount).div(100).round(2).toNumber();

const toCurrencyFromCents = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(fromCentToDollar(amount));

export { fromCentToDollar, toCent, toCurrencyFromCents };
