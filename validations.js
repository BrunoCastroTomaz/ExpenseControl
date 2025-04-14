function validateEmail(email) { 
    //função que verifica se o email é valido usando expressoes regulares
    return /\S+@\S+\.\S+/.test(email);
}
// Importante:
// Esta é uma validação de e-mail muito básica. Ela verifica apenas a estrutura geral e não garante que o endereço de e-mail seja realmente válido, exista ou esteja formatado de acordo com todas as especificações RFC para endereços de e-mail.

// Para uma validação de e-mail mais robusta, você precisaria de uma expressão regular mais complexa ou usar uma biblioteca de validação de e-mail dedicada. No entanto, para verificações simples de formato, essa expressão regular pode ser útil.