import { LatLngExpression } from "leaflet";
//
export interface SingleMapImport {
  location: {
    title: string;
    cord: undefined | LatLngExpression;
  };
  OpenMap: boolean;
  closeMap: () => void;
}
