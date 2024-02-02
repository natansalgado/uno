import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 60,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#000',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 200
    },
    text: {
        color: '#fff',
        fontSize: 20
    }
});