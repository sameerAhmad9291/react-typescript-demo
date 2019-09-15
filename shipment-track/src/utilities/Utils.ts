export default class Utils{
    static sortByString(a:string, b:string):number {
        if (a > b) return 1;
        if (a < b) return -1;
        else return 0;
    }

    static sortByNumber(a:number, b:number):number {
        return a - b;
    }

    static sortByStrNumber(a:string, b:string):number {
        return Number.parseFloat(a) - Number.parseFloat(b);
    }
}