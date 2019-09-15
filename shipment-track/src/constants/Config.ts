export default class Config{
    private static readonly API_URL = process.env.REACT_APP_API_URL

    static GET_ALL:string = Config.API_URL+ "shipments/";
    static EDIT:string = Config.API_URL+ "shipments/";
}