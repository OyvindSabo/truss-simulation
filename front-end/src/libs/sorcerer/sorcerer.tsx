import React, { ComponentType, useState, useEffect } from 'react';

export class DataSource<T> {
  id: string;
  _value: T;
  _valueUpdateEvent: Event;
  /**
   * @param id A globally unique identifier of the data source. You can
   * typically set it to be the same as the name of the variable in which the
   * data source is stored, as long as it does not interfere with the id of
   * another data source, or another event.
   * @param initialValue
   */
  constructor(initialValue: T) {
    this.id = `${new Date().getTime()}`;
    this._value = initialValue;
    this._valueUpdateEvent = new Event('AUTHENTICATION_UPDATE');
  }
  setValue(value: T) {
    this._value = value;
    window.dispatchEvent(this._valueUpdateEvent);
  }
  getValue() {
    return this._value;
  }
}

export const withPropsFromDataSource = (
  Comp: any,
  dataSource: DataSource<any>
): ComponentType => (props: any) => {
  const [dataSourceProps, setDataSourceProps] = useState<any>(
    dataSource.getValue()
  );
  useEffect(() => {
    window.addEventListener(dataSource.id, () =>
      setDataSourceProps(dataSource.getValue())
    );

    return () => {
      window.addEventListener(dataSource.id, () =>
        setDataSourceProps(dataSource.getValue())
      );
    };
  }, []);
  return <Comp {...dataSourceProps} {...props} />;
};
