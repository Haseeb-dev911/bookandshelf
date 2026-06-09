export const normalizeEmail = (email) => {
    const [localPart, domain] = email.split("@");
    const [baseName] = localPart.split("+");

    return `${baseName}@${domain}`;
};