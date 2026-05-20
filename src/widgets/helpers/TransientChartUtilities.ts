import { Domain, MechanicalProfileType } from './types';

export class TransientChartUtilities {
  private _minDomain: Domain = { x: 0, y: 0 };
  private _maxDomain: Domain = { x: 0, y: 0 };
  private _activeAxis: 'x' | 'y' = 'x';
  private _plotData: Domain[] = [];

  constructor(minDomain: Domain, maxDomain: Domain) {
    this._minDomain = minDomain;
    this._maxDomain = maxDomain;
  }

  setDomain(minDomain: Domain, maxDomain: Domain) {
    this._minDomain = minDomain;
    this._maxDomain = maxDomain;
    return this;
  }

  fitThePlotOn(axis: 'x' | 'y') {
    this._activeAxis = axis;
    return this;
  }

  // eslint-disable-next-line max-params, max-lines-per-function, complexity
  withValuesOf<T extends Record<keyof T, unknown>>(data: T[], x: keyof T, y: keyof T) {
    if (data.length <= 0) return this;
    if (typeof data[0][x] !== 'number' || typeof data[0][y] !== 'number') {
      const errMessage = `The provided data was incorrect data type, x is ${typeof data[0][
        x
      ]} and y is ${typeof data[0][y]}`;
      console.error(errMessage);
    } else {
      data.forEach((item) => {
        if ((item[x] as number) <= this._maxDomain[this._activeAxis] && (item[x] as number) >= 0) {
          this._plotData.push({
            x: item[x] as number,
            y: item[y] as number,
          });
        }
      });

      if (this._plotData.length > 0) {
        this._plotData.unshift({
          x: 0,
          y: this._plotData[0].y,
        });
        this._plotData.push({
          x: this._maxDomain[this._activeAxis],
          y: this._plotData[this._plotData.length - 1].y,
        });
      }
    }

    return this;
  }

  // MD is between 0 (minDomain.x) and bitDepth (maxDomain.x)
  // tensileLimit is <= maxDomain.y
  // bucklingLimit is >= minDomain.y
  filterDragMechanicalProfiles(data: Omit<MechanicalProfileType, 'torsionalLimit' | 'torque'>[]) {
    if (data.length === 0) return [];
    const filteredData: Omit<MechanicalProfileType, 'torsionalLimit' | 'torque'>[] = [];
    data.forEach((x) => {
      if (
        x.MD >= this._minDomain.x &&
        x.MD <= this._maxDomain.x &&
        x.bucklingLimit >= this._minDomain.y &&
        x.tensileLimit <= this._maxDomain.y
      ) {
        filteredData.push({
          MD: x.MD,
          bucklingLimit: x.bucklingLimit,
          tensileLimit: x.tensileLimit,
          tension: x.tension,
        });
      }
    });
    const dataLen = filteredData.length;
    if (dataLen === 0) return [];
    // insert min values
    filteredData.unshift({
      MD: 0,
      bucklingLimit: filteredData[0].bucklingLimit,
      tensileLimit: filteredData[0].tensileLimit,
      tension: filteredData[0].tension,
    });
    // insert max values
    filteredData.push({
      MD: this._maxDomain.x,
      bucklingLimit: filteredData[dataLen - 1].bucklingLimit,
      tensileLimit: filteredData[dataLen - 1].tensileLimit,
      tension: filteredData[dataLen - 1].tension,
    });
    return filteredData;
  }

  // MD is between 0 (minDomain.x) and bitDepth (maxDomain.x)
  // torsionalLimit is <= maxDomain.y
  filterTorqueMechanicalProfiles(
    data: Pick<MechanicalProfileType, 'MD' | 'torsionalLimit' | 'torque'>[],
  ) {
    if (data.length === 0) return [];
    const filteredData: Pick<MechanicalProfileType, 'MD' | 'torsionalLimit' | 'torque'>[] = [];
    data.forEach((x) => {
      if (
        x.MD >= this._minDomain.x &&
        x.MD <= this._maxDomain.x &&
        x.torsionalLimit <= this._maxDomain.y
      ) {
        filteredData.push({
          MD: x.MD,
          torsionalLimit: x.torsionalLimit,
          torque: x.torque,
        });
      }
    });
    const dataLen = filteredData.length;
    if (dataLen === 0) return [];
    // insert min values
    filteredData.unshift({
      MD: 0,
      torsionalLimit: filteredData[0].torsionalLimit,
      torque: filteredData[0].torque,
    });
    // insert max values
    filteredData.push({
      MD: this._maxDomain.x,
      torsionalLimit: filteredData[dataLen - 1].torsionalLimit,
      torque: filteredData[dataLen - 1].torque,
    });
    return filteredData;
  }

  getPlotData() {
    return this._plotData;
  }

  getActiveDomain() {
    return {
      minDomain: this._minDomain,
      maxDomain: this._maxDomain,
    };
  }
}
