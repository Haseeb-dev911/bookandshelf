export const errorsCollectZod = (validationResult) => {
    return validationResult.error.issues.map((err) => (
        { field: err.path[0], message: err.message }
    ));
}