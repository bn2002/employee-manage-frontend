const convertDateTime = (string) => {
    return new Date(string).toISOString().substring(0, 10);
};

export { convertDateTime };
