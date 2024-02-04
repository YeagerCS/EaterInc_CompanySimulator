export const formatDate = (dateString) => {
    const day = new Date(dateString);
    const yyyy = day.getFullYear();
    let mm = day.getMonth() + 1;
    let dd = day.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedDate = dd + '/' + mm + '/' + yyyy;
    return formattedDate;
}