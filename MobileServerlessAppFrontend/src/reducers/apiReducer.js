import {
    GET_USUARIO_SUCESSO,
    LIMPA_CONTATO_BUSCADO,
    GET_USUARIO_ERRO,
    PUT_EVENTO_SUCESSO,
    PUT_EVENTO_ERRO,
    GET_EVENTOS_UCESSO,
    GET_EVENTO_ERRO,
    LIST_EVENTOS_SUCESSO,
    LIST_EVENTOS_ERRO,
    DELETE_EVENTO_SUCESSO,
    DELETE_EVENTO_ERRO,
    PUT_CONVIDADO_SUCESSO,
    PUT_CONVIDADO_ERRO,
    LIST_CONVIDADOS_SUCESSO,
    LIST_CONVIDADOS_ERRO,
    PUT_MEUS_CONVITES_SUCESSO,
    PUT_MEUS_CONVITES_ERRO,
    LIST_MEUS_CONVITES_SUCESSO,
    LIST_MEUS_CONVITES_ERRO,
    RESPOSTA_CONVITE_SUCESSO,
    RESPOSTA_CONVITE_ERRO,
    MODIFICA_EVENTO_SELECIONADO,
    GET_USUARIO_CONTATO_SUCESSO,
    GET_USUARIO_CONTATO_ERRO,
    PUT_USUARIO_ERRO,
    PUT_USUARIO_SUCESSO
} from './../actions/types';
import { Alert } from 'react-native';

const INITIAL_STATE = {
    loading: false,
    usuario: {
        agenda: [],
        username: "",
        contatos: [],
        nome: ""
    },
    eventosCriadosUsuario: [],
    meusConvites: [],
    eventoSelecionado: { criador: "", idEvento: "", nome: "", data: "", local: "", descricao: "", hora: "" },
    inclusaoConcluida: false,
    contatoBuscado: {}

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_USUARIO_SUCESSO:
            console.log("No reducer: ", action.payload);
            return { ...state, usuario: action.payload };

        case GET_USUARIO_ERRO:
            return state;

        case PUT_EVENTO_SUCESSO:
            return { ...state, eventoSelecionado: action.payload, inclusaoConcluida: true };

        case PUT_EVENTO_ERRO:
            return state;

        case GET_EVENTOS_UCESSO:
            return { ...state, eventoSelecionado: action.payload };

        case GET_EVENTO_ERRO:
            return state;

        case LIST_EVENTOS_SUCESSO:
            return { ...state, eventosCriadosUsuario: action.payload };

        case LIST_EVENTOS_ERRO:
            return state;

        case DELETE_EVENTO_SUCESSO:
            return state;

        case DELETE_EVENTO_ERRO:
            return state;

        case PUT_CONVIDADO_SUCESSO:
            return state;

        case PUT_CONVIDADO_ERRO:
            return state;

        case LIST_CONVIDADOS_SUCESSO:
            return state;

        case LIST_CONVIDADOS_ERRO:
            return state;

        case PUT_MEUS_CONVITES_SUCESSO:
            return state;

        case PUT_MEUS_CONVITES_ERRO:
            return state;

        case LIST_MEUS_CONVITES_SUCESSO:
            return { ...state, meusConvites: action.payload };

        case LIST_MEUS_CONVITES_ERRO:
            return state;

        case RESPOSTA_CONVITE_SUCESSO:
            return state;

        case RESPOSTA_CONVITE_ERRO:
            return state;

        case MODIFICA_EVENTO_SELECIONADO:
            return { ...state, eventoSelecionado: action.payload };

        case GET_USUARIO_CONTATO_SUCESSO:
            console.log("Usuario buscado reducer: ", action.payload);
            return { ...state, contatoBuscado: action.payload }

        case GET_USUARIO_CONTATO_ERRO:
            Alert.alert(
                'Algo errado não está certo: buscar contato',
                action.payload,
                [
                    { text: 'OK', onPress: () => { } },
                ],
            )
            return { ...state, contatoBuscado: {} };;

        case PUT_USUARIO_ERRO:
            return { ...state, contatoBuscado: {} };
        case PUT_USUARIO_SUCESSO:
            console.log("PUT)USUSARIO_SUCESSO reducer: ", action.payload);
            return { ...state, usuario: action.payload, contatoBuscado: {} };

        case LIMPA_CONTATO_BUSCADO:
            return { ...state, contatoBuscado: {} };
    }
    return state;
}