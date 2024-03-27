const parseAudienceScore = (score) => {
    const percentage = Math.floor(score * 10);
    return `${percentage}%`;
}

export default parseAudienceScore;