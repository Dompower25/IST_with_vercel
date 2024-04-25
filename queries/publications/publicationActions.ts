import get_pub_by_id from "./GET_PUBLICATION_BY_ID.gql";
import get_pubs from "./GET_PUBLICATIONS.gql";


export interface IPublicationQ{
  publications: TPublication[]
}

type TPublication = {
  id: string,
  title: string,
  content: string,
  date_created: string
} 

export const GET_PUBLICATION_BY_ID = get_pub_by_id;
export const GET_PUBLICATIONS = get_pubs;
