export const formatDate = (date: number) => {
    const dateFormat = new Date(date * 1000);
    return `${dateFormat.getDate()}.${dateFormat.getMonth() + 1}.${dateFormat.getFullYear()}`;
}