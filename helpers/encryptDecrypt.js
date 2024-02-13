import LaravelEncrypt from '../lib/laravel-encrypt';

const encryptionKey = process.env.APIKEY;
const encryptor = new LaravelEncrypt(encryptionKey);

const encryptString = (plainText) => {
    try {
        const encryptedText = encryptor.encrypt(plainText);
        return encryptedText;
    } catch (error) {
        console.error('Error al encriptar el texto:', error);
        return null;
    }
};

const decryptString = (encryptedText) => {
    try {
        const decryptedText = encryptor.decrypt(encryptedText);
        return decryptedText;
    } catch (error) {
        console.error('Error al descifrar el texto:', error);
        return null;
    }
};

export { encryptString, decryptString };
