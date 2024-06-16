import { BehaviorSubject } from 'rxjs';

export class BaseStore {
  protected readonly _data: any = {};
  private readonly _event: BehaviorSubject<any>;

  constructor(data: any) {
    this._data = data;
    this._event = new BehaviorSubject<any>(this._data);
  }

  public get data() {
    return this._data;
  }

  modify(propertyName: string, newValue: any) {
    if (this._data.hasOwnProperty(propertyName) && newValue) {
      if (typeof newValue === 'string' || typeof newValue === 'number') {
        this._data[propertyName] = newValue;
      } else if (newValue?.length !== undefined) {
        this._data[propertyName] = newValue;
      } else {
        this._data[propertyName] = Object.assign({}, newValue);
      }
      this._event.next(this._data);
    }
  }

  subscribe() {
    return this._event;
  }
}
