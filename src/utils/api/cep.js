const cep = async (cep) => {
    return fetch(`https://viacep.com.br/ws/${cep}/json`)
            .then(r => r.json())
};

export default cep;