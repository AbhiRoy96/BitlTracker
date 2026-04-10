export interface MarketData {
    '15m': number;
    'last': number;
    'buy': number;
    'sell': number;
    'symbol': string;
}

export class CoordData {
    public latitude: number;
    public longitude: number;

    getLatitude(lat) {
        this.latitude = lat;
    }

    getLongitude(longi) {
        this.longitude = longi;
    }
}


export class BookingTempData {
    public from_p: number;
    public from_p_name: string;
    public to_p: number;
    public to_p_name: string;
    public shipmentDate: Date;
    public freight_mode: string;
    public type: string;
    public freight_services_id: number;
    public freight_services_name: string;
    public freight_price: number;
    public cont_id: string;
    public cont_image: string;
    public shpmt_name: string;
    public quantity: number;

    // tslint:disable-next-line:max-line-length
    constructor(from_p, to_p, freight_mode, type, shipmentDate, freight_price, freight_services_id, from_p_name, to_p_name, freight_services_name, cont_id, cont_image, shpmt_name, quantity) {
        this.from_p = from_p;
        this.to_p = to_p;
        this.freight_mode = freight_mode;
        this.type = type;
        this.shipmentDate = shipmentDate;
        this.freight_services_id = freight_services_id;
        this.freight_price = freight_price;
        this.from_p_name = from_p_name;
        this.to_p_name = to_p_name;
        this.freight_services_name = freight_services_name;
        this.cont_id = cont_id;
        this.cont_image = cont_image;
        this.shpmt_name = shpmt_name;
        this.quantity = quantity;
    }
}

export class BookingData {
  public from_p: number;
  public from_p_name: string;
  public to_p: number;
  public to_p_name: string;
  public shipmentDate: Date;
  public freight_mode: string;
  public type: string;
  public freight_services_id: number;
  public freight_services_name: string;
  public freight_price: number;
  public cont_id: string;
  public shpmt_name: string;
  public quantity: number;
  public first_name: string;
  public last_name: string;
  public telephone: string;
  public email: string;
  public address: string;
  public booking_id: string;
  public service_id: string;
  public awb: string;
  public shipment_type: string;
  public quote_price: number;
  public client_payment_address: string;

  // tslint:disable-next-line:max-line-length
  constructor(bkng_id, svc_id, awb, from, to, from_n, to_n, fsvc_name, fme, fsvc, shpmt, shpmt_name, cid, shpmt_d, qty, price, f_name, l_name, tele, mail, addr, cpay_addr) {
    this.booking_id = bkng_id;
    this.service_id = svc_id;
    this.awb = awb;
    this.from_p = from;
    this.to_p = to;
    this.from_p_name = from_n;
    this.to_p_name = to_n;
    this.freight_services_name = fsvc_name;
    this.freight_mode = fme;
    this.freight_services_id = fsvc;
    this.shipment_type = shpmt;
    this.shpmt_name = shpmt_name;
    this.cont_id = cid;
    this.shipmentDate = shpmt_d;
    this.quantity = qty;
    this.quote_price = price;
    this.first_name = f_name;
    this.last_name = l_name;
    this.telephone = tele;
    this.email = mail;
    this.address = addr;
    this.client_payment_address = cpay_addr;
  }
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

export class News {
    public newsSource: string;
    public newsHeadline: string;
    public newsLink: string;

    constructor(src, topic, link) {
        this.newsSource = src;
        this.newsHeadline = topic;
        this.newsLink = link;
    }
}

export enum Event {
    CONNECT = 'connect',
    DISCONNECT = 'disconnect'
}

export class Tradings {
    public tradeTime: string;
    public exchange: string;
    public flag: number;
    public totalValue: number;

    constructor(timr, exchg, flg, valur) {
        this.tradeTime = timr;
        this.exchange = exchg;
        this.flag = flg;
        this.totalValue = valur;
    }
}
