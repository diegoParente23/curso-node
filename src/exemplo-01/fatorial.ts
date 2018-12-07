export const fatorial = (num: number): number => {
    if(num === 0) {
        return 1;
    }

    return num * fatorial(num - 1);
}