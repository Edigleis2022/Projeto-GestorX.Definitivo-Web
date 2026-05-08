export function gerarBasicToken(
  email: string,
  senha: string
): string {

  return (
    "Basic " +
    btoa(`${email}:${senha}`)
  );
}