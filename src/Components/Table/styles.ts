import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        paddingVertical: 28
    },
    text: {
        position: 'absolute',
        color: '#fff',
        fontSize: 22,
        paddingTop: 2,
        fontWeight: 'bold',
        top: 156,
        width: 50,
        textAlign: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 8,
        backgroundColor: '#000',
        zIndex: 3
    },
    rotatingCircle: {
        position: 'absolute',
        top: 64,
        textAlign: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 8,
        backgroundColor: '#000',
        zIndex: 3,
        padding: 16
    }
});