import { Sigthseen } from './sigthseen.model';

export interface Marker extends Sigthseen {
    type: string,
    mine?: boolean,
}