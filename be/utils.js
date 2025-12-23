export const normalizeCity = (city) => {
    if (!city) return "";
    let normalized = city.trim();

    // Remove "South West ", "North East ", etc.
    const prefixes = [
        "South West ", "South East ", "North West ", "North East ",
        "South ", "North ", "East ", "West ", "Central "
    ];

    for (const prefix of prefixes) {
        if (normalized.startsWith(prefix)) {
            normalized = normalized.substring(prefix.length);
            break;
        }
    }

    // Remove " District" suffix
    normalized = normalized.replace(/ District$/i, "");

    return normalized.trim();
};
