import moment from 'moment'

export const renderDate = date => {
    return new Date(date).toLocaleDateString('ru-RU');
};

export const formattedDate = date => {
    return moment(date).format('YYYY-MM-DD')
}