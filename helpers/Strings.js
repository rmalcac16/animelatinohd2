import moment from 'moment';
import 'moment/locale/es';
import { encryptString } from './encryptDecrypt';
moment.locale('es');

export const getFromNow = (date) => {
    return moment(date).fromNow();
};

export const getTypeAnime = (type) => {
    switch (type.toLowerCase()) {
        case 'tv':
            return 'Anime';
        case 'movie':
            return 'Película';
        case 'special':
            return 'Especial';
        default:
            return type;
    }
};

export const getStatusAnime = (status) => {
    return status === 0 ? 'Finalizado' : 'En emisión';
};

export const getYear = (date) => {
    return moment(date).format('YYYY');
};

export const getDateAiredAnime = (date) => {
    return moment(date).format('LL');
};

export const getRatingAnime = (rating) => {
    return rating;
};

export const getVoteAverageAnime = (voteAverage) => {
    return voteAverage + '/10';
};

export const getPopularityAnime = (popularity) => {
    return popularity;
};

export const getLanguajePlayer = (languaje) => {
    const languajeMap = {
        0: 'Subtitulado',
        1: 'Latino',
        2: 'Castellano',
    };
    return languajeMap[languaje] || languajeMap['0'];
};

export const getStreamPlayer = (item) => {
    return item?.server?.type === 0
        ? process.env.STREAMURL + item?.id
        : item?.server?.embed
        ? item?.server?.embed?.replace('{id}', item?.code)
        : item?.code;
};

export const getDayName = (day) => {
    const dayNames = [
        'No definido',
        'Domingo',
        'Lunes',
        'Martes',
        'Miercoles',
        'Jueves',
        'Viernes',
        'Sabado',
    ];
    return dayNames[day];
};

export const getNowDay = () => {
    var d = new Date();
    return d.getDay() + 1;
};

export const getUrlVideo = (id) => {
    const encryptedId = encryptString(id?.toString());
    return `${process.env.STREAMURL}${encryptedId}`;
};

export const getCheckLatino = (players) => {
    return players.hasOwnProperty('1');
};

export const getCheckCastellano = (players) => {
    return players.hasOwnProperty('2');
};

export const getLanguageAvailabilityMessage = (players) => {
    const hasLatino = '1' in players;
    const hasCastellano = '2' in players;

    if (hasLatino && hasCastellano) {
        return 'Este capítulo está disponible en <strong>Español Latino</strong> y <strong>Castellano</strong>';
    } else if (hasLatino && !hasCastellano) {
        return 'Este capítulo está disponible en <strong>Español Latino</strong>';
    } else if (!hasLatino && hasCastellano) {
        return 'Este capítulo está disponible en <strong>Castellano</strong>';
    } else {
        return 'No hay información disponible sobre los idiomas de este capítulo';
    }
};
