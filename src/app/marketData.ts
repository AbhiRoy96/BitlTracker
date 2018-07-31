export interface MarketData {
    '15m': number;
    'last': number;
    'buy': number;
    'sell': number;
    'symbol': string;
}

export class CoinDataFetched {
    public name: string;
    public imageUrl: string;
    public price: string;
    public change24H: string;
    public trend: number;

    constructor(name, imageURL) {
        this.name = name;
        this.imageUrl = imageURL;
        this.price = '';
        this.change24H = '';
        this.trend = 0;
    }

}
