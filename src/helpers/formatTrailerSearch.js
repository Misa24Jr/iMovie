const  formatTrailerSearch = (title) => {
    // Replace spaces with '+' and append '+trailer' at the end
    const formattedTitle = title.replace(/ /g, '+') + '+trailer';
    return formattedTitle;
}

export default formatTrailerSearch;