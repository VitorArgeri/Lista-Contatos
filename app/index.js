// app/index.js
import React, { useState } from "react";
import { List, FAB, Dialog, Avatar } from 'react-native-paper';
import {
    View,
    Text,
    Pressable,
    Modal,
    TextInput,
    FlatList,
    Alert,
    StyleSheet,
} from "react-native";

export default function HomeScreen() {
    const [contacts, setContacts] = useState([]); // Lista de Contatos
    const [modalVisible, setModalVisible] = useState(false); // Modal visível ou não
    const [newContact, setNewContact] = useState(""); // Texto do novo contato
    const [editIndex, setEditIndex] = useState(null); // Índice do novo contato em edição

    // Função para adicionar ou editar contato
    function addOrEditContact() {
        if (!newContact) return; // Se o campo estiver vazio (sem espaços ou texto), não faz nada

        if (editIndex === null) {
            // Adiciona um novo contato diretamente ao estado
            contacts.push(newContact); // Modifica o array diretamente
        } else {
            // Edita um contato existente
            contacts[editIndex] = newContact; // Atualiza o contato no índice de edição
            setEditIndex(null); // Limpa o índice de edição
        }

        setContacts(contacts); // Atualiza o estado com a lista de contatos modificada
        setNewContact(""); // Limpa o campo de texto
        setModalVisible(false); // Fecha o modal
    }

    // Função para confirmar exclusão de contato
    function confirmDelete(index) {
        Alert.alert("Excluir contato?", `Remover "${contacts[index]}"?`, [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Excluir",
                style: "destructive",
                onPress: () => {
                    contacts.splice(index, 1); // Remove o contato diretamente do array
                    setContacts(contacts); // Atualiza o estado com a lista modificada
                },
            },
        ]);
    }

    // Função para abrir o modal em modo de edição
    function openEditModal(index) {
        setNewContact(contacts[index]); // Carrega o texto do contato no campo de edição
        setEditIndex(index); // Define o índice do contato a ser editada
        setModalVisible(true); // Abre o modal
    }

    return (
        <View style={styles.container}>
            {/* Botão para abrir o modal */}
            <View style={styles.addContactContainer}>
                <Text style={styles.addContactText}>Adicionar Contato</Text>
                <FAB
                    icon="plus"
                    onPress={() => {
                        setNewContact("");
                        setEditIndex(null);
                        setModalVisible(true);
                    }}
                    style={styles.addButton}
                >
                    <Text style={styles.addButtonText}>＋ Novo Contato</Text>
                </FAB>
            </View>

            {/* Lista de contatos */}
            <FlatList
                data={contacts}
                keyExtractor={(_, i) => String(i)} // Identificador único para cada item
                renderItem={({ item, index }) => (
                    <View style={styles.contactItemContainer}>
                        <Text style={styles.contactItem}>{item}</Text>
                        <View style={styles.contactButtons}>
                            {/* Botões para editar e excluir */}
                            <Pressable
                                onPress={() => openEditModal(index)} // Abre o modal para editar
                                style={[styles.contactButton, styles.editButton]}
                            >
                                <Text style={styles.buttonText}>✏️</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => confirmDelete(index)} // Exclui o contato
                                style={[styles.contactButton, styles.deleteButton]}
                            >
                                <Text style={styles.buttonText}>🗑️</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Nenhum contato ainda!</Text>
                }
            />

            {/* Modal para adicionar ou editar contato */}
            <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalContent}>
                        <Text style={{ marginBottom: 8 }}>
                            {editIndex === null
                                ? "Digite seu novo contato:"
                                : "Edite o contato:"}
                        </Text>

                            <TextInput
                                onChangeText={setNewContact}
                                placeholder="Ex: Vitor"
                                style={styles.input}
                            />

                        <Pressable onPress={addOrEditContact} style={{ marginBottom: 8 }}>
                            <Text style={{ color: "#6200ee", textAlign: "center" }}>
                                {editIndex === null ? "Adicionar" : "Salvar alterações"}
                            </Text>
                        </Pressable>
                        <Pressable onPress={() => setModalVisible(false)}>
                            <Text style={{ color: "#999", textAlign: "center" }}>
                                Cancelar
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    addButton: {
        marginBottom: 16,
        alignSelf: "center",
        backgroundColor: "#1b98e0", // Vermelho (Pantone 485)
        padding: 2,
        paddingHorizontal: 72,
        borderRadius: 8,
        border: "1px solid black",
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    contactItemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        padding: 12,
        backgroundColor: "#f1f1f1",
        borderRadius: 6,
    },
    contactItem: {
        flex: 1,
        fontSize: 16,
    },
    contactButtons: {
        flexDirection: "row",
    },
    contactButton: {
        marginLeft: 8,
        padding: 6,
        borderRadius: 4,
    },
    editButton: {
        backgroundColor: "#ffca28", // Cor de edição (amarelo)
    },
    deleteButton: {
        backgroundColor: "#f44336", // Cor de exclusão (vermelho)
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    emptyText: {
        textAlign: "center",
        marginTop: 32,
        color: "#666",
    },
    modalBackdrop: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)", // Fundo escuro com transparência
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        borderRadius: 6,
        marginBottom: 12,
    },

    addContactContainer: {
        flexDirection: "collumn",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
        marginBottom: 16,
        gap: 20,
    },
    addContactText: {
        fontSize: 30,
        textAlign: "center",
    },
});