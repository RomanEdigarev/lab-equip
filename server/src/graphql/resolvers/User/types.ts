import {Equipment} from "../../../lib/types";

export type UserArgs = {
  id: string
}

export type UserEquipmentsArgs = {
  limit: number
  page: number
}

export type UserEquipmentsData = {
  total: number
  result: Equipment[]
}
