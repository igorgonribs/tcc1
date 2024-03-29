
import {
    MODIFICA_EMAIL,
    MODIFICA_CODIGO_CONFIRMACAO,
    MODIFICA_SENHA,
    LOADING,
} from './../actions/types';

const INITIAL_STATE = {
    
    testeRetornoApi: [],
    nome: 'admin',
    password: '',
    email: '',
    codigoConfirmacao: ""
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOADING:
            console.log("LOADING reducer");
            return { ...state, loading: action.payload };

        case MODIFICA_EMAIL:
            console.log("Modifica email reducer");
            return { ...state, email: action.payload };

        case MODIFICA_CODIGO_CONFIRMACAO:
            console.log("Modifica codigo reducer");
            return { ...state, codigoConfirmacao: action.payload };

        case MODIFICA_SENHA:
            console.log("Modifica senha reducer");
            return { ...state, password: action.payload };
    }
    return state;
}