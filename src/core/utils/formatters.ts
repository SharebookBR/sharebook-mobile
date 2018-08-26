export const formatPhone = (phone) => {
  if (phone) {
    phone = phone.toString();
    phone = phone.replace(/\D/g, '');                   // Remove tudo o que não é dígito
    phone = phone.replace(/^(\d{2})(\d)/g, '($1) $2');  // Coloca parênteses em volta dos dois primeiros dígitos
    phone = phone.replace(/(\d)(\d{4})$/, '$1-$2');     // Coloca hífen entre o quarto e o quinto dígitos
  }
  return phone;
};

export const formatCep = (cep) => {
  if (cep) {
    cep = cep.toString();
    cep = cep.replace(/\D/g, ""); //Remove tudo o que não é dígito
    cep = cep.replace(/(\d)(\d{3})$/, "$1-$2"); //Coloca hífen separando os 2 grupos de dígitos
  }
  return cep;
};
