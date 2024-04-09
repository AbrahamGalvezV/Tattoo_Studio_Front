export const inputValidator = (input, field) => {
    if (input === "") {
        return false
    }
    if ((field === "name" || field === "lastName") && typeof(input) === "string") {
        return true
    }
    if (field === "password" && typeof(input) === "string" && input.length >= 6 && input.length <= 12) {
        return true
    }

    return false
}