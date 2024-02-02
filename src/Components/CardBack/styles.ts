import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: '#fff',
        width: 80,
        height: 120,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    name: {
        backgroundColor: '#fff',
        padding: 4,
        borderRadius: 100,
        width: 60,
        height: 60,
        textAlign: 'center',
        lineHeight: 52,
        fontSize: 20,
        fontWeight: 'bold',
        transform: [
            { rotateZ: '-25deg' },
            { rotateX: '-30deg' },
            { rotateY: '30deg' }
        ]
    }
});