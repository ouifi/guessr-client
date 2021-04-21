export default function cleanString(text: string) {
    return text
        .toLowerCase() // Convert all to lowercase
        .replaceAll("_", "") // Replace all underscores
        .replaceAll(" ", ""); // Get rid of all whitespace
}