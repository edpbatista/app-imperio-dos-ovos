import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking, Image, ScrollView } from 'react-native';

const Produtos = () => {
    const [carrinho, setCarrinho] = useState([]);

    const produtos = [
        {
            nome: 'Ovos Brancos',
            descricao: '30 Ovos Brancos',
            preco: "20,00",
            whatsapp: 'https://api.whatsapp.com/send?phone=5565996049113',
        },
        {
            nome: 'Ovos Vermelhos',
            descricao: '30 Ovos Vermelhos',
            preco: "22,00",
            whatsapp: 'https://api.whatsapp.com/send?phone=5565996049113',
        },
    ];

    const handleAdicionarCarrinho = (produto) => {
        setCarrinho([...carrinho, produto]);
    };

    const handleLimparCarrinho = () => {
        setCarrinho([]);
    };

    const handleCompra = () => {
        const total = carrinho.reduce((acc, produto) => acc + parseFloat(produto.preco.replace(',', '.')) || 0, 0);
        const message = `Olá, gostaria de comprar os seguintes produtos:\n\n${carrinho.map((produto) => `- ${produto.nome} (${produto.preco})`).join('\n')}\n\n Total: R$ ${total.toFixed(2)}`;
        const whatsappUrl = `https://api.whatsapp.com/send?phone=5565996049113&text=${encodeURIComponent(message)}`;
        Linking.openURL(whatsappUrl);
        setCarrinho([]);
    };

    return (

        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {produtos.map((produto, index) => (
                    <View key={index} style={styles.produtoContainer}>
                        <Text style={styles.nome}>{produto.nome}</Text>
                        <Text style={styles.descricao}>{produto.descricao}</Text>
                        <Text style={styles.preco}>R$ {produto.preco}</Text>
                        <TouchableOpacity
                            style={styles.adicionarCarrinhoButton}
                            onPress={() => handleAdicionarCarrinho(produto)}
                        >
                            <Text style={styles.adicionarCarrinhoButtonText}>Adicionar ao Carrinho</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.limparCarrinhoButton}
                            onPress={handleLimparCarrinho}
                            disabled={carrinho.length === 0}
                        >
                            <Text style={styles.limparCarrinhoButtonText}>Limpar Carrinho</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.carrinhoContainer}>
                {carrinho.reduce((produtosAgrupados, produto) => {
                    const index = produtosAgrupados.findIndex((p) => p.produto.nome === produto.nome);
                    if (index >= 0) {
                        produtosAgrupados[index].quantidade++;
                    } else {
                        produtosAgrupados.push({ produto, quantidade: 1 });
                    }
                    return produtosAgrupados;
                }, []).map((produtoAgrupado, index) => (
                    <View key={index} style={styles.carrinhoItem}>
                        <Text style={styles.carrinhoItemText}>
                            {produtoAgrupado.produto.nome} ({produtoAgrupado.produto.preco}) - {produtoAgrupado.quantidade}x
                        </Text>
                    </View>
                ))}
                <TouchableOpacity
                    style={styles.comprarButton}
                    onPress={handleCompra}
                    disabled={carrinho.length === 0}
                >
                    <Text style={styles.comprarButtonText}>Comprar via WhatsApp</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    produtoContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    imagem: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    nome: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    descricao: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    preco: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    adicionarCarrinhoButton: {
        backgroundColor: '#000',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    adicionarCarrinhoButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    carrinhoContainer: {
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f5f5f5',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    carrinhoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    carrinhoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    carrinhoItemText: {
        flex: 1,
        fontSize: 16,
    },
    comprarButton: {
        backgroundColor: '#000',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    comprarButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Produtos;


