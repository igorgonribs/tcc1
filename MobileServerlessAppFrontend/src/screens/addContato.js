import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { putUsuario, getUsuarioContato, limpaContatoBuscado, modificaLoading } from './../actions/apiActions';

class AddContato extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Novo Contato',
            headerStyle: {
                backgroundColor: '#000',
              },
              headerTintColor: '#fff',
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            contatoABuscar: ""
        }
    }

    isEmpty(a) {
        for (var prop in a) {
            if (a.hasOwnProperty(prop))
                return false;
        }

        return true;
    }

    componentWillUnmount() {
        this.props.limpaContatoBuscado();
    }

    adicionarContato() {
        if(this.props.contatoBuscado.username != this.props.usuario.username) {
            if (!this.props.usuario.contatos.includes(this.props.contatoBuscado.username)) {
                this.props.modificaLoading(true);
                var listaAtualizada = this.props.usuario.contatos;
    
                var obj = {
                    agenda: this.props.usuario.agenda,
                    contatos: listaAtualizada.concat(this.props.contatoBuscado.username),
                    username: this.props.usuario.username
                }
                this.props.putUsuario(obj, this.props.navigation);
            }
            else {
    
                Alert.alert(
                    'Contato já adicionado',
                    'Este usuário já está na sua lista de contatos',
                    [
                        { text: 'OK', onPress: () => { } },
                    ],
                )
            }

        } else {
            Alert.alert(
                'Este é o seu usuário',
                'Você não pode adicionar seu próprio usuário como contato.',
                [
                    { text: 'OK', onPress: () => { } },
                ],
            )
        }
        }
    

    render() {
        console.log("Contato buscado: ", this.props.contatoBuscado);
        if (this.isEmpty(this.props.contatoBuscado)) {
            return (
                <View style={styles.container}>
                    <View style={{ flex: 1, alignContent: "center", paddingVertical: 15 }}>
                            <Text style={{ fontSize: 18, paddingHorizontal: 20, color: "#000" }}>Buscar contato</Text>
                        </View>
                    {
                        this.props.loadingAPI ? <ActivityIndicator size="large" /> :
                            <View style={{ flex: 8, alignItems: "center", alignContent: "center", justifyContent: "center", alignSelf: "center" }}>
                                <TextInput editable={!this.props.loadingAPI} placeholder="Digite o E-mail" value={this.state.contatoABuscar} onChangeText={contato => this.setState({ contatoABuscar: contato })} />
                                <Button disabled={this.props.loadingAPI || this.state.contatoABuscar.length == 0} title="Buscar" onPress={() => { this.props.modificaLoading(true); this.props.getUsuarioContato(this.state.contatoABuscar) }} />
                                <Text style={{fontSize:16, padding:10}}>Busque por um contato através do e-mail para </Text>
                                <Text style={{fontSize:16, padding:10}}>adicioná-lo à sua lista de contatos</Text>
                            </View>
                    }
                    <View style={{ flex: 1 }}></View>
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <View style={{ flex: 1 }}>
                        <TextInput placeholder="Digite o E-mail" value={this.state.contatoABuscar} onChangeText={contato => this.setState({ contatoABuscar: contato })} />
                        <Button disabled={this.props.loadingAPI || this.state.contatoABuscar.length == 0} title="Buscar" onPress={() => this.props.getUsuarioContato(this.state.contatoABuscar)} />
                    </View>
                    <View style={{ flex: 8, alignItems: "center", alignContent: "center", justifyContent: "center", alignSelf: "center" }}>
                        <Text style={{fontSize:16, padding:10}} >Usuario encontrado</Text>
                        <Text style={{fontSize:16, padding:10}} >E-mail: {this.props.contatoBuscado.username}</Text>
                    </View>
                    {
                        this.props.loadingAPI ? <ActivityIndicator size="large" /> :
                            <View style={{ flex: 1 }}>
                                <Button title="Adicionar aos contatos" onPress={() => { this.adicionarContato()}} />
                            </View>
                    }
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',

        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

const mapStateToProps = state => (
    {
        contatoBuscado: state.apiReducer.contatoBuscado,
        usuario: state.apiReducer.usuario,
        loadingAPI: state.apiReducer.loadingAPI
    }
)

export default connect(mapStateToProps,
    {
        putUsuario, getUsuarioContato, limpaContatoBuscado, modificaLoading
    })(AddContato);