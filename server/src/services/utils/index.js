const formatRdbResult = (result) => {

    if (result && result.changes && result.changes.length > 0) {

        return Promise.resolve({
            ...result,
            newVal: result.changes[0].new_val,
            oldVal: result.changes[0].old_val
        });

    } else if (result && result.errors > 0) {

        return Promise.reject(new Error(result.first_error));

    }

    return Promise.resolve({
        ...result,
        newVal: undefined,
        oldVal: undefined
    });

};

export default formatRdbResult;
