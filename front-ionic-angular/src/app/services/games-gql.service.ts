import { Injectable } from '@angular/core'; 
import { FetchResult } from '@apollo/client/core';
import { ApolloQueryResult } from '@apollo/client/core/types';
import { Apollo, ApolloBase, gql, MutationResult } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import Game from '../../../../common/src/models/game';



@Injectable({
  providedIn: 'root'
})
export class GamesGqlService {
  private apollo: ApolloBase;
  public gamesCache: Array<Game>;

  constructor(private apolloProvider: Apollo) {
    this.apollo = this.apolloProvider.use('newClientName');
  }

  private Q_GET_GAMES = gql`
    {
      getGames{
          _id,
          name,
          category,
          price
      }
    }
  `;
  GetItems(): Observable<ApolloQueryResult<Array<Game>>> {
    return this.apollo.watchQuery<any>({
      query: this.Q_GET_GAMES,
    }).valueChanges.pipe(map((result) => {
      result.data = result.data?.getGames
      return result;
    }), tap((result) => this.gamesCache = result.data));
  }

  private Q_GET_GAME = gql`
    {
      getGame(id: $id){
          _id,
          name,
          category,
          price
      }
    }
`;
  GetItem(id: string): Observable<ApolloQueryResult<Game>> {
    return this.apollo.watchQuery<any>({
      query: this.Q_GET_GAME,
      variables: {
        id: id
      },
      fetchPolicy: 'no-cache'
    }).valueChanges.pipe(map((result) => {
      result.data = result.data?.getGames
      return result;
    }), tap((result) => this.gamesCache = result.data));
  }

  private MUTATION_UPSERT = gql`mutation upsertGame($game: GameInput!) {
    upsertGame(game: $game)
  }`;
  Upsert(game: Game): Observable<MutationResult<any>> {
    return this.apollo.mutate({
      mutation: this.MUTATION_UPSERT,
      variables: {
        game: {
          id: game._id,
          name: game.name,
          category: game.category,
          price: Number(game.price)
        }
      },
      //REFRESHING ALL QUERY CACHE
      refetchQueries: [
        {
          query: this.Q_GET_GAMES
        },
      ],
    }).pipe(map((result) => {
      result.data = result.data;
      return result;
    }));
  }

  Delete(id: string): Observable<MutationResult<any>> {
    const MUTATION_UPSERT = gql`mutation deleteGame($id: String!) {
      deleteGame(id: $id)
    }`;

    return this.apollo.mutate({
      mutation: MUTATION_UPSERT,
      variables: {
        id: id
      },
      update: (store, dataRes: Omit<FetchResult<any, Record<string, any>, Record<string, any>>, "context">) => {
        // Read the data from our cache for this query.  
        const data: any = store.readQuery({ query: this.Q_GET_GAMES });
        // Add our comment from the mutation to the end.
        var id2find = String(dataRes.data.deleteGame);  
        const newData =  data.getGames.filter((e) => String(e._id) != id2find);
        store.writeQuery({ query: this.Q_GET_GAMES, data: { getGames: newData } });        
      }
    }).pipe(map((result) => {
      result.data = result.data;
      return result;
    }));
  }

}
