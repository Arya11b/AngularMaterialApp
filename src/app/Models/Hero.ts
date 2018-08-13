import {SuperPowersList} from "./SuperPowersList";
import {CitiesList} from "./CitiesList";

/**
 * Created by Arya on 7/14/2018.
 */
export class Hero {
  id: number;
  parentId: number;
  firstName: string;
  lastName: string;
  alias: string;
  picture: string;
  cityId: CitiesList[];
  superPowerId: SuperPowersList[];
}
