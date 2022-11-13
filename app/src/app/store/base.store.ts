export class BaseStore {
  protected readonly _data: any = {};
  public get data() {
    return this._data;
  }

  constructor(data: any) {
    this._data = data;
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
    }
  }
}
