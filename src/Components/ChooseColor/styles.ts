import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        padding: 20,
        borderWidth: 4,
        borderColor: '#fff',
        borderRadius: 8,
        backgroundColor: '#000',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        zIndex: 3
    },
    text: {
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30
    },
    squares: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 20
    },
    square: {
        height: 120,
        width: 120,
        borderWidth: 4,
        borderColor: '#fff',
        borderRadius: 8
    }
});