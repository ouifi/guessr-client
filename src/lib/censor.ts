export default function censor(string: string, censor:string) {
    return string.replaceAll(new RegExp(censor, "ig"), "*".repeat(censor.length));
}